import { motion } from 'framer-motion';
import { CheckCircle2, Flame, Zap } from 'lucide-react';

const QuestCard = ({ quest = {}, onComplete, index = 0 }) => {
  const {
    title = 'Daily Quest',
    description = 'Complete this quest to earn XP',
    difficulty = 'Medium',
    category = 'Health',
    xpReward = 50,
    streak = 0,
    completed = false,
  } = quest;

  const difficultyColors = {
    Easy: 'from-emerald-500 to-green-500',
    Medium: 'from-blue-500 to-cyan-500',
    Hard: 'from-orange-500 to-red-500',
    Extreme: 'from-purple-600 to-pink-600',
  };

  const categoryEmojis = {
    Health: '🫀',
    Fitness: '🏋️',
    Learning: '📘',
    Productivity: '⚙️',
    Finance: '💎',
    Social: '🤝',
    Creativity: '🎨',
    Mindfulness: '🪷',
    Other: '✨',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`bg-gradient-to-br ${
        completed
          ? 'from-slate-700/50 to-slate-800/50 opacity-60'
          : 'from-slate-800/80 to-slate-900/80'
      } backdrop-blur-xl border ${
        completed ? 'border-green-500/20' : 'border-purple-500/30'
      } rounded-xl p-5 shadow-lg transition-all duration-300`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-2xl">{categoryEmojis[category] || '✨'}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-semibold text-lg ${
                completed ? 'text-gray-400 line-through' : 'text-white'
              }`}>
                {title}
              </h3>
              {completed && (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              )}
            </div>
            <p className="text-sm text-purple-300">{description}</p>
          </div>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${
          difficultyColors[difficulty]
        } text-white`}>
          {difficulty}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-slate-700/50 rounded-lg p-2 border border-purple-500/10">
          <div className="flex items-center gap-1 mb-1">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span className="text-xs text-purple-300">XP Reward</span>
          </div>
          <p className="text-lg font-bold text-yellow-400">+{xpReward}</p>
        </div>

        {streak > 0 && (
          <div className="bg-slate-700/50 rounded-lg p-2 border border-orange-500/10">
            <div className="flex items-center gap-1 mb-1">
              <Flame className="w-3 h-3 text-orange-400" />
              <span className="text-xs text-purple-300">Streak</span>
            </div>
            <p className="text-lg font-bold text-orange-400">{streak}x</p>
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        disabled={completed}
        className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 ${
          completed
            ? 'bg-green-500/20 text-green-300 cursor-default'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg'
        }`}
      >
        {completed ? (
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Completed
          </div>
        ) : (
          'Complete Quest'
        )}
      </motion.button>
    </motion.div>
  );
};

export default QuestCard;
