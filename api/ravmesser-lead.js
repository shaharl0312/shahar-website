const ALLOWED_ORIGINS = [
  'https://shaharfinance.com',
  'https://go.shaharfinance.com',
  'https://crm.shaharfinance.com'
];

const RAV_BASE = 'https://graph.responder.live/v2';

async function getAccessToken() {
  const res = await fetch(`${RAV_BASE}/oauth/token`, {
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
  const data = await res.json();
  if (!data.status) throw new Error(`Rav Messer auth failed (http ${res.status}): ${JSON.stringify(data)}`);
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

  const { name, email, phone } = req.body || {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Missing name' });
  }
  if (!email && !phone) {
    return res.status(400).json({ error: 'Missing email or phone' });
  }

  const listId = Number(process.env.RAVMESSER_FREE_GUIDE_LIST_ID);
  const [first, ...rest] = name.trim().split(/\s+/);

  try {
    const token = await getAccessToken();
    const ravRes = await fetch(`${RAV_BASE}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email ? email.trim() : undefined,
        phone: phone ? phone.trim() : undefined,
        first,
        last: rest.join(' ') || undefined,
        list_ids: [listId]
      })
    });

    const ravData = await ravRes.json();
    if (!ravData.status) {
      console.error('Rav Messer subscribe error:', ravData);
      return res.status(500).json({ error: 'Failed to save to Rav Messer' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Rav Messer lead error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
