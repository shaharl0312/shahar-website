const ALLOWED_ORIGINS = [
  'https://shaharfinance.com',
  'https://go.shaharfinance.com',
  'https://crm.shaharfinance.com'
];

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const corsOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : 'null';

  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { full_name, phone, email } = req.body || {};

  if (!full_name || typeof full_name !== 'string' || full_name.trim().length < 2) {
    return res.status(400).json({ error: 'Missing full_name' });
  }
  if (!phone || typeof phone !== 'string' || phone.trim().length < 9) {
    return res.status(400).json({ error: 'Missing phone' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing Supabase env vars');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'apikey': SUPABASE_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        full_name: full_name.trim(),
        phone: phone.trim(),
        email: email && email.trim() ? email.trim() : null
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Supabase error:', err);
      return res.status(500).json({ error: 'Failed to save lead' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Submit lead error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
