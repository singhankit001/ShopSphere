const crypto = require('crypto');
const https = require('https');
const env = require('../config/env');

const requestRazorpay = (path, payload) => new Promise((resolve, reject) => {
  if (!env.razorpayKeyId || !env.razorpayKeySecret) {
    return reject(new Error('Razorpay credentials are not configured'));
  }

  const body = JSON.stringify(payload);
  const request = https.request({
    hostname: 'api.razorpay.com',
    path,
    method: 'POST',
    auth: `${env.razorpayKeyId}:${env.razorpayKeySecret}`,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  }, (response) => {
    let data = '';
    response.on('data', (chunk) => { data += chunk; });
    response.on('end', () => {
      const parsed = data ? JSON.parse(data) : {};
      if (response.statusCode >= 400) return reject(new Error(parsed.error?.description || 'Razorpay request failed'));
      resolve(parsed);
    });
  });

  request.on('error', reject);
  request.write(body);
  request.end();
});

const createRazorpayOrder = ({ amount, currency = 'INR', receipt, notes = {} }) => requestRazorpay('/v1/orders', {
  amount: Math.round(amount * 100),
  currency,
  receipt,
  notes,
  payment_capture: 1,
});

const verifyRazorpaySignature = ({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) => {
  const body = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expected = crypto
    .createHmac('sha256', env.razorpayKeySecret)
    .update(body)
    .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpaySignature));
};

const verifyWebhookSignature = (rawBody, signature) => {
  if (!env.razorpayWebhookSecret) return false;
  const expected = crypto
    .createHmac('sha256', env.razorpayWebhookSecret)
    .update(rawBody)
    .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature || ''));
};

module.exports = {
  createRazorpayOrder,
  verifyRazorpaySignature,
  verifyWebhookSignature,
};
