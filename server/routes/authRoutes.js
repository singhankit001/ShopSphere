const express = require('express');
const router = express.Router();
const { register, login, refresh, logout, googleLogin, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

router.post('/register', validate({
  name: { required: true, type: 'string', min: 2 },
  email: { required: true, type: 'string', email: true },
  password: { required: true, type: 'string', min: 6 },
}), register);
router.post('/login', validate({
  email: { required: true, type: 'string', email: true },
  password: { required: true, type: 'string', min: 6 },
}), login);
router.post('/refresh', refresh);
router.post('/google', googleLogin);
router.post('/logout', protect, logout);
router.get('/profile', protect, getProfile);

module.exports = router;
