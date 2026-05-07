import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Compass, LogIn, UserPlus, Mail, Lock, User } from 'lucide-react';
import { apiRequest } from '../lib/api';

const AuthPage = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const isRegister = mode === 'register';

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password.trim() || (isRegister && !form.username.trim())) {
      toast.error('Fill in the required fields');
      return;
    }

    setLoading(true);
    try {
      const data = await apiRequest(`/api/auth/${isRegister ? 'register' : 'login'}`, {
        method: 'POST',
        token: null,
        body: {
          email: form.email,
          password: form.password,
          ...(isRegister && { username: form.username }),
        },
      });

      toast.success(isRegister ? 'Account created. Choose your class!' : 'Welcome back!');
      onAuthSuccess(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl"
      >
        <div className="text-center mb-8">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-500/10 shadow-lg shadow-cyan-500/10">
            <Compass className="h-9 w-9 text-cyan-300" strokeWidth={2.2} />
          </div>
          <h1 className="text-3xl font-black text-white">QuestHabit</h1>
          <p className="text-cyan-200 text-sm mt-2">Build habits, earn XP, and keep your progress saved.</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6 bg-slate-800/70 rounded-xl p-1">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex items-center justify-center gap-2 rounded-lg py-2 font-semibold transition ${
              !isRegister ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <LogIn size={16} /> Login
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex items-center justify-center gap-2 rounded-lg py-2 font-semibold transition ${
              isRegister ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <UserPlus size={16} /> Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <label className="block">
              <span className="text-sm text-cyan-200 mb-1 block">Username</span>
              <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-lg px-3">
                <User size={18} className="text-cyan-300" />
                <input
                  value={form.username}
                  onChange={(e) => setForm((current) => ({ ...current, username: e.target.value }))}
                  className="w-full bg-transparent py-3 text-white outline-none placeholder:text-slate-500"
                  placeholder="padmaja"
                />
              </div>
            </label>
          )}

          <label className="block">
            <span className="text-sm text-cyan-200 mb-1 block">Email</span>
            <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-lg px-3">
              <Mail size={18} className="text-cyan-300" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
                className="w-full bg-transparent py-3 text-white outline-none placeholder:text-slate-500"
                placeholder="you@example.com"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm text-cyan-200 mb-1 block">Password</span>
            <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-lg px-3">
              <Lock size={18} className="text-cyan-300" />
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm((current) => ({ ...current, password: e.target.value }))}
                className="w-full bg-transparent py-3 text-white outline-none placeholder:text-slate-500"
                placeholder="6+ characters"
              />
            </div>
          </label>

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 py-3 font-bold text-white shadow-lg disabled:opacity-60"
          >
            {loading ? 'Working...' : isRegister ? 'Create Account' : 'Enter Dashboard'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthPage;
