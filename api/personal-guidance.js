const ALLOWED_ORIGINS = [
  'https://shaharfinance.com',
  'https://shahar-finance-staging.vercel.app'
];

const RAVMESSER_BASE_URL = 'https://graph.responder.live/v2';
const CARDCOM_BASE_URL = 'https://secure.cardcom.solutions';

function formatCardcomDate(d) {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}${mm}${d.getFullYear()}`;
}

async function findCardcomTransaction(dealId) {
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);

  const response = await fetch(`${CARDCOM_BASE_URL}/api/v11/Transactions/ListTransactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ApiName: process.env.CARDCOM_API_NAME,
      ApiPassword: process.env.CARDCOM_API_PASSWORD,
      FromDate: formatCardcomDate(fromDate),
      ToDate: formatCardcomDate(toDate),
      Page: 1,
      Page_size: 500
    })
  });

  const data = await response.json();
  if (data.ResponseCode !== 0) {
    throw new Error(data.Description || 'Cardcom ListTransactions failed');
  }

  const transactions = data.Tranzactions || [];
  return transactions.find((t) => String(t.InternalDealNumber) === String(dealId)) || null;
}

async function getRavMesserToken() {
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
  if (!data.status) {
    throw new Error(data.message || 'Rav Messer authentication failed');
  }
  return data.token;
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const corsOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : 'null';

  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { dealId, reason } = req.body || {};

  if (!dealId) {
    return res.status(400).json({ error: 'Missing dealId' });
  }

  const listId = Number(process.env.RAVMESSER_PERSONAL_GUIDANCE_LIST_ID);

  try {
    const transaction = await findCardcomTransaction(dealId);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const fullName = (transaction.CardOwnerName || '').trim();
    const phone = (transaction.CardOwnerPhone || '').trim();
    const email = (transaction.CardOwnerEmail || '').trim();

    if (!phone && !email) {
      return res.status(422).json({ error: 'Transaction has no contact details' });
    }

    const [first, ...rest] = fullName ? fullName.split(/\s+/) : [];
    const token = await getRavMesserToken();

    const response = await fetch(`${RAVMESSER_BASE_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        phone: phone || undefined,
        email: email || undefined,
        first: first || undefined,
        last: rest.length ? rest.join(' ') : undefined,
        list_ids: [listId],
        tags_names: reason && typeof reason === 'string' ? [reason.trim()] : undefined
      })
    });

    const data = await response.json();
    if (!data.status) {
      console.error('Rav Messer error:', data);
      return res.status(500).json({ error: 'Failed to save to Rav Messer' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Personal guidance error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
