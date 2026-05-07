import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Zap, Flame, Trophy, Settings, LogOut, Wand2, RefreshCcw } from 'lucide-react';
import { useState, useEffect } from 'react';

const Sidebar = ({ activeView, onNavigate, onChangeClass, onLogout, todayXP = 0, streak = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const check = () => setIsLargeScreen(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const menuItems = [
    { icon: Home, label: 'Dashboard', view: 'dashboard' },
    { icon: Flame, label: 'Habits', view: 'habits' },
    { icon: Zap, label: 'Hero Profile', view: 'hero' },
    { icon: Trophy, label: 'Leaderboard', view: 'leaderboard' },
  ];

  const handleNav = (view) => {
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        className="fixed top-4 left-4 z-50 lg:hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isLargeScreen || isOpen ? 0 : -280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-slate-900 to-slate-950 border-r border-purple-500/20 backdrop-blur-xl z-40 flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-purple-500/20 flex-shrink-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-2"
          >
            <Wand2 className="w-8 h-8 text-purple-400" />
          </motion.div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            QuestHabit
          </h1>
          <p className="text-xs text-purple-300 mt-1">Gamified Habit Tracker</p>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = activeView === item.view;
            return (
              <motion.button
                key={index}
                onClick={() => handleNav(item.view)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-purple-300 hover:bg-purple-900/20 hover:text-purple-200'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Stats Widget */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-4 mb-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/20 rounded-lg p-4 flex-shrink-0"
        >
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-2xl font-bold text-purple-400">{todayXP}</p>
              <p className="text-xs text-purple-300">XP Today</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-400">{streak}</p>
              <p className="text-xs text-purple-300">Day Streak</p>
            </div>
          </div>
        </motion.div>

        {/* Secondary Menu */}
        <nav className="border-t border-purple-500/20 p-4 space-y-2 flex-shrink-0">
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNav('settings')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
              activeView === 'settings'
                ? 'text-purple-200 bg-purple-900/30'
                : 'text-purple-300 hover:bg-purple-900/20 hover:text-purple-200'
            }`}
          >
            <Settings size={20} />
            <span className="font-medium text-sm">Settings</span>
          </motion.button>
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.97 }}
            onClick={onChangeClass}
            className="w-full flex items-center gap-3 px-4 py-2 text-cyan-200 hover:bg-cyan-900/20 hover:text-white rounded-lg transition-all duration-300"
          >
            <RefreshCcw size={20} />
            <span className="font-medium text-sm">Change Class</span>
          </motion.button>
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.97 }}
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-all duration-300"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Log Out</span>
          </motion.button>
        </nav>
      </motion.aside>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && !isLargeScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
