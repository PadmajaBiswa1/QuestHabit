const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const parsePaging = (query) => {
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
  const page = Math.max(Number(query.page) || 1, 1);
  return { limit, page, skip: (page - 1) * limit };
};

const sortByMetric = (metric = 'xp') => {
  const sorts = {
    xp: { 'hero.level': -1, 'hero.xp': -1, updatedAt: -1 },
    level: { 'hero.level': -1, 'hero.xp': -1, updatedAt: -1 },
    streak: { 'streaks.currentStreak': -1, 'hero.level': -1, updatedAt: -1 },
    habits: { 'streaks.totalHabitsCompleted': -1, 'hero.level': -1, updatedAt: -1 },
  };

  return sorts[metric] || sorts.xp;
};

const serializeEntry = (user, rank) => ({
  rank,
  id: user._id.toString(),
  username: user.username,
  hero: {
    name: user.hero.name,
    class: user.hero.class,
    level: user.hero.level,
    xp: user.hero.xp,
  },
  currentStreak: user.streaks.currentStreak,
  longestStreak: user.streaks.longestStreak,
  totalHabitsCompleted: user.streaks.totalHabitsCompleted,
});

const getLeaderboard = async ({ metric, limit, page, skip }) => {
  const users = await User.find({ isActive: true })
    .select('username hero streaks')
    .sort(sortByMetric(metric))
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments({ isActive: true });

  return {
    metric,
    page,
    limit,
    total,
    entries: users.map((user, index) => serializeEntry(user, skip + index + 1)),
  };
};

router.get('/', asyncHandler(async (req, res) => {
  const paging = parsePaging(req.query);
  const metric = req.query.metric || 'xp';
  res.json(await getLeaderboard({ metric, ...paging }));
}));

router.get('/rank/:userId', asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ message: 'Invalid user id' });
  }

  const users = await User.find({ isActive: true })
    .select('username hero streaks')
    .sort(sortByMetric(req.query.metric || 'xp'));

  const index = users.findIndex((user) => user._id.toString() === userId);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found in leaderboard' });
  }

  res.json(serializeEntry(users[index], index + 1));
}));

router.get('/category/:category', asyncHandler(async (req, res) => {
  const categoryMetricMap = {
    xp: 'xp',
    level: 'level',
    streak: 'streak',
    habits: 'habits',
    completions: 'habits',
  };
  const metric = categoryMetricMap[req.params.category.toLowerCase()];

  if (!metric) {
    return res.status(400).json({ message: 'Category must be xp, level, streak, habits, or completions' });
  }

  const paging = parsePaging(req.query);
  res.json(await getLeaderboard({ metric, ...paging }));
}));

module.exports = router;
