import { motion } from 'framer-motion';

const ProgressBar = ({ current, max, label, color = 'purple', showPercent = true }) => {
  const percentage = (current / max) * 100;

  const colorGradients = {
    purple: {
      gradient: 'linear-gradient(to right, rgb(168, 85, 247), rgb(236, 72, 153))',
      glow: 'rgba(168, 85, 247, 0.5)',
    },
    red: {
      gradient: 'linear-gradient(to right, rgb(239, 68, 68), rgb(234, 88, 12))',
      glow: 'rgba(239, 68, 68, 0.5)',
    },
    blue: {
      gradient: 'linear-gradient(to right, rgb(59, 130, 246), rgb(34, 211, 238))',
      glow: 'rgba(59, 130, 246, 0.5)',
    },
    green: {
      gradient: 'linear-gradient(to right, rgb(16, 185, 129), rgb(34, 197, 94))',
      glow: 'rgba(16, 185, 129, 0.5)',
    },
  };

  const selectedColor = colorGradients[color] || colorGradients.purple;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-purple-200">{label}</span>
        {showPercent && (
          <span className="text-xs text-purple-300 font-mono">
            {current} / {max}
          </span>
        )}
      </div>
      <div className="w-full h-3 rounded-full overflow-hidden border border-purple-500/30 shadow-lg" style={{
        background: 'linear-gradient(to right, rgb(30, 27, 75), rgb(15, 23, 42))',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full shadow-lg"
          style={{
            background: selectedColor.gradient,
            boxShadow: `0 0 20px ${selectedColor.glow}`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
