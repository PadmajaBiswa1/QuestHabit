import { motion } from 'framer-motion';
import { Zap, Heart, Sword, Shield, Crown } from 'lucide-react';
import ProgressBar from '../Common/ProgressBar';

const classEmoji = {
  Warrior: '🛡️',
  Mage: '🔮',
  Rogue: '🗡️',
  Healer: '💚',
};

const HeroCard = ({ hero = {}, onEditProfile }) => {
  const {
    name = 'Your Hero',
    level = 1,
    xp = 250,
    xpNeededForNextLevel = 1000,
    hp = 85,
    maxHp = 100,
    attack = 15,
    defense = 8,
    class: heroClass = 'Warrior',
  } = hero;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 shadow-2xl hover:border-purple-400/60 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {name}
            </h2>
            <Crown className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-purple-300 font-semibold">{heroClass}</p>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="text-4xl"
        >
          {classEmoji[heroClass] || '✨'}
        </motion.div>
      </div>

      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-300 font-bold text-lg">Level {level}</span>
        </div>
        <ProgressBar current={xp} max={xpNeededForNextLevel} label="Experience Points" color="purple" />
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex items-center gap-3">
          <Heart className="w-5 h-5 text-red-400 flex-shrink-0" />
          <ProgressBar current={hp} max={maxHp} label="Health Points" color="red" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-purple-500/20 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <Sword className="w-4 h-4 text-orange-400" />
            <span className="text-xs text-purple-300">Attack</span>
          </div>
          <p className="text-2xl font-bold text-orange-400">{attack}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-purple-500/20 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-purple-300">Defense</span>
          </div>
          <p className="text-2xl font-bold text-cyan-400">{defense}</p>
        </motion.div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onEditProfile}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 cursor-pointer"
      >
        Edit Hero Profile
      </motion.button>
    </motion.div>
  );
};

export default HeroCard;
