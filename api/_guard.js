// Shared protection for the public form endpoints.
// Files starting with "_" inside /api are helpers, so Vercel does not expose this as a route.
//
// 1. Rate limit per IP - in memory, so it counts per warm function instance. It stops
//    a single bot hammering a form; a distributed attack needs the Vercel firewall.
// 2. Honeypot - the forms carry a hidden "company" field that people never see.
//    A bot that fills every field fills it too, and gets a fake success with nothing saved.

const hits = new Map();

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  return (typeof fwd === 'string' && fwd.split(',')[0].trim()) || req.socket?.remoteAddress || 'unknown';
}

export function rateLimited(req, { max = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const ip = clientIp(req);
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < windowMs)) hits.delete(key);
    }
  }
  return recent.length > max;
}

export function isBot(body) {
  return Boolean(body && typeof body.company === 'string' && body.company.trim() !== '');
}

// Returns true when the request was blocked and a response was already sent.
export function guard(req, res, options) {
  if (rateLimited(req, options)) {
    res.status(429).json({ error: 'Too many requests' });
    return true;
  }
  if (isBot(req.body)) {
    res.status(200).json({ success: true });
    return true;
  }
  return false;
}
