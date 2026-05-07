import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Compass } from 'lucide-react';
import AuthPage from './pages/AuthPage';
import HeroClassSelection from './pages/HeroClassSelection';
import Dashboard from './pages/Dashboard';
import { apiRequest, getStoredToken, setStoredToken } from './lib/api';

function App() {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(null);
  const [loadingSession, setLoadingSession] = useState(Boolean(token));
  const [selectingClass, setSelectingClass] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadSession = async () => {
      if (!token) {
        setLoadingSession(false);
        setUser(null);
        return;
      }

      try {
        const data = await apiRequest('/api/auth/status', { token });
        if (cancelled) return;

        if (data.authenticated) {
          setUser(data.user);
          setSelectingClass(!data.user?.hero?.class);
        } else {
          setStoredToken(null);
          setToken(null);
          setUser(null);
        }
      } catch {
        if (cancelled) return;
        setStoredToken(null);
        setToken(null);
        setUser(null);
      } finally {
        if (!cancelled) setLoadingSession(false);
      }
    };

    loadSession();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleAuthSuccess = ({ token: nextToken, user: nextUser }) => {
    setStoredToken(nextToken);
    setToken(nextToken);
    setUser(nextUser);
    setSelectingClass(!nextUser?.hero?.class);
  };

  const handleClassSelection = ({ className, hero }) => {
    setUser((current) => ({
      ...current,
      hero: hero || {
        ...current?.hero,
        class: className,
      },
    }));
    setSelectingClass(false);
  };

  const handleLogout = async () => {
    try {
      if (token) {
        await apiRequest('/api/auth/logout', { method: 'POST', token });
      }
    } catch {
      // Local logout should still complete if the server is unavailable.
    }

    setStoredToken(null);
    localStorage.removeItem('selectedClass');
    setToken(null);
    setUser(null);
    setSelectingClass(false);
  };

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-200">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-500/10 shadow-lg shadow-cyan-500/10">
            <Compass className="h-9 w-9 text-cyan-300 animate-pulse" strokeWidth={2.2} />
          </div>
          <p className="text-lg font-semibold">Loading your quest log...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!user ? (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      ) : selectingClass || !user.hero?.class ? (
        <HeroClassSelection token={token} onSelectClass={handleClassSelection} />
      ) : (
        <Dashboard
          token={token}
          user={user}
          onUserChange={setUser}
          onChangeClass={() => setSelectingClass(true)}
          onLogout={handleLogout}
        />
      )}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            borderRadius: '0.5rem',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)',
          },
        }}
      />
    </>
  );
}

export default App;
