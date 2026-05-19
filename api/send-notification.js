const ALLOWED_ORIGIN = 'https://shaharfinance.com';

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const corsOrigin = origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : 'null';

  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, date } = req.body || {};
  if (!name || typeof name !== 'string') return res.status(400).json({ error: 'Missing name' });

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        subject: `✍️ הסכם חדש נחתם — ${name}`,
        from_name: 'מערכת ההסכמים',
        message: `שלום שחר,\n\nלקוח חדש חתם על ההסכם:\n\nשם: ${name}\nתאריך ושעה: ${date || 'לא ידוע'}\n\n—\nמערכת ההסכמים | shaharfinance.com`
      })
    });

    const data = await response.json();
    res.status(response.ok ? 200 : 500).json(data);
  } catch (err) {
    console.error('Web3Forms error:', err);
    res.status(500).json({ error: 'Failed to send notification' });
  }
}
