# QuestHabit - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- Git (optional)

## 📦 Installation

### 1. Backend Setup (Server)

```bash
# Navigate to server directory
cd server

# Install dependencies (already done)
npm install

# Verify .env file exists with MongoDB connection
cat .env
```

**Expected .env content:**
```
MONGODB_URI=mongodb+srv://biswalpadmaja411_db_user:ifl52j8j3b88ZROD@cluster0.c35rj5v.mongodb.net/?appName=Cluster0
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here_change_this
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=debug
```

### 2. Frontend Setup (Client)

```bash
# Navigate to client directory
cd ../client

# Install dependencies (already done)
npm install

# Verify Tailwind config exists
ls tailwind.config.js postcss.config.js
```

## ▶️ Running the Application

### Start Backend Server

```bash
# From server directory
cd server

# Development mode (with auto-reload)
npm run dev

# Expected output:
# 🚀 QuestHabit server running on port 5000
# 📝 Environment: development
# ✅ MongoDB connected successfully
```

### Start Frontend Development Server

```bash
# From client directory (new terminal)
cd client

# Start Vite dev server
npm run dev

# Expected output:
# ➜  Local:   http://localhost:5173/
# ➜  press h to show help
```

### Access the Dashboard

Open your browser and navigate to:
```
http://localhost:5173
```

You should see the stunning QuestHabit dashboard with:
- Hero profile card
- Daily quests
- Badge showcase
- Motivational quote
- Sidebar navigation
- Animated backgrounds

## 🧪 Testing the Dashboard

### Test Quest Completion
1. Click "Complete Quest" button on any quest
2. Watch for:
   - ✨ Confetti animation
   - 🔔 Toast notification with XP reward
   - ✅ Quest card marked as completed
   - 📊 Hero XP updates

### Test Interactions
- Hover over cards to see scale animations
- Click sidebar items to test navigation
- Open/close mobile menu on small screens
- Click "New Quote" for different motivational quotes
- Inspect badges on hover for tooltips

## 📝 Development Workflow

### Making Changes

#### Backend Changes
1. Edit files in `server/routes/`, `server/models/`, etc.
2. Nodemon auto-reloads on save
3. Check terminal for errors

#### Frontend Changes
1. Edit files in `client/src/`
2. Vite auto-refreshes in browser
3. Check terminal for build errors

### Connecting to API

Update components to connect to backend:

```javascript
// client/src/pages/Dashboard.jsx

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

useEffect(() => {
  const fetchHero = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hero`);
      setHero(response.data);
    } catch (error) {
      console.error('Failed to fetch hero:', error);
    }
  };
  
  fetchHero();
}, []);
```

## 🔧 Troubleshooting

### Issue: "MongoDB connection failed"
**Solution:** Check MONGODB_URI in .env file is correct

```bash
# Server terminal
npm run dev  # Should show ✅ MongoDB connected

# If not, verify:
echo $MONGODB_URI  # Print to check value
```

### Issue: Port 5000 already in use
**Solution:** Change PORT in .env or kill process using port

```bash
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Issue: Vite port 5173 in use
**Solution:** Vite will use next available port automatically (5174, 5175, etc.)

### Issue: "Cannot find module" error
**Solution:** Reinstall dependencies

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Tailwind CSS not working
**Verify:**
1. `tailwind.config.js` exists
2. `postcss.config.js` exists
3. `@tailwind` directives in `src/index.css`

```bash
# Rebuild
npm run dev
```

## 📊 Dashboard Features

### Hero System
- **Level Progression** - Current level with XP progress bar
- **HP Tracking** - Health status with color-coded bar
- **Combat Stats** - Attack and Defense attributes
- **Hero Class** - Warrior, Mage, Rogue, Paladin, or Ranger

### Daily Quests
- **Difficulty Levels** - Easy, Medium, Hard, Extreme
- **Categories** - Health, Fitness, Learning, Productivity, Finance, Social, Creativity, Mindfulness
- **XP Rewards** - Base XP + streak bonus
- **One-Click Completion** - Mark habits done instantly

### Gamification
- **Streaks** - Current streak with longest streak tracking
- **Badges** - Earned achievements with descriptions
- **Leaderboard** - Rank tracking (prepared)
- **Motivational Quotes** - Daily inspiration

### Visual Effects
- **Floating Particles** - Animated background
- **Confetti** - Celebration effects on completion
- **Smooth Animations** - Framer Motion transitions
- **Glassmorphism** - Modern card design
- **Dark RPG Theme** - Purple neon aesthetic

## 🚀 Building for Production

### Frontend Build

```bash
# From client directory
npm run build

# Output will be in client/dist/
# Preview production build
npm run preview
```

### Backend Deployment

1. Update `.env` for production:
```
NODE_ENV=production
MONGODB_URI=<production-url>
JWT_SECRET=<secure-random-string>
CORS_ORIGIN=<your-domain.com>
```

2. Deploy to hosting service:
   - Heroku
   - Railway
   - Vercel
   - AWS
   - DigitalOcean

## 📚 Project Structure

```
questhabit/
├── server/
│   ├── config/db.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── habits.js
│   │   ├── hero.js
│   │   └── leaderboard.js
│   ├── models/
│   │   ├── User.js
│   │   └── Habit.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── Common/
    │   │   │   ├── FloatingParticles.jsx
    │   │   │   └── ProgressBar.jsx
    │   │   └── Dashboard/
    │   │       ├── HeroCard.jsx
    │   │       ├── QuestCard.jsx
    │   │       ├── BadgeShowcase.jsx
    │   │       ├── QuoteWidget.jsx
    │   │       ├── StreakWidget.jsx
    │   │       └── Sidebar.jsx
    │   ├── pages/
    │   │   └── Dashboard.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    ├── package.json
    ├── DASHBOARD_README.md
    └── README.md
```

## 🎯 Next Development Tasks

1. **API Integration**
   - Connect components to backend endpoints
   - Implement real data fetching
   - Add error handling

2. **Authentication**
   - Implement login/register flow
   - JWT token management
   - Protected routes

3. **Additional Pages**
   - Habits management page
   - Leaderboard display
   - User settings
   - Profile editor

4. **Enhanced Features**
   - Sound effects
   - Social features
   - Mobile app
   - Push notifications
   - Data persistence

## 💡 Tips & Best Practices

### Performance
- Use React.memo for unchanged components
- Lazy load heavy components
- Optimize images
- Monitor bundle size

### Code Quality
- Follow component naming conventions
- Keep components focused and reusable
- Add JSDoc comments
- Write meaningful git commits

### Debugging
- Use React DevTools browser extension
- Check browser console for errors
- Use Tailwind IntelliSense VS Code extension
- Monitor network requests in DevTools

## 📞 Support

For issues or questions:
1. Check DASHBOARD_README.md for feature details
2. Review COMPONENT_DOCS.js for component usage
3. Check server/README.md for API details
4. Review error messages in browser/terminal console

---

**Ready to build amazing habits with QuestHabit! 🚀🎮**
