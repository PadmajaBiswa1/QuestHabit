import { motion } from 'framer-motion';
import { Check, Zap, Calendar } from 'lucide-react';

const HabitCard = ({ habit = {}, onComplete, index = 0 }) => {
  const {
    title = 'Build Habit',
    description = 'Complete this habit daily',
    category = 'Health',
    difficulty = 'Medium',
    xpReward = 50,
    streak = 0,
    longestStreak = 0,
    completed = false,
    progress = 0,
    maxProgress = 10,
    daysRemaining = 1,
  } = habit;

  const difficultyConfig = {
    Easy: {
      bgColor: 'rgba(5, 150, 105, 0.3)',
      border: 'border-emerald-500/50',
      badge: 'bg-emerald-600 text-emerald-100',
      icon: '🎯',
      color: 'emerald',
      glow: 'hover:shadow-emerald-500/30',
      glowColor: 'rgba(16, 185, 129, 0.5)',
      progressGradient: 'linear-gradient(to right, rgb(16, 185, 129), rgb(34, 197, 94))',
      progressGlow: 'rgba(16, 185, 129, 0.5)',
    },
    Medium: {
      bgColor: 'rgba(30, 58, 138, 0.3)',
      border: 'border-blue-500/50',
      badge: 'bg-blue-600 text-blue-100',
      icon: '⚡',
      color: 'blue',
      glow: 'hover:shadow-blue-500/30',
      glowColor: 'rgba(59, 130, 246, 0.5)',
      progressGradient: 'linear-gradient(to right, rgb(59, 130, 246), rgb(34, 211, 238))',
      progressGlow: 'rgba(59, 130, 246, 0.5)',
    },
    Hard: {
      bgColor: 'rgba(124, 45, 18, 0.3)',
      border: 'border-orange-500/50',
      badge: 'bg-orange-600 text-orange-100',
      icon: '🔥',
      color: 'orange',
      glow: 'hover:shadow-orange-500/30',
      glowColor: 'rgba(249, 115, 22, 0.5)',
      progressGradient: 'linear-gradient(to right, rgb(249, 115, 22), rgb(239, 68, 68))',
      progressGlow: 'rgba(249, 115, 22, 0.5)',
    },
    Extreme: {
      bgColor: 'rgba(88, 28, 135, 0.3)',
      border: 'border-purple-500/50',
      badge: 'linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153)) text-white',
      icon: '💀',
      color: 'purple',
      glow: 'hover:shadow-purple-500/30',
      glowColor: 'rgba(168, 85, 247, 0.5)',
      progressGradient: 'linear-gradient(to right, rgb(168, 85, 247), rgb(236, 72, 153))',
      progressGlow: 'rgba(168, 85, 247, 0.5)',
    },
  };

  const categoryEmojis = {
    Health: '🏥',
    Fitness: '💪',
    Learning: '📚',
    Productivity: '⚡',
    Finance: '💰',
    Social: '👥',
    Creativity: '🎨',
    Mindfulness: '🧘',
    Other: '🎯',
  };

  const config = difficultyConfig[difficulty] || difficultyConfig.Medium;
  const categoryEmoji = categoryEmojis[category] || categoryEmojis.Other;
  const progressPercent = (progress / maxProgress) * 100;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.08, duration: 0.4, ease: 'easeOut' },
    },
  };

  const checkboxVariants = {
    unchecked: { scale: 1 },
    checked: { scale: 1.2, rotate: 360 },
  };

  const flameVariants = {
    animate: {
      y: [0, -8, 0],
      opacity: [1, 0.8, 1],
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="group relative h-full"
    >
      {/* Glow background effect */}
      <div
        className="absolute inset-0 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: config.glowColor,
          opacity: completed ? 0 : undefined,
        }}
      />

      {/* Main card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`relative h-full backdrop-blur-xl border ${config.border} rounded-xl p-5 shadow-lg ${config.glow} transition-all duration-300 overflow-hidden group/card`}
        style={{
          backgroundColor: config.bgColor,
        }}
      >
        {/* Animated top border */}
        <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover/card:opacity-50 transition-opacity duration-300" style={{
          background: 'linear-gradient(to right, transparent, white, transparent)',
        }} />

        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5 group-hover/card:opacity-10 transition-opacity duration-300">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(45deg, transparent 48%, white 49%, white 51%, transparent 52%)',
              backgroundSize: '20px 20px',
            }}
          />
        </div>

        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Header section */}
          <div className="flex items-start justify-between mb-4">
            {/* Left side: Category and Title */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{categoryEmoji}</span>
                <span className="text-2xl">{config.icon}</span>
              </div>
              <motion.h3
                className="text-lg font-bold text-white line-clamp-2 group-hover/card:text-blue-200 transition-colors"
                whileHover={{ x: 3 }}
              >
                {title}
              </motion.h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">{description}</p>
            </div>

            {/* Right side: Difficulty badge */}
            <div className="ml-3 flex flex-col items-end gap-2">
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  difficulty === 'Extreme' ? 'text-white' : config.badge
                }`}
                style={
                  difficulty === 'Extreme'
                    ? { background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153))' }
                    : {}
                }
              >
                {difficulty}
              </div>
            </div>
          </div>

          {/* Streak and XP row */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {/* Streak display */}
            <motion.div
              className="bg-slate-700/40 rounded-lg p-3 border border-white/10 backdrop-blur-sm group-hover/card:border-orange-500/30 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <motion.div
                  animate={streak > 0 ? 'animate' : 'initial'}
                  variants={flameVariants}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xl"
                >
                  🔥
                </motion.div>
                <span className="text-xs text-orange-300 font-semibold">Streak</span>
              </div>
              <div className="text-lg font-bold text-orange-400">{streak}x</div>
              {longestStreak > streak && (
                <div className="text-xs text-orange-300/70">Best: {longestStreak}x</div>
              )}
            </motion.div>

            {/* XP Reward */}
            <motion.div
              className="bg-slate-700/40 rounded-lg p-3 border border-white/10 backdrop-blur-sm group-hover/card:border-yellow-500/30 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-yellow-300 font-semibold">XP</span>
              </div>
              <motion.div
                className="text-lg font-bold text-yellow-400"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                +{xpReward}
              </motion.div>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-400 font-semibold">Progress</span>
              <span className="text-xs text-slate-300">
                {progress}/{maxProgress}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden border border-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full"
                style={{
                  background: config.progressGradient,
                  boxShadow: `0 0 10px ${config.progressGlow}`,
                }}
              />
            </div>
          </div>

          {/* Footer: Days remaining and completion button */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left</span>
            </div>

            {/* Completion checkbox button */}
            <motion.button
              onClick={onComplete}
              variants={checkboxVariants}
              animate={completed ? 'checked' : 'unchecked'}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`relative w-10 h-10 rounded-lg font-bold transition-all duration-300 flex items-center justify-center shadow-lg border-2 ${
                completed
                  ? `text-white border-green-400`
                  : `bg-slate-700/50 border-slate-600 text-slate-400 hover:border-blue-500 hover:bg-blue-600/20 hover:text-blue-300`
              }`}
              style={
                completed
                  ? {
                      background: 'linear-gradient(to bottom-right, rgb(16, 185, 129), rgb(34, 197, 94))',
                      boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)',
                    }
                  : {}
              }
            >
              {completed ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              ) : (
                <div className="w-5 h-5 border-2 border-current rounded opacity-50 group-hover/card:opacity-100 transition-opacity" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Completion glow overlay */}
        {completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom-right, rgba(16, 185, 129, 0.2), rgba(34, 197, 94, 0.2))',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default HabitCard;
