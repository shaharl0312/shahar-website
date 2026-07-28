// Internal diagnostic endpoint for the daily funnel health check.
// Not called from the browser - only from the health-check script, with a shared secret.
// Verifies the real Rav-Messer and Cardcom credentials still authenticate successfully -
// auth-only, no test leads are created or deleted. This is the only way to actually catch
// an expired token or rotated password, since a plain endpoint ping never reaches this code.

const RAVMESSER_BASE_URL = 'https://graph.responder.live/v2';
const CARDCOM_BASE_URL = 'https://secure.cardcom.solutions';

function formatCardcomDate(d) {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}${mm}${d.getFullYear()}`;
}

async function checkRavMesserAuth() {
  const response = await fetch(`${RAVMESSER_BASE_URL}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      scope: '*',
      client_id: Number(process.env.RAVMESSER_CLIENT_ID),
      client_secret: process.env.RAVMESSER_CLIENT_SECRET,
      user_token: process.env.RAVMESSER_USER_TOKEN
    })
  });
  const data = await response.json();
  if (!data.status || !data.token) {
    return { pass: false, details: 'האימות מול רב-מסר נכשל - ' + (data.message || 'unknown error') };
  }
  return { pass: true, details: 'האימות מול רב-מסר תקין (הטוקן עדיין בתוקף)' };
}

async function checkCardcomAuth() {
  const today = new Date();
  const response = await fetch(`${CARDCOM_BASE_URL}/api/v11/Transactions/ListTransactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ApiName: process.env.CARDCOM_API_NAME,
      ApiPassword: process.env.CARDCOM_API_PASSWORD,
      FromDate: formatCardcomDate(today),
      ToDate: formatCardcomDate(today),
      Page: 1,
      Page_size: 10
    })
  });
  const data = await response.json();
  if (data.ResponseCode !== 0) {
    return { pass: false, details: 'קארדקום דחה את הבקשה - ' + (data.Description || `ResponseCode ${data.ResponseCode}`) };
  }
  return { pass: true, details: 'האימות מול קארדקום תקין' };
}

export default async function handler(req, res) {
  const secret = req.headers['x-health-check-secret'];
  if (!process.env.HEALTH_CHECK_SECRET || secret !== process.env.HEALTH_CHECK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const checks = [];

  try {
    const ravResult = await checkRavMesserAuth();
    checks.push({ name: 'רב-מסר - אימות חיבור', ...ravResult });
  } catch (err) {
    checks.push({ name: 'רב-מסר - אימות חיבור', pass: false, details: 'שגיאה: ' + err.message });
  }

  try {
    const cardcomResult = await checkCardcomAuth();
    checks.push({ name: 'קארדקום - אימות חיבור', ...cardcomResult });
  } catch (err) {
    checks.push({ name: 'קארדקום - אימות חיבור', pass: false, details: 'שגיאה: ' + err.message });
  }

  const overallStatus = checks.every((c) => c.pass) ? 'ok' : 'issues';
  return res.status(200).json({ checkedAt: new Date().toISOString(), overallStatus, checks });
}
