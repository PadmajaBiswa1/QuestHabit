import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const BadgeShowcase = ({ badges = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 shadow-2xl"
      style={{
        background: 'linear-gradient(to bottom right, rgba(15, 23, 42, 0.86), rgba(8, 47, 73, 0.72))',
      }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Award className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-bold text-white">Achievements</h3>
      </div>

      {badges.length === 0 ? (
        <div className="rounded-xl border border-cyan-500/20 bg-slate-900/50 p-5 text-center text-cyan-200">
          <div className="text-4xl mb-2">🪴</div>
          <p className="font-semibold">No achievements yet</p>
          <p className="text-xs mt-1">Complete habits to unlock real badges.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.08, rotate: 4 }}
              className="relative group"
            >
              <div
                className="rounded-lg p-4 border border-white/10 shadow-lg cursor-pointer transition-all duration-300"
                style={{ background: badge.gradient }}
              >
                <div className="text-4xl mb-2 text-center">{badge.icon}</div>
                <p className="text-xs text-white font-semibold text-center truncate">
                  {badge.name}
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-slate-900 border border-cyan-500/50 rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap pointer-events-none z-10"
              >
                {badge.name}
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="w-full mt-6 border border-cyan-500/30 text-cyan-200 font-semibold py-2 rounded-lg text-center text-sm bg-cyan-950/30">
        Badges update from saved progress
      </div>
    </motion.div>
  );
};

export default BadgeShowcase;
