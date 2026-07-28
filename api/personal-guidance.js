const ALLOWED_ORIGINS = [
  'https://shaharfinance.com',
  'https://shahar-finance-staging.vercel.app'
];

const RAVMESSER_BASE_URL = 'https://graph.responder.live/v2';

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

  const { name, phone, email, reason } = req.body || {};

  if (!phone && !email) {
    return res.status(400).json({ error: 'Missing phone or email' });
  }

  const listId = Number(process.env.RAVMESSER_PERSONAL_GUIDANCE_LIST_ID);
  const [first, ...rest] = name ? name.trim().split(/\s+/) : [];

  try {
    const token = await getRavMesserToken();

    // Rav Messer matches existing subscribers by phone/email and updates them in place -
    // this adds the guidance list + tags without removing them from any list they're
    // already on (e.g. the course-purchasers list), so Shahar doesn't call them twice.
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
        tags_names: ['ביקש ליווי'].concat(reason && typeof reason === 'string' ? [reason.trim()] : [])
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
