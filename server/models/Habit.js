const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema(
  {
    // Reference to User
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },

    // Basic Information
    title: {
      type: String,
      required: [true, 'Habit title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },

    // Categorization
    category: {
      type: String,
      enum: ['Health', 'Fitness', 'Learning', 'Productivity', 'Finance', 'Social', 'Creativity', 'Mindfulness', 'Other'],
      default: 'Other',
    },

    // Difficulty Level (affects XP rewards)
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard', 'Extreme'],
      default: 'Medium',
    },

    // Frequency
    frequency: {
      type: String,
      enum: ['daily', 'weekly'],
      default: 'daily',
    },

    // Habit Streak Tracking
    streak: {
      current: {
        type: Number,
        default: 0,
        min: 0,
      },
      longest: {
        type: Number,
        default: 0,
        min: 0,
      },
      lastCompletedDate: {
        type: Date,
        default: null,
      },
    },

    // Completed Dates Tracking
    completedDates: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        _id: false,
      },
    ],

    // XP System
    xpReward: {
      base: {
        type: Number,
        default: 50,
        min: 10,
      },
      streak: {
        type: Number,
        default: 10, // Bonus XP per streak day
        min: 0,
      },
    },

    // Habit Statistics
    statistics: {
      totalCompleted: {
        type: Number,
        default: 0,
        min: 0,
      },
      completionRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      timesStarted: {
        type: Date,
        default: Date.now,
      },
    },

    // Habit Status
    status: {
      type: String,
      enum: ['active', 'paused', 'abandoned', 'completed'],
      default: 'active',
    },

    isVisible: {
      type: Boolean,
      default: true,
    },

    // Color/Icon for UI
    color: {
      type: String,
      default: '#3498db',
    },

    icon: {
      type: String,
      default: '🎯',
    },

    // Reminders
    reminders: [
      {
        time: String, // HH:mm format
        days: [String], // ['Monday', 'Tuesday', etc.]
        _id: false,
      },
    ],

    // Notes
    notes: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        content: String,
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
habitSchema.index({ userId: 1, createdAt: -1 });
habitSchema.index({ userId: 1, status: 1 });

// Method to mark habit as completed today
habitSchema.methods.completeToday = function () {
  const today = new Date().toDateString();
  const lastCompleted = this.streak.lastCompletedDate
    ? new Date(this.streak.lastCompletedDate).toDateString()
    : null;

  // Check if already completed today
  if (lastCompleted === today) {
    return { success: false, message: 'Habit already completed today' };
  }

  // Check if streak should continue or reset
  if (lastCompleted) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastCompleted !== yesterday) {
      // Reset streak if not completed yesterday
      this.streak.current = 1;
    } else {
      // Continue streak
      this.streak.current += 1;
    }
  } else {
    this.streak.current = 1;
  }

  // Update longest streak
  if (this.streak.current > this.streak.longest) {
    this.streak.longest = this.streak.current;
  }

  // Add today to completed dates
  this.completedDates.push({ date: new Date() });

  // Update statistics
  this.statistics.totalCompleted += 1;

  // Update last completed date
  this.streak.lastCompletedDate = new Date();

  // Calculate XP reward
  const xpReward = this.xpReward.base + this.streak.current * this.xpReward.streak;

  return {
    success: true,
    streak: this.streak.current,
    longestStreak: this.streak.longest,
    xpReward: xpReward,
    message: `Habit completed! Streak: ${this.streak.current}`,
  };
};

// Method to get completion percentage for a time period
habitSchema.methods.getCompletionRate = function (days = 30) {
  const startDate = new Date(Date.now() - days * 86400000);
  const completedInPeriod = this.completedDates.filter((entry) => new Date(entry.date) >= startDate).length;
  const possibleCompletions = this.frequency === 'daily' ? days : Math.ceil(days / 7);
  return Math.round((completedInPeriod / possibleCompletions) * 100);
};

// Method to add note to habit
habitSchema.methods.addNote = function (content) {
  this.notes.push({
    date: new Date(),
    content: content,
  });
  return this;
};

// Method to pause habit
habitSchema.methods.pause = function () {
  this.status = 'paused';
  return this;
};

// Method to resume habit
habitSchema.methods.resume = function () {
  this.status = 'active';
  return this;
};

// Method to abandon habit
habitSchema.methods.abandon = function () {
  this.status = 'abandoned';
  return this;
};

// Method to reset streak
habitSchema.methods.resetStreak = function () {
  this.streak.current = 0;
  this.streak.lastCompletedDate = null;
  return this;
};

// Method to get XP reward for this habit based on current streak
habitSchema.methods.getXPReward = function () {
  return this.xpReward.base + this.streak.current * this.xpReward.streak;
};

habitSchema.methods.calculateReward = function () {
  return this.getXPReward();
};

// Virtual to get days since last completion
habitSchema.virtual('daysSinceCompletion').get(function () {
  if (!this.streak.lastCompletedDate) return null;
  const lastDate = new Date(this.streak.lastCompletedDate);
  const today = new Date();
  return Math.floor((today - lastDate) / 86400000);
});

// Ensure virtuals are included when converting to JSON
habitSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Habit', habitSchema);
