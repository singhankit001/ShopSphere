const crypto = require('crypto');

const buckets = new Map();

const securityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('X-Request-Id', req.headers['x-request-id'] || crypto.randomUUID());
  next();
};

const rateLimit = ({ windowMs = 15 * 60 * 1000, max = 300 } = {}) => (req, res, next) => {
  const key = `${req.ip}:${req.path}`;
  const now = Date.now();
  const bucket = buckets.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + windowMs;
  }

  bucket.count += 1;
  buckets.set(key, bucket);
  res.setHeader('X-RateLimit-Limit', max);
  res.setHeader('X-RateLimit-Remaining', Math.max(0, max - bucket.count));

  if (bucket.count > max) {
    return res.status(429).json({ message: 'Too many requests, please retry later.' });
  }
  next();
};

const sanitizeBody = (req, res, next) => {
  const clean = (value) => {
    if (Array.isArray(value)) return value.map(clean);
    if (value && typeof value === 'object') {
      return Object.entries(value).reduce((acc, [key, child]) => {
        if (!key.startsWith('$') && !key.includes('.')) acc[key] = clean(child);
        return acc;
      }, {});
    }
    return value;
  };

  if (req.body) req.body = clean(req.body);
  if (req.query) req.query = clean(req.query);
  if (req.params) req.params = clean(req.params);
  next();
};

module.exports = { securityHeaders, rateLimit, sanitizeBody };
