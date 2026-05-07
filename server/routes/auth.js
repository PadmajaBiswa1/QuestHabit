const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken, getJwtSecret, verifyToken } = require('../middleware/auth');

const router = express.Router();

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const publicUser = (user) => ({
  id: user._id.toString(),
  username: user.username,
  email: user.email,
  hero: user.hero,
  streaks: user.streaks,
  badges: user.badges,
  statistics: user.statistics,
});

const signToken = (user) => jwt.sign(
  {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
  },
  getJwtSecret(),
  { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
);

router.get('/status', asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.json({ authenticated: false });
  }

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch (error) {
    const status = error.message === 'JWT_SECRET is not configured' ? 500 : 401;
    return res.status(status).json({ authenticated: false, message: error.message || 'Invalid token' });
  }

  const user = await User.findById(decoded.id);

  if (!user || !user.isActive) {
    return res.status(401).json({ authenticated: false, message: 'User not found' });
  }

  res.json({ authenticated: true, user: publicUser(user) });
}));

router.post('/register', asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedUsername = username.trim().toLowerCase();

  const existingUser = await User.findOne({
    $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
  });

  if (existingUser) {
    const field = existingUser.email === normalizedEmail ? 'email' : 'username';
    return res.status(409).json({ message: `A user with this ${field} already exists` });
  }

  const user = await User.create({
    email: normalizedEmail,
    password,
    username: normalizedUsername,
  });

  res.status(201).json({
    message: 'User registered successfully',
    token: signToken(user),
    user: publicUser(user),
  });
}));

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');

  if (!user || !user.isActive) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  user.lastLogin = new Date();
  await user.save();

  res.json({
    message: 'Logged in successfully',
    token: signToken(user),
    user: publicUser(user),
  });
}));

router.post('/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
