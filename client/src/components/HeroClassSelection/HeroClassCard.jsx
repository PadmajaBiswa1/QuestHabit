import { motion } from 'framer-motion';
import { Sword, Wand2, Zap, Heart } from 'lucide-react';

const HeroClassCard = ({ classData, isSelected, onSelect, index }) => {
  const { name, description, stats, abilities } = classData;

  const colorConfig = {
    Warrior: {
      icon: Sword,
      primary: '#dc2626',
      secondary: '#ff6b35',
      dark: '#7f1d1d',
      accentLight: '#fee2e2',
      textAccent: '#fca5a5',
      glow: '0 0 20px rgba(220, 38, 38, 0.4)',
    },
    Mage: {
      icon: Wand2,
      primary: '#7c3aed',
      secondary: '#06b6d4',
      dark: '#4c1d95',
      accentLight: '#f3e8ff',
      textAccent: '#c4b5fd',
      glow: '0 0 20px rgba(124, 58, 255, 0.4)',
    },
    Rogue: {
      icon: Zap,
      primary: '#059669',
      secondary: '#10b981',
      dark: '#064e3b',
      accentLight: '#d1fae5',
      textAccent: '#6ee7b7',
      glow: '0 0 20px rgba(16, 185, 129, 0.4)',
    },
    Healer: {
      icon: Heart,
      primary: '#ec4899',
      secondary: '#f43f5e',
      dark: '#831843',
      accentLight: '#fce7f3',
      textAccent: '#f472b6',
      glow: '0 0 20px rgba(236, 72, 153, 0.4)',
    },
  };

  const config = colorConfig[name];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group relative"
    >
      {/* Animated glow background */}
      <motion.div
        animate={isSelected ? { opacity: 1 } : { opacity: 0 }}
        className="absolute inset-0 rounded-2xl blur-xl -z-10"
        style={{
          background: `radial-gradient(circle, ${config.primary}40 0%, transparent 70%)`,
        }}
      />

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background: `radial-gradient(circle, ${config.primary}20 0%, transparent 70%)`,
        }}
      />

      {/* Main card with glassmorphism */}
      <motion.div
        onClick={onSelect}
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className={`relative h-full rounded-2xl backdrop-blur-xl border-2 transition-all duration-300 p-6 cursor-pointer overflow-hidden ${
          isSelected
            ? 'border-white/60 shadow-2xl'
            : 'border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl'
        }`}
        style={{
          background: `linear-gradient(135deg, rgba(20, 20, 30, 0.8), rgba(30, 30, 45, 0.8))`,
          boxShadow: isSelected ? config.glow : 'none',
        }}
      >
        {/* Animated selected border glow */}
        {isSelected && (
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              border: `2px solid ${config.primary}`,
              filter: `blur(2px)`,
            }}
          />
        )}

        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Header */}
          <motion.div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="mb-3 inline-flex p-2.5 rounded-xl"
                style={{ background: `${config.primary}20` }}
              >
                <Icon
                  size={24}
                  style={{ color: config.primary }}
                  strokeWidth={2.5}
                />
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-1" style={{ color: config.primary }}>
                {name}
              </h3>

              {/* Type subtitle */}
              <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                Hero Class
              </p>
            </div>

            {/* Selected badge */}
            {isSelected && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-sm"
                style={{ background: config.primary }}
              >
                ✓
              </motion.div>
            )}
          </motion.div>

          {/* Description */}
          <p className="text-sm text-white/80 leading-relaxed mb-5 line-clamp-3">
            {description}
          </p>

          {/* Stats section */}
          <div className="mb-5 grid grid-cols-4 gap-2">
            {Object.entries(stats).map(([label, value], idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 + idx * 0.05 }}
                className="rounded-lg p-2 text-center"
                style={{ background: `${config.primary}15` }}
              >
                <div className="text-xs font-semibold text-white/60 uppercase mb-1">
                  {label}
                </div>
                <div
                  className="text-lg font-bold"
                  style={{ color: config.textAccent }}
                >
                  {value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Abilities list */}
          <div className="mb-6 space-y-2">
            <h4 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-3">
              Key Abilities
            </h4>
            {abilities.slice(0, 2).map((ability, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.12 + idx * 0.08 }}
                className="flex items-start gap-2.5"
              >
                <div
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: config.primary }}
                />
                <span className="text-xs text-white/75">
                  {ability.split(':')[0]}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Select button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2.5 rounded-lg font-bold text-white text-sm transition-all duration-300"
            style={{
              background: isSelected
                ? config.primary
                : `linear-gradient(135deg, ${config.primary}80, ${config.secondary}80)`,
              boxShadow: isSelected ? config.glow : `0 4px 12px rgba(0, 0, 0, 0.2)`,
            }}
            onClick={onSelect}
          >
            {isSelected ? '✓ Selected' : 'Select Class'}
          </motion.button>
        </div>

        {/* Corner accent elements */}
        <div
          className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-5 rounded-full blur-2xl transition-opacity duration-500"
          style={{ background: config.primary }}
        />
        <div
          className="absolute bottom-0 left-0 w-24 h-24 opacity-0 group-hover:opacity-5 rounded-full blur-2xl transition-opacity duration-500"
          style={{ background: config.primary }}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroClassCard;
