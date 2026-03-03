const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

const signAccessToken = (user) => jwt.sign(
  { id: user._id, role: user.role },
  env.jwtSecret,
  { expiresIn: env.accessTokenTtl }
);

const signRefreshToken = (user) => jwt.sign(
  { id: user._id, type: 'refresh' },
  env.jwtRefreshSecret,
  { expiresIn: env.refreshTokenTtl }
);

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const issueTokenPair = async (user) => {
  const token = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  user.refreshTokenHash = hashToken(refreshToken);
  user.lastLoginAt = new Date();
  await user.save();
  return { token, refreshToken };
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  hashToken,
  issueTokenPair,
};
