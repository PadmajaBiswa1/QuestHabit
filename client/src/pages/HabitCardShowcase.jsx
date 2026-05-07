import { useState } from 'react';
import { motion } from 'framer-motion';
import { HabitCard } from '../components/HabitCard';

const HabitCardShowcase = () => {
  const [habits, setHabits] = useState([
    {
      id: 1,
      title: 'Morning Workout',
      description: 'Complete 30 minutes of exercise',
      category: 'Fitness',
      difficulty: 'Hard',
      xpReward: 100,
      streak: 12,
      longestStreak: 15,
      completed: false,
      progress: 6,
      maxProgress: 10,
      daysRemaining: 1,
    },
    {
      id: 2,
      title: 'Read a Chapter',
      description: 'Read at least one chapter from your current book',
      category: 'Learning',
      difficulty: 'Easy',
      xpReward: 50,
      streak: 8,
      longestStreak: 12,
      completed: true,
      progress: 10,
      maxProgress: 10,
      daysRemaining: 1,
    },
    {
      id: 3,
      title: 'Meditate',
      description: 'Practice mindfulness for 15 minutes',
      category: 'Mindfulness',
      difficulty: 'Medium',
      xpReward: 75,
      streak: 5,
      longestStreak: 10,
      completed: false,
      progress: 0,
      maxProgress: 10,
      daysRemaining: 3,
    },
    {
      id: 4,
      title: 'Extreme Challenge',
      description: 'Complete the legendary quest',
      category: 'Productivity',
      difficulty: 'Extreme',
      xpReward: 250,
      streak: 3,
      longestStreak: 7,
      completed: false,
      progress: 3,
      maxProgress: 10,
      daysRemaining: 1,
    },
    {
      id: 5,
      title: 'Save Money',
      description: 'Set aside daily savings goal',
      category: 'Finance',
      difficulty: 'Medium',
      xpReward: 60,
      streak: 0,
      longestStreak: 20,
      completed: false,
      progress: 4,
      maxProgress: 10,
      daysRemaining: 2,
    },
    {
      id: 6,
      title: 'Social Time',
      description: 'Connect with a friend or family member',
      category: 'Social',
      difficulty: 'Easy',
      xpReward: 40,
      streak: 2,
      longestStreak: 5,
      completed: false,
      progress: 2,
      maxProgress: 10,
      daysRemaining: 1,
    },
  ]);

  const handleComplete = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed, progress: habit.completed ? 0 : 10 }
          : habit
      )
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Animated Habit Cards
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Beautifully designed habit tracking cards with smooth animations, difficulty levels, and streak tracking.
            Click the checkboxes to toggle completion!
          </p>
        </motion.div>

        {/* Stats overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard label="Total Habits" value={habits.length} icon="📋" />
          <StatCard label="Completed Today" value={habits.filter((h) => h.completed).length} icon="✓" />
          <StatCard
            label="Total XP Available"
            value={habits.reduce((sum, h) => sum + h.xpReward, 0)}
            icon="⚡"
          />
          <StatCard label="Longest Streak" value={Math.max(...habits.map((h) => h.longestStreak))} icon="🔥" />
        </motion.div>

        {/* Filter section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-slate-300 text-sm font-semibold mb-3">Difficulty Levels:</p>
          <div className="flex flex-wrap gap-2">
            {['Easy', 'Medium', 'Hard', 'Extreme'].map((diff) => (
              <div
                key={diff}
                className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                  diff === 'Easy'
                    ? 'bg-emerald-600/30 border-emerald-500/50 text-emerald-200'
                    : diff === 'Medium'
                    ? 'bg-blue-600/30 border-blue-500/50 text-blue-200'
                    : diff === 'Hard'
                    ? 'bg-orange-600/30 border-orange-500/50 text-orange-200'
                    : 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-purple-500/50 text-purple-200'
                }`}
              >
                {diff}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Habit cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {habits.map((habit, index) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onComplete={() => handleComplete(habit.id)}
              index={index}
            />
          ))}
        </motion.div>

        {/* Features section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <FeatureCard
            icon="✨"
            title="Smooth Animations"
            description="Framer Motion powered animations for fluid interactions and transitions."
          />
          <FeatureCard
            icon="🎨"
            title="Dark Fantasy Theme"
            description="Beautiful glassmorphism design with gradient backgrounds and glowing effects."
          />
          <FeatureCard
            icon="🔥"
            title="Streak Tracking"
            description="Animated flame icons show your current streak and longest streak achievements."
          />
          <FeatureCard
            icon="⚡"
            title="XP Rewards"
            description="Dynamic XP display with animations shows rewards for habit completion."
          />
          <FeatureCard
            icon="📊"
            title="Progress Indicators"
            description="Colored progress bars with smooth fills track your daily progress."
          />
          <FeatureCard
            icon="🎯"
            title="Difficulty Levels"
            description="Color-coded difficulty badges (Easy, Medium, Hard, Extreme) with unique styling."
          />
        </motion.div>

        {/* Usage example */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 p-6 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-4">📝 Usage</h2>
          <pre className="bg-slate-900/50 p-4 rounded-lg overflow-x-auto text-sm text-slate-300 border border-slate-700">
{`import { HabitCard } from '@/components/HabitCard';

export function HabitsList() {
  const habit = {
    id: 1,
    title: 'Morning Workout',
    description: 'Complete 30 minutes of exercise',
    category: 'Fitness',
    difficulty: 'Hard',
    xpReward: 100,
    streak: 12,
    longestStreak: 15,
    completed: false,
    progress: 6,
    maxProgress: 10,
    daysRemaining: 1,
  };

  return (
    <HabitCard 
      habit={habit}
      onComplete={() => toggleHabit(habit.id)}
      index={0}
    />
  );
}`}</pre>
        </motion.div>

        {/* Features list */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 p-6 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-4">✨ Component Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span>
                Difficulty badges with color coding
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span>
                Animated flame streak indicator
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span>
                XP reward display with animation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span>
                Interactive checkbox completion
              </li>
            </ul>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span>
                Glowing hover effects
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span>
                Progress indicators with smooth fills
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span>
                Category emoji display
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span>
                Fully responsive grid layout
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center text-slate-400 text-sm"
        >
          <p>🎮 QuestHabit - Gamified Habit Tracking • Built with React, Tailwind CSS & Framer Motion</p>
        </motion.div>
      </div>
    </div>
  );
};

function StatCard({ label, value, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-slate-800/40 backdrop-blur-xl rounded-lg p-4 border border-white/10 hover:border-purple-500/30 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-semibold mb-1">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <span className="text-3xl opacity-50">{icon}</span>
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-slate-800/40 backdrop-blur-xl rounded-lg p-4 border border-white/10 hover:border-purple-500/30 transition-colors"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-white font-bold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </motion.div>
  );
}

export default HabitCardShowcase;
