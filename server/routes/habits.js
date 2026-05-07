const express = require('express');
const mongoose = require('mongoose');
const Habit = require('../models/Habit');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const serializeHabit = (habit) => {
  const data = habit.toJSON();
  const lastCompleted = data.streak?.lastCompletedDate
    ? new Date(data.streak.lastCompletedDate).toDateString()
    : null;
  const completed = lastCompleted === new Date().toDateString();

  return {
    ...data,
    id: data._id.toString(),
    streak: data.streak?.current || 0,
    longestStreak: data.streak?.longest || 0,
    completed,
    xpReward: habit.getXPReward(),
    xpRewardConfig: data.xpReward,
  };
};

const validateObjectId = (id, res) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: 'Invalid habit id' });
    return false;
  }

  return true;
};

const buildHabitPayload = (body) => {
  const title = body.title || body.name;
  const payload = {};

  if (title !== undefined) payload.title = title;
  if (body.description !== undefined) payload.description = body.description;
  if (body.category !== undefined) payload.category = body.category;
  if (body.difficulty !== undefined) payload.difficulty = body.difficulty;
  if (body.frequency !== undefined) payload.frequency = body.frequency;
  if (body.status !== undefined) payload.status = body.status;
  if (body.isVisible !== undefined) payload.isVisible = body.isVisible;
  if (body.color !== undefined) payload.color = body.color;
  if (body.icon !== undefined) payload.icon = body.icon;
  if (body.reminders !== undefined) payload.reminders = body.reminders;
  if (body.notes !== undefined) payload.notes = body.notes;

  if (body.xpReward !== undefined) {
    if (typeof body.xpReward === 'number') {
      payload['xpReward.base'] = body.xpReward;
    } else if (body.xpReward && typeof body.xpReward === 'object') {
      if (body.xpReward.base !== undefined) payload['xpReward.base'] = body.xpReward.base;
      if (body.xpReward.streak !== undefined) payload['xpReward.streak'] = body.xpReward.streak;
    }
  }

  return payload;
};

const expandDottedPayload = (payload) => {
  const expanded = { ...payload };
  const xpReward = {};

  if (expanded['xpReward.base'] !== undefined) {
    xpReward.base = expanded['xpReward.base'];
    delete expanded['xpReward.base'];
  }

  if (expanded['xpReward.streak'] !== undefined) {
    xpReward.streak = expanded['xpReward.streak'];
    delete expanded['xpReward.streak'];
  }

  if (Object.keys(xpReward).length) {
    expanded.xpReward = xpReward;
  }

  return expanded;
};

router.use(authenticateToken);

router.get('/', asyncHandler(async (req, res) => {
  const filter = { userId: req.user.id };
  const { status, category, frequency } = req.query;

  if (status) filter.status = status;
  if (category) filter.category = category;
  if (frequency) filter.frequency = frequency;

  const habits = await Habit.find(filter).sort({ createdAt: -1 });
  res.json({ habits: habits.map(serializeHabit) });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  if (!validateObjectId(req.params.id, res)) return;

  const habit = await Habit.findOne({ _id: req.params.id, userId: req.user.id });
  if (!habit) {
    return res.status(404).json({ message: 'Habit not found' });
  }

  res.json({ habit: serializeHabit(habit) });
}));

router.post('/', asyncHandler(async (req, res) => {
  const payload = buildHabitPayload(req.body);

  if (!payload.title || !payload.title.trim()) {
    return res.status(400).json({ message: 'Habit title is required' });
  }

  const habit = await Habit.create({
    ...expandDottedPayload(payload),
    userId: req.user.id,
  });

  await User.findByIdAndUpdate(req.user.id, { $inc: { 'statistics.totalHabits': 1 } });

  res.status(201).json({
    message: 'Habit created successfully',
    habit: serializeHabit(habit),
  });
}));

router.put('/:id', asyncHandler(async (req, res) => {
  if (!validateObjectId(req.params.id, res)) return;

  const payload = buildHabitPayload(req.body);

  if (payload.title !== undefined && !payload.title.trim()) {
    return res.status(400).json({ message: 'Habit title cannot be empty' });
  }

  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { $set: payload },
    { new: true, runValidators: true }
  );

  if (!habit) {
    return res.status(404).json({ message: 'Habit not found' });
  }

  res.json({
    message: 'Habit updated successfully',
    habit: serializeHabit(habit),
  });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  if (!validateObjectId(req.params.id, res)) return;

  const habit = await Habit.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

  if (!habit) {
    return res.status(404).json({ message: 'Habit not found' });
  }

  await User.findByIdAndUpdate(req.user.id, { $inc: { 'statistics.totalHabits': -1 } });

  res.json({ message: 'Habit deleted successfully' });
}));

router.post('/:id/track', asyncHandler(async (req, res) => {
  if (!validateObjectId(req.params.id, res)) return;

  const habit = await Habit.findOne({ _id: req.params.id, userId: req.user.id });
  if (!habit) {
    return res.status(404).json({ message: 'Habit not found' });
  }

  const result = habit.completeToday();
  if (!result.success) {
    return res.status(409).json(result);
  }

  await habit.save();

  const user = await User.findById(req.user.id);
  if (user) {
    user.addXP(result.xpReward);
    user.updateStreak();
    user.statistics.completedToday += 1;
    await user.save();
  }

  res.json({
    ...result,
    habit: serializeHabit(habit),
    hero: user ? user.hero : null,
    streaks: user ? user.streaks : null,
    statistics: user ? user.statistics : null,
  });
}));

module.exports = router;
