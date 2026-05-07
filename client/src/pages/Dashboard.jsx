import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { Zap, Plus, X, Trophy, Settings, RefreshCw, Trash2 } from 'lucide-react';

import FloatingParticles from '../components/Common/FloatingParticles';
import Sidebar from '../components/Dashboard/Sidebar';
import HeroCard from '../components/Dashboard/HeroCard';
import QuestCard from '../components/Dashboard/QuestCard';
import BadgeShowcase from '../components/Dashboard/BadgeShowcase';
import QuoteWidget from '../components/Dashboard/QuoteWidget';
import StreakWidget from '../components/Dashboard/StreakWidget';
import { apiRequest } from '../lib/api';

const normalizeHabit = (habit) => ({
  ...habit,
  id: habit.id || habit._id,
  title: habit.title || habit.name || 'Habit',
  xpReward: Number(habit.xpReward || habit.xpRewardConfig?.base || 50),
  streak: Number(habit.streak || 0),
  completed: Boolean(habit.completed),
});

const buildBadges = (user, habits) => {
  const hero = user?.hero || {};
  const streaks = user?.streaks || {};
  const badges = [];

  if (habits.length > 0) {
    badges.push({ name: 'Habit Builder', icon: '🧱', gradient: 'linear-gradient(to bottom right, #0ea5e9, #22d3ee)' });
  }

  if ((streaks.totalHabitsCompleted || 0) > 0) {
    badges.push({ name: 'First Clear', icon: '✅', gradient: 'linear-gradient(to bottom right, #10b981, #84cc16)' });
  }

  if ((streaks.currentStreak || 0) >= 3) {
    badges.push({ name: 'Spark Streak', icon: '🔥', gradient: 'linear-gradient(to bottom right, #f97316, #ef4444)' });
  }

  if ((hero.level || 1) >= 5) {
    badges.push({ name: 'Level Climber', icon: '🗻', gradient: 'linear-gradient(to bottom right, #a855f7, #ec4899)' });
  }

  return badges;
};

const AddQuestModal = ({ onAdd, onClose }) => {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    difficulty: 'Medium',
    category: 'Health',
    xpReward: 100,
  });

  const difficultyXP = { Easy: 75, Medium: 100, Hard: 150, Extreme: 200 };

  const handleDifficultyChange = (diff) => {
    setForm((current) => ({ ...current, difficulty: diff, xpReward: difficultyXP[diff] }));
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast.error('Habit title is required');
      return;
    }

    setSaving(true);
    try {
      await onAdd(form);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/40 rounded-2xl p-6 w-full max-w-md shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Add Habit</h2>
          <button onClick={onClose} className="text-cyan-200 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-cyan-200 mb-1 block">Habit Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))}
              placeholder="Morning workout"
              className="w-full bg-slate-700/60 border border-cyan-500/30 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </label>

          <label className="block">
            <span className="text-sm text-cyan-200 mb-1 block">Description</span>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))}
              placeholder="What counts as done?"
              className="w-full bg-slate-700/60 border border-cyan-500/30 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </label>

          <div>
            <span className="text-sm text-cyan-200 mb-2 block">Difficulty</span>
            <div className="grid grid-cols-4 gap-2">
              {['Easy', 'Medium', 'Hard', 'Extreme'].map((difficulty) => (
                <button
                  type="button"
                  key={difficulty}
                  onClick={() => handleDifficultyChange(difficulty)}
                  className={`py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    form.difficulty === difficulty
                      ? 'bg-cyan-600 text-white shadow-lg scale-105'
                      : 'bg-slate-700/60 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="text-sm text-cyan-200 mb-2 block">Category</span>
            <select
              value={form.category}
              onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))}
              className="w-full bg-slate-700/60 border border-cyan-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            >
              {['Health', 'Fitness', 'Learning', 'Productivity', 'Finance', 'Social', 'Creativity', 'Mindfulness', 'Other'].map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>

          <div className="flex items-center justify-between bg-slate-700/40 rounded-lg p-3">
            <span className="text-cyan-200 text-sm">XP Reward</span>
            <span className="text-yellow-400 font-bold">+{form.xpReward} XP</span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-cyan-500/30 text-cyan-200 hover:text-white hover:bg-cyan-900/30 transition-all duration-200 font-semibold"
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: saving ? 1 : 1.02 }}
            whileTap={{ scale: saving ? 1 : 0.98 }}
            disabled={saving}
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all duration-200 disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Habit'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const HabitsView = ({ habits, loading, onComplete, onAdd, onDelete, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const completed = habits.filter((habit) => habit.completed).length;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">My Habits</h2>
          <p className="text-cyan-200">{completed}/{habits.length} completed today</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onRefresh}
            className="p-2.5 rounded-xl border border-cyan-500/30 text-cyan-200 hover:text-white hover:bg-cyan-900/30"
            aria-label="Refresh habits"
          >
            <RefreshCw size={18} />
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            <Plus size={18} /> Add
          </motion.button>
        </div>
      </div>

      <div className="w-full bg-slate-800/60 rounded-full h-2 mb-8">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${habits.length ? (completed / habits.length) * 100 : 0}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
        />
      </div>

      {loading ? (
        <div className="text-center py-16 text-cyan-200">Loading habits...</div>
      ) : (
        <div className="space-y-4">
          {habits.map((habit, index) => (
            <div key={habit.id} className="relative group">
              <QuestCard quest={habit} onComplete={() => onComplete(habit.id)} index={index} />
              <button
                onClick={() => onDelete(habit.id)}
                className="absolute top-3 right-3 p-2 rounded-lg bg-red-950/70 border border-red-500/30 text-red-300 opacity-0 group-hover:opacity-100 transition"
                aria-label="Delete habit"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
          {habits.length === 0 && (
            <div className="text-center py-16 text-cyan-200 border border-cyan-500/20 rounded-2xl bg-slate-900/50">
              <p className="text-4xl mb-3">🌱</p>
              <p className="text-lg font-semibold">No habits saved yet</p>
              <p className="text-sm">Add one habit and your dashboard starts tracking real progress.</p>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {showModal && <AddQuestModal onAdd={onAdd} onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  );
};

const HeroProfileView = ({ hero, onEditProfile, onChangeClass }) => (
  <div className="p-4 md:p-8 max-w-2xl mx-auto">
    <h2 className="text-3xl font-bold text-white mb-6">Hero Profile</h2>
    <HeroCard hero={hero} onEditProfile={onEditProfile} />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-cyan-500/30 rounded-2xl p-6"
    >
      <h3 className="text-lg font-bold text-white mb-4">Class Loadout</h3>
      <p className="text-cyan-200 text-sm mb-4">
        Your current class is <span className="font-semibold text-white">{hero.class}</span>. New class selections are saved to your account.
      </p>
      <button
        onClick={onChangeClass}
        className="w-full py-3 rounded-xl border border-cyan-500/40 text-cyan-200 hover:bg-cyan-900/20 hover:text-white font-semibold transition-all duration-200"
      >
        Choose Different Class
      </button>
    </motion.div>
  </div>
);

const LeaderboardView = ({ entries, loading, currentUserId }) => {
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-8 h-8 text-yellow-400" />
        <h2 className="text-3xl font-bold text-white">Leaderboard</h2>
      </div>
      {loading ? (
        <div className="text-center py-16 text-cyan-200">Loading leaderboard...</div>
      ) : entries.length === 0 ? (
        <div className="text-center py-16 text-cyan-200 border border-cyan-500/20 rounded-2xl bg-slate-900/50">
          <p className="text-4xl mb-3">🏁</p>
          <p className="text-lg font-semibold">No ranked heroes yet</p>
          <p className="text-sm">Complete a habit to claim the board.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry, index) => {
            const isUser = entry.id === currentUserId;
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  isUser
                    ? 'bg-cyan-900/40 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-800/60 border-cyan-500/20'
                }`}
              >
                <span className="text-2xl w-9 text-center">{medals[index] || `#${entry.rank}`}</span>
                <div className="flex-1">
                  <p className={`font-bold ${isUser ? 'text-cyan-200' : 'text-white'}`}>
                    {entry.username} {isUser && <span className="text-xs">(You)</span>}
                  </p>
                  <p className="text-xs text-cyan-300">{entry.hero?.class || 'Unclassed'} • Level {entry.hero?.level || 1}</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 font-bold">{Number(entry.hero?.xp || 0).toLocaleString()} XP</p>
                  <p className="text-xs text-orange-300">🔥 {entry.currentStreak || 0} days</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const SettingsView = ({ hero, onUpdateHero, onChangeClass, onLogout }) => {
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(hero.name || 'Hero');

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Hero name cannot be empty');
      return;
    }

    setSaving(true);
    try {
      await onUpdateHero({ name: name.trim() });
      toast.success('Hero profile saved ✨');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-8 h-8 text-cyan-300" />
        <h2 className="text-3xl font-bold text-white">Settings</h2>
      </div>
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-cyan-500/30 rounded-2xl p-6 space-y-5">
        <label className="block">
          <span className="text-sm text-cyan-200 mb-1 block">Hero Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-700/60 border border-cyan-500/30 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </label>
        <div>
          <span className="text-sm text-cyan-200 mb-1 block">Hero Class</span>
          <div className="bg-slate-700/40 rounded-lg px-4 py-2.5 text-cyan-100 font-semibold">{hero.class}</div>
        </div>
        <motion.button
          whileHover={{ scale: saving ? 1 : 1.02 }}
          whileTap={{ scale: saving ? 1 : 0.98 }}
          disabled={saving}
          onClick={handleSave}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 text-white font-semibold shadow-lg transition-all disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </motion.button>
        <button
          onClick={onChangeClass}
          className="w-full py-3 rounded-xl border border-cyan-500/40 text-cyan-200 hover:bg-cyan-900/20 font-semibold transition-all duration-200"
        >
          Choose New Class
        </button>
        <button
          onClick={onLogout}
          className="w-full py-3 rounded-xl border border-red-500/40 text-red-300 hover:bg-red-900/20 font-semibold transition-all duration-200"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

const Dashboard = ({ token, user, onUserChange, onChangeClass, onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [showAddQuest, setShowAddQuest] = useState(false);
  const [habits, setHabits] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentRank, setCurrentRank] = useState(null);
  const [loadingHabits, setLoadingHabits] = useState(true);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  const hero = user?.hero || {};
  const streaks = user?.streaks || {};
  const completedToday = habits.filter((habit) => habit.completed).length;
  const todayXP = habits.filter((habit) => habit.completed).reduce((sum, habit) => sum + Number(habit.xpReward || 0), 0);
  const completionRate = habits.length ? Math.round((completedToday / habits.length) * 100) : 0;
  const badges = useMemo(() => buildBadges(user, habits), [user, habits]);

  const loadHabits = useCallback(async () => {
    setLoadingHabits(true);
    try {
      const data = await apiRequest('/api/habits', { token });
      setHabits((data.habits || []).map(normalizeHabit));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingHabits(false);
    }
  }, [token]);

  const loadLeaderboard = useCallback(async () => {
    setLoadingLeaderboard(true);
    try {
      const data = await apiRequest('/api/leaderboard?limit=10', { token: null });
      const entries = data.entries || [];
      setLeaderboard(entries);

      const self = entries.find((entry) => entry.id === user.id);
      if (self) {
        setCurrentRank(self.rank);
      } else {
        try {
          const rank = await apiRequest(`/api/leaderboard/rank/${user.id}`, { token: null });
          setCurrentRank(rank.rank);
        } catch {
          setCurrentRank(null);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingLeaderboard(false);
    }
  }, [user.id]);

  useEffect(() => {
    loadHabits();
    loadLeaderboard();
  }, [loadHabits, loadLeaderboard]);

  const updateUserHero = (heroUpdate) => {
    onUserChange((current) => ({
      ...current,
      hero: {
        ...current.hero,
        ...heroUpdate,
      },
    }));
  };

  const handleCompleteQuest = async (habitId) => {
    const habit = habits.find((item) => item.id === habitId);
    if (!habit || habit.completed) return;

    try {
      const data = await apiRequest(`/api/habits/${habitId}/track`, {
        method: 'POST',
        token,
      });

      setHabits((current) => current.map((item) => (
        item.id === habitId ? normalizeHabit(data.habit) : item
      )));

      if (data.hero) {
        onUserChange((current) => ({
          ...current,
          hero: {
            ...current.hero,
            ...data.hero,
          },
          ...(data.streaks && { streaks: data.streaks }),
          ...(data.statistics && { statistics: data.statistics }),
        }));
      }

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      toast.success(`Habit complete! +${data.xpReward} XP`, { duration: 3000, icon: '⚡' });
      loadLeaderboard();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddQuest = async (habit) => {
    try {
      const data = await apiRequest('/api/habits', {
        method: 'POST',
        token,
        body: habit,
      });
      setHabits((current) => [normalizeHabit(data.habit), ...current]);
      onUserChange((current) => ({
        ...current,
        statistics: {
          ...current.statistics,
          totalHabits: (current.statistics?.totalHabits || 0) + 1,
        },
      }));
      toast.success('Habit saved 🌿');
      loadLeaderboard();
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const handleDeleteHabit = async (habitId) => {
    try {
      await apiRequest(`/api/habits/${habitId}`, { method: 'DELETE', token });
      setHabits((current) => current.filter((habit) => habit.id !== habitId));
      toast.success('Habit removed');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateHero = async ({ name }) => {
    const data = await apiRequest('/api/hero', {
      method: 'PUT',
      token,
      body: { name },
    });
    updateUserHero(data.hero);
  };

  const renderView = () => {
    switch (activeView) {
      case 'habits':
        return (
          <HabitsView
            habits={habits}
            loading={loadingHabits}
            onComplete={handleCompleteQuest}
            onAdd={handleAddQuest}
            onDelete={handleDeleteHabit}
            onRefresh={loadHabits}
          />
        );
      case 'hero':
        return <HeroProfileView hero={hero} onEditProfile={() => setActiveView('settings')} onChangeClass={onChangeClass} />;
      case 'leaderboard':
        return <LeaderboardView entries={leaderboard} loading={loadingLeaderboard} currentUserId={user.id} />;
      case 'settings':
        return <SettingsView hero={hero} onUpdateHero={handleUpdateHero} onChangeClass={onChangeClass} onLogout={onLogout} />;
      default:
        return (
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <header className="mb-8">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent mb-1">
                  Welcome back, {hero.name || user.username}!
                </h1>
                <p className="text-cyan-200">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </motion.div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1 space-y-6">
                <HeroCard hero={hero} onEditProfile={() => setActiveView('settings')} />
                <StreakWidget streak={streaks.currentStreak || 0} longestStreak={streaks.longestStreak || 0} />
              </div>

              <div className="lg:col-span-1">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-6 h-6 text-yellow-400" />
                      <h2 className="text-2xl font-bold text-white">Today</h2>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAddQuest(true)}
                      className="flex items-center gap-1.5 bg-cyan-600/40 hover:bg-cyan-600 border border-cyan-500/40 text-cyan-100 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                    >
                      <Plus size={15} /> Add
                    </motion.button>
                  </div>
                  <div className="space-y-3">
                    {loadingHabits ? (
                      <div className="text-cyan-200 py-12 text-center">Loading habits...</div>
                    ) : habits.length === 0 ? (
                      <div className="text-center py-12 text-cyan-200 border border-cyan-500/20 rounded-2xl bg-slate-900/50">
                        <div className="text-4xl mb-2">🌱</div>
                        <p className="font-semibold">Start with one habit</p>
                      </div>
                    ) : (
                      habits.slice(0, 4).map((habit, index) => (
                        <QuestCard key={habit.id} quest={habit} onComplete={() => handleCompleteQuest(habit.id)} index={index} />
                      ))
                    )}
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <BadgeShowcase badges={badges} />
                <QuoteWidget />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { label: 'Level XP', value: `${hero.xp || 0}/${hero.xpNeededForNextLevel || 1000}`, color: 'text-cyan-300' },
                { label: 'Today Done', value: `${completedToday}/${habits.length}`, color: 'text-emerald-300' },
                { label: 'Rank', value: currentRank ? `#${currentRank}` : 'Unranked', color: 'text-yellow-300' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-6 shadow-lg text-center cursor-default"
                >
                  <p className="text-cyan-200 text-sm font-semibold mb-2">{stat.label}</p>
                  <motion.p initial={{ scale: 0.5 }} animate={{ scale: 1 }} className={`text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-6 text-sm text-cyan-200">
              Completion rate today: <span className="font-bold text-white">{completionRate}%</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      <FloatingParticles />

      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        onChangeClass={onChangeClass}
        onLogout={onLogout}
        todayXP={todayXP}
        streak={streaks.currentStreak || 0}
      />

      <main className="lg:ml-64 relative z-10 min-h-screen">
        <div className="pt-16 lg:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {showAddQuest && (
          <AddQuestModal onAdd={handleAddQuest} onClose={() => setShowAddQuest(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
