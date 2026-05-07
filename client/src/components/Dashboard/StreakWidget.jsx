import { motion } from 'framer-motion';

const StreakWidget = ({ streak = 0, longestStreak = 0 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Current Streak */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        whileHover={{ scale: 1.05 }}
        className="bg-gradient-to-br from-orange-900/40 to-red-900/40 backdrop-blur-xl border border-orange-500/40 rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-300 text-sm font-semibold mb-2">Current Streak</p>
            <motion.p
              key={streak}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-orange-400"
            >
              {streak}
            </motion.p>
            <p className="text-orange-300 text-xs mt-1">days 🔥</p>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-5xl"
          >
            🔥
          </motion.div>
        </div>
      </motion.div>

      {/* Longest Streak */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl border border-purple-500/40 rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-300 text-sm font-semibold mb-2">Longest Streak</p>
            <motion.p
              key={longestStreak}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-purple-400"
            >
              {longestStreak}
            </motion.p>
            <p className="text-purple-300 text-xs mt-1">personal best 🌟</p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="text-4xl"
          >
            🌟
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StreakWidget;
