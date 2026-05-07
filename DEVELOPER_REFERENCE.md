# 🎯 QuestHabit Developer Quick Reference

## ⚡ Quick Commands

### Start Everything
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev

# Open browser: http://localhost:5173
```

### Key Folders
```
server/routes/        # API endpoints
server/models/        # Database schemas
server/middleware/    # Auth & validation

client/src/pages/     # Full pages
client/src/components/ # Reusable components
client/src/components/Dashboard/  # Dashboard parts
```

## 🔌 Key Files

### Backend
- `server/server.js` - Main server file
- `server/config/db.js` - MongoDB connection
- `server/models/User.js` - User schema
- `server/models/Habit.js` - Habit schema
- `server/.env` - Configuration

### Frontend
- `client/src/pages/Dashboard.jsx` - Main page
- `client/src/App.jsx` - App wrapper
- `client/tailwind.config.js` - Styling config
- `client/src/index.css` - Global styles

## 🎨 Component Tree

```
App
└─ Dashboard (pages)
   ├─ FloatingParticles
   ├─ Sidebar
   ├─ Header
   └─ Grid Layout (3 columns)
      ├─ Column 1
      │  ├─ HeroCard
      │  └─ StreakWidget
      ├─ Column 2
      │  └─ QuestCard (x4)
      └─ Column 3
         ├─ BadgeShowcase
         └─ QuoteWidget
```

## 🛠️ Common Tasks

### Add a New Component
```bash
# 1. Create file
touch client/src/components/Dashboard/MyComponent.jsx

# 2. Add to Dashboard.jsx
import MyComponent from './components/Dashboard/MyComponent';

# 3. Use in JSX
<MyComponent />
```

### Update Hero Stats
```javascript
// In Dashboard.jsx
setHero({
  ...hero,
  xp: hero.xp + 100,  // Add XP
  level: hero.level + 1,  // Level up
  hp: hero.maxHp,  // Restore HP
});
```

### Add New Quest
```javascript
// In Dashboard.jsx
const newQuest = {
  id: 5,
  title: 'New Quest',
  description: 'Do something awesome',
  difficulty: 'Medium',
  category: 'Health',
  xpReward: 100,
  streak: 0,
  completed: false,
};

setQuests([...quests, newQuest]);
```

### Connect to Backend
```javascript
import axios from 'axios';

// Fetch data
useEffect(() => {
  const fetchData = async () => {
    const res = await axios.get('http://localhost:5000/api/habits');
    setQuests(res.data);
  };
  fetchData();
}, []);

// Post data
const completeQuest = async (questId) => {
  await axios.post(`http://localhost:5000/api/habits/${questId}/track`);
};
```

## 🎨 Tailwind Class Snippets

### Glassmorphism Card
```jsx
<div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 shadow-2xl">
  {/* content */}
</div>
```

### Gradient Text
```jsx
<h1 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
  Text
</h1>
```

### Hover Scale Button
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg"
>
  Click Me
</motion.button>
```

### Grid Layout
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* items */}
</div>
```

## 🔤 Component Props Template

```javascript
// Component usage template
<Component
  prop1={value}
  prop2={value}
  onEvent={() => handleEvent()}
/>

// Props interface pattern
const MyComponent = ({
  prop1 = 'default',
  prop2 = [],
  onEvent = () => {},
}) => {
  return <div>{/* JSX */}</div>;
};
```

## ⚙️ Animation Snippets

### Framer Motion Stagger
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1, duration: 0.3 }}
>
  {/* content */}
</motion.div>
```

### Continuous Rotation
```jsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
>
  🔥
</motion.div>
```

### Hover Scale
```jsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  {/* content */}
</motion.div>
```

## 🌈 Color Reference

| Color | Hex | Tailwind | Use |
|-------|-----|----------|-----|
| Primary Purple | #a855f7 | from-purple-500 | Main UI |
| Pink Accent | #ec4899 | to-pink-500 | Gradients |
| Dark BG | #0f172a | from-slate-950 | Background |
| Card BG | #1e293b | from-slate-800/80 | Cards |
| Fire Orange | #f97316 | from-orange-500 | Streaks |
| Health Red | #ef4444 | from-red-500 | HP bars |
| Success Green | #10b981 | from-green-500 | Complete |
| Award Yellow | #facc15 | from-yellow-500 | Badges |

## 📱 Responsive Breakpoints

```javascript
sm: 640px     // Mobile
md: 768px     // Tablet
lg: 1024px    // Desktop
xl: 1280px    // Large desktop

// Tailwind usage
className="block sm:hidden md:block lg:flex"
```

## 🧠 State Management

### Local State (Component)
```javascript
const [hero, setHero] = useState(initialHero);
```

### Global State (Zustand - ready)
```javascript
// Create store
const useGameStore = create((set) => ({
  hero: {},
  setHero: (hero) => set({ hero }),
}));

// Use in component
const hero = useGameStore((state) => state.hero);
```

## 🐛 Debugging Tips

### Console Logs
```javascript
console.log('Hero:', hero);
console.log('Quests:', quests);
console.log('Error:', error);
```

### React DevTools
- Inspect component state
- Track re-renders
- Validate props

### Browser DevTools
- Network tab: Check API calls
- Console: Look for JS errors
- Elements: Inspect DOM/styles

### Tailwind Issues
- Check class names spelling
- Verify tailwind.config.js
- Rebuild with `npm run dev`

## 📚 Resources

### Official Docs
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Express.js](https://expressjs.com)
- [Mongoose](https://mongoosejs.com)

### Utilities
- [lucide-react Icons](https://lucide.dev)
- [Tailwind Playground](https://play.tailwindcss.com)
- [Coolors Color Picker](https://coolors.co)
- [Responsively App](https://responsively.app)

## 🚀 Performance Checklist

- [ ] Minimize re-renders
- [ ] Use React.memo for static components
- [ ] Lazy load images
- [ ] Optimize bundle size
- [ ] Monitor API performance
- [ ] Cache API responses

## 🔒 Security Checklist

- [ ] Validate user input
- [ ] Sanitize HTML
- [ ] Use HTTPS in production
- [ ] Secure JWT tokens
- [ ] Hash passwords (bcryptjs)
- [ ] Set CORS properly
- [ ] Use environment variables

## 📝 Code Style

### File Naming
- Components: PascalCase (HeroCard.jsx)
- Pages: PascalCase (Dashboard.jsx)
- Utils: camelCase (api.js)
- Constants: UPPER_SNAKE_CASE

### JSX Formatting
```jsx
// Good
<Component
  prop1={value}
  prop2={value}
>
  Child content
</Component>

// Bad - props too cramped
<Component prop1={value} prop2={value}>Child</Component>
```

### Function Naming
```javascript
// Event handlers: handleAction
const handleCompleteQuest = () => {};

// Fetchers: fetchResource
const fetchHero = async () => {};

// Checkers: isCondition
const isCompleted = quest.completed;
```

## 🎓 Next Learning Topics

1. API Integration (axios calls)
2. State Management (Zustand)
3. Routing (React Router)
4. Authentication flows
5. Form handling & validation
6. Error boundaries
7. Performance optimization
8. Testing (Vitest, RTL)

---

**💡 Keep exploring and building! Happy coding!**
