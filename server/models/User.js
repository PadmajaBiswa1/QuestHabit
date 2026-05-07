const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
      lowercase: true,
      match: [/^[a-z0-9_-]+$/, 'Username can only contain lowercase letters, numbers, underscores, and hyphens'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default
    },

    // Hero System
    hero: {
      name: {
        type: String,
        default: 'Hero',
      },
      level: {
        type: Number,
        default: 1,
        min: 1,
      },
      xp: {
        type: Number,
        default: 0,
        min: 0,
      },
      xpNeededForNextLevel: {
        type: Number,
        default: 1000,
      },
      hp: {
        type: Number,
        default: 100,
        min: 0,
      },
      maxHp: {
        type: Number,
        default: 100,
        min: 0,
      },
      attack: {
        type: Number,
        default: 10,
      },
      defense: {
        type: Number,
        default: 5,
      },
      class: {
        type: String,
        enum: ['Warrior', 'Mage', 'Rogue', 'Healer'],
        default: null,
      },
      selectedAt: {
        type: Date,
        default: null,
      },
    },

    // Streaks
    streaks: {
      longestStreak: {
        type: Number,
        default: 0,
      },
      currentStreak: {
        type: Number,
        default: 0,
      },
      lastCompletedDate: {
        type: Date,
        default: null,
      },
      totalHabitsCompleted: {
        type: Number,
        default: 0,
      },
    },

    // Badges & Achievements
    badges: [
      {
        _id: false,
        name: String,
        description: String,
        icon: String,
        earnedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Statistics
    statistics: {
      totalHabits: {
        type: Number,
        default: 0,
      },
      completedToday: {
        type: Number,
        default: 0,
      },
      completionRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
    },

    // Account Status
    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Pre-save middleware to hash password
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to get public user data (without sensitive fields)
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Method to add XP and handle leveling up
userSchema.methods.addXP = function (xpAmount) {
  this.hero.xp += xpAmount;

  // Check for level up
  while (this.hero.xp >= this.hero.xpNeededForNextLevel) {
    this.hero.xp -= this.hero.xpNeededForNextLevel;
    this.hero.level += 1;
    this.hero.maxHp += 10; // Increase max HP on level up
    this.hero.hp = this.hero.maxHp; // Restore HP on level up
    this.hero.attack += 2; // Increase attack on level up
    this.hero.xpNeededForNextLevel = Math.floor(this.hero.xpNeededForNextLevel * 1.1);
  }

  return this;
};

// Method to add badge
userSchema.methods.addBadge = function (badgeName, badgeDescription, badgeIcon = '🏅') {
  const badgeExists = this.badges.some((badge) => badge.name === badgeName);

  if (!badgeExists) {
    this.badges.push({
      name: badgeName,
      description: badgeDescription,
      icon: badgeIcon,
      earnedAt: new Date(),
    });
  }

  return this;
};

// Method to update streak
userSchema.methods.updateStreak = function () {
  const today = new Date().toDateString();
  const lastCompleted = this.streaks.lastCompletedDate
    ? new Date(this.streaks.lastCompletedDate).toDateString()
    : null;

  if (lastCompleted !== today) {
    // Check if streak should continue or reset
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (lastCompleted === yesterday) {
      // Continue streak
      this.streaks.currentStreak += 1;
    } else {
      // Reset streak
      this.streaks.currentStreak = 1;
    }

    // Update longest streak
    if (this.streaks.currentStreak > this.streaks.longestStreak) {
      this.streaks.longestStreak = this.streaks.currentStreak;
    }

    this.streaks.lastCompletedDate = new Date();
    this.streaks.totalHabitsCompleted += 1;
  }

  return this;
};

module.exports = mongoose.model('User', userSchema);
