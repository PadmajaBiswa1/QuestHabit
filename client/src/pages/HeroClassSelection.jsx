import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import HeroClassCard from '../components/HeroClassSelection/HeroClassCard';
import { apiRequest } from '../lib/api';

const HeroClassSelection = ({ token, onSelectClass }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const classes = [
    {
      name: 'Warrior',
      description:
        'Fearless and mighty. Exceptional health and attack power. Lead the charge with sword and shield.',
      abilities: [
        'Charge: Rush forward to damage and stun enemies',
        'Shield Bash: Block incoming damage for allies',
        'Bloodlust: Increased damage when low on health',
        'Endurance: Gradually restore health over time',
      ],
      stats: {
        HP: 'S',
        ATK: 'S',
        DEF: 'A',
        SPD: 'C',
      },
    },
    {
      name: 'Mage',
      description:
        'Masters of arcane arts. Command powerful spells and enchantments. Excel at area damage.',
      abilities: [
        'Fireball: Hurl a blazing projectile at enemies',
        'Mana Shield: Convert mana to temporary shield',
        'Teleport: Instantly move to a safe location',
        'Spell Amplify: Increase all spell damage by 50%',
      ],
      stats: {
        HP: 'D',
        ATK: 'A',
        DEF: 'D',
        SPD: 'A',
      },
    },
    {
      name: 'Rogue',
      description:
        'Swift and cunning. Strike from the shadows with precision. Deadly assassins and skilled duelists.',
      abilities: [
        'Backstab: Deal massive damage to unsuspecting foes',
        'Shadow Clone: Create duplicates to confuse enemies',
        'Evade: Dodge incoming attacks effortlessly',
        'Poison Strike: Inflict damage over time',
      ],
      stats: {
        HP: 'C',
        ATK: 'A',
        DEF: 'C',
        SPD: 'S',
      },
    },
    {
      name: 'Healer',
      description:
        'Dedicated guardians of life. Wield restorative magic and protective blessings. Keep allies strong.',
      abilities: [
        'Holy Light: Heal allies in an area',
        'Divine Shield: Grant protection to teammates',
        'Resurrection: Bring fallen allies back to battle',
        'Blessing: Enhance ally abilities and stats',
      ],
      stats: {
        HP: 'B',
        ATK: 'C',
        DEF: 'B',
        SPD: 'B',
      },
    },
  ];

  const handleSelectClass = (className) => {
    setSelectedClass(className);
  };

  const handleConfirmClass = async () => {
    if (!selectedClass) {
      toast.error('Please select a class first');
      return;
    }

    setIsConfirming(true);

    try {
      const data = await apiRequest('/api/hero/select-class', {
        method: 'POST',
        token,
        body: { className: selectedClass },
      });

      // Confetti celebration
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#dc2626', '#7c3aed', '#059669', '#ec4899'],
        ticks: 300,
      });

      toast.success(`Welcome, ${selectedClass}! Your adventure begins!`, {
        duration: 3,
        icon: '🚀',
      });

      setTimeout(() => {
        onSelectClass({ className: selectedClass, hero: data.hero });
      }, 500);
    } catch (error) {
      console.error('Error selecting class:', error);
      toast.error('Error processing selection. Please try again.');
      setIsConfirming(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-950">
      {/* Animated background particles - pure CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 255, 0.2); }
          50% { box-shadow: 0 0 40px rgba(124, 58, 255, 0.4); }
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .particle-1 { animation: float 8s ease-in-out infinite; }
        .particle-2 { animation: float 12s ease-in-out infinite; animation-delay: 2s; }
        .particle-3 { animation: float 10s ease-in-out infinite; animation-delay: 4s; }
        .particle-4 { animation: float 14s ease-in-out infinite; animation-delay: 1s; }
        .particle-5 { animation: float 9s ease-in-out infinite; animation-delay: 3s; }
      `}</style>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="particle particle-1 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-transparent rounded-full blur-3xl"
          style={{ top: '10%', left: '10%' }}
        />
        <div
          className="particle particle-2 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-3xl"
          style={{ top: '40%', right: '10%' }}
        />
        <div
          className="particle particle-3 w-72 h-72 bg-gradient-to-br from-cyan-600/10 to-transparent rounded-full blur-3xl"
          style={{ bottom: '10%', left: '20%' }}
        />
        <div
          className="particle particle-4 w-80 h-80 bg-gradient-to-br from-emerald-600/10 to-transparent rounded-full blur-3xl"
          style={{ bottom: '20%', right: '15%' }}
        />
        <div
          className="particle particle-5 w-96 h-96 bg-gradient-to-br from-rose-600/10 to-transparent rounded-full blur-3xl"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl"
        >
          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Choose Your Destiny
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 mb-3"
          >
            Select a hero class to begin your legendary journey
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent max-w-xs mx-auto"
          />
        </motion.div>

        {/* Class cards grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mb-12"
        >
          {classes.map((classData, index) => (
            <HeroClassCard
              key={classData.name}
              classData={classData}
              isSelected={selectedClass === classData.name}
              onSelect={() => handleSelectClass(classData.name)}
              index={index}
            />
          ))}
        </motion.div>

        {/* Selection status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 text-center"
        >
          {selectedClass ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-lg text-slate-300"
            >
              You have selected:{' '}
              <span className="font-bold text-transparent bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text">
                {selectedClass}
              </span>
            </motion.div>
          ) : (
            <div className="text-slate-400 text-base">
              Select a class to continue your adventure
            </div>
          )}
        </motion.div>

        {/* Confirm button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={selectedClass ? { scale: 1.05 } : {}}
          whileTap={selectedClass ? { scale: 0.95 } : {}}
          onClick={handleConfirmClass}
          disabled={!selectedClass || isConfirming}
          className={`px-10 py-3.5 rounded-xl font-bold text-base transition-all duration-300 ${
            selectedClass
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-2xl cursor-pointer'
              : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
          }`}
        >
          {isConfirming ? (
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Confirming...
            </motion.span>
          ) : (
            'Confirm & Begin Adventure'
          )}
        </motion.button>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center max-w-2xl"
        >
          <p className="text-slate-400 text-sm mb-4">
            Each class offers unique abilities and playstyles. You can change your class later as you progress!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-xs text-slate-500">
            <span>🧩 Choose based on your playstyle</span>
            <span className="hidden md:inline">•</span>
            <span>✨ Abilities unlock as you level up</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroClassSelection;
