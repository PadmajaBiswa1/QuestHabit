/**
 * QuestHabit Dashboard Component Documentation
 * 
 * This file provides examples and documentation for all dashboard components.
 * Used for development, testing, and reference.
 */

// ============================================================================
// COMPONENT: FloatingParticles
// ============================================================================
// Location: src/components/Common/FloatingParticles.jsx
// Purpose: Animated background with floating particles
// 
// Props: None
// 
// Usage:
// <FloatingParticles />
// 
// Features:
// - Canvas-based particle animation
// - Purple neon particles
// - Responsive to window resize
// - Smooth continuous animation
// - ~50 particles for performance

// ============================================================================
// COMPONENT: ProgressBar
// ============================================================================
// Location: src/components/Common/ProgressBar.jsx
// Purpose: Animated progress bar with labels and percentage display
//
// Props:
// - current (Number): Current value
// - max (Number): Maximum value
// - label (String): Display label
// - color (String): 'purple' | 'red' | 'blue' | 'green'
// - showPercent (Boolean): Show current/max display (default: true)
//
// Usage Examples:
// <ProgressBar 
//   current={250} 
//   max={1000} 
//   label="Experience Points" 
//   color="purple"
// />
//
// <ProgressBar 
//   current={85} 
//   max={100} 
//   label="Health Points" 
//   color="red"
// />
//
// Features:
// - Animated fill on mount/change
// - Color-coded gradients
// - Glowing shadow effects
// - Smooth easing

// ============================================================================
// COMPONENT: HeroCard
// ============================================================================
// Location: src/components/Dashboard/HeroCard.jsx
// Purpose: Display hero profile with stats
//
// Props:
// - hero (Object): {
//     name (String): Hero name
//     level (Number): Current level
//     xp (Number): Current XP
//     xpNeededForNextLevel (Number): XP for next level
//     hp (Number): Current health points
//     maxHp (Number): Maximum health points
//     attack (Number): Attack stat
//     defense (Number): Defense stat
//     class (String): 'Warrior' | 'Mage' | 'Rogue' | 'Paladin' | 'Ranger'
//   }
//
// Usage:
// <HeroCard hero={{
//   name: 'Arthas',
//   level: 5,
//   xp: 450,
//   xpNeededForNextLevel: 1000,
//   hp: 85,
//   maxHp: 100,
//   attack: 15,
//   defense: 8,
//   class: 'Warrior'
// }} />
//
// Features:
// - Animated level crown icon
// - XP progress bar
// - Health bar with red gradient
// - Attack/Defense stat boxes
// - Glassmorphism card design
// - Edit profile button

// ============================================================================
// COMPONENT: QuestCard
// ============================================================================
// Location: src/components/Dashboard/QuestCard.jsx
// Purpose: Display individual quest/habit card
//
// Props:
// - quest (Object): {
//     title (String): Quest title
//     description (String): Quest description
//     difficulty (String): 'Easy' | 'Medium' | 'Hard' | 'Extreme'
//     category (String): Category emoji and type
//     xpReward (Number): XP reward for completion
//     streak (Number): Current streak count
//     completed (Boolean): Completion status
//   }
// - onComplete (Function): Callback when quest completed
// - index (Number): Used for animation stagger
//
// Usage:
// <QuestCard
//   quest={{
//     title: '30 Min Run',
//     description: 'Complete a 30-minute running session',
//     difficulty: 'Hard',
//     category: 'Fitness',
//     xpReward: 150,
//     streak: 3,
//     completed: false
//   }}
//   onComplete={() => handleComplete()}
//   index={0}
// />
//
// Features:
// - Difficulty color coding
// - Category emojis
// - Staggered fade-in animation
// - Hover scale effect
// - Animated completion state
// - XP and streak display
// - One-click completion

// ============================================================================
// COMPONENT: BadgeShowcase
// ============================================================================
// Location: src/components/Dashboard/BadgeShowcase.jsx
// Purpose: Display earned badges and achievements
//
// Props:
// - badges (Array): Optional array of badge objects
//   Badge object: {
//     name (String): Badge name
//     icon (String): Emoji
//     color (String): Tailwind gradient class
//   }
//
// Usage:
// <BadgeShowcase badges={[
//   { 
//     name: 'First Quest', 
//     icon: '🎯', 
//     color: 'from-blue-500 to-cyan-500' 
//   },
//   // ...
// ]} />
//
// // Default badges used if none provided
// <BadgeShowcase />
//
// Features:
// - Grid layout (2 cols mobile, 4 cols desktop)
// - Hover scale and rotate effects
// - Badge tooltips on hover
// - Default badges included
// - View all achievements button

// ============================================================================
// COMPONENT: QuoteWidget
// ============================================================================
// Location: src/components/Dashboard/QuoteWidget.jsx
// Purpose: Display daily motivational quote
//
// Props: None
//
// Usage:
// <QuoteWidget />
//
// Features:
// - Random quote selection
// - Animated lightbulb icon
// - Decorative background elements
// - Beautiful gradient background
// - New quote button
// - Smooth fade-in animations

// ============================================================================
// COMPONENT: StreakWidget
// ============================================================================
// Location: src/components/Dashboard/StreakWidget.jsx
// Purpose: Display current and longest streak
//
// Props:
// - streak (Number): Current streak count
// - longestStreak (Number): Longest streak achieved
//
// Usage:
// <StreakWidget 
//   streak={7} 
//   longestStreak={14} 
// />
//
// Features:
// - Two-card layout
// - Animated number updates
// - Floating fire emoji animation
// - Rotating star emoji
// - Orange/purple gradients
// - Personal best tracking

// ============================================================================
// COMPONENT: Sidebar
// ============================================================================
// Location: src/components/Dashboard/Sidebar.jsx
// Purpose: Navigation sidebar with menu items
//
// Props: None (Uses internal state for mobile menu)
//
// Usage:
// <Sidebar />
//
// Features:
// - Fixed width (w-64)
// - Mobile collapsible menu
// - Main navigation items
// - Secondary menu (Settings, Logout)
// - Stats widget with daily XP and streak
// - Smooth animations
// - Active state highlighting
// - Mobile overlay

// ============================================================================
// PAGE: Dashboard
// ============================================================================
// Location: src/pages/Dashboard.jsx
// Purpose: Main dashboard page combining all components
//
// Features:
// - Responsive grid layout (1/2/3 columns)
// - Header with greeting and current date
// - Hero profile in left column
// - Daily quests in middle column
// - Badges and quote in right column
// - Bottom stats row (Total XP, Habits Completed, Rank)
// - Confetti effects on quest completion
// - Toast notifications with XP rewards
// - Floating particles background
// - Sidebar navigation

// ============================================================================
// STATE MANAGEMENT EXAMPLE
// ============================================================================
// 
// The Dashboard component manages state for:
// - quests: Array of quest objects
// - hero: Hero profile object
// 
// Example state update on quest completion:
// 
// const handleCompleteQuest = (questId) => {
//   setQuests(quests.map(q => 
//     q.id === questId ? { ...q, completed: true } : q
//   ));
//   
//   const quest = quests.find(q => q.id === questId);
//   confetti({ particleCount: 100, spread: 70 });
//   toast.success(`Quest Complete! +${quest.xpReward} XP`);
//   
//   const newXP = hero.xp + quest.xpReward;
//   setHero({ ...hero, xp: newXP });
// };

// ============================================================================
// API INTEGRATION EXAMPLES
// ============================================================================
//
// To integrate with backend API, add these functions to Dashboard:
//
// // Fetch hero profile
// useEffect(() => {
//   const fetchHero = async () => {
//     const response = await axios.get('/api/hero');
//     setHero(response.data);
//   };
//   fetchHero();
// }, []);
//
// // Fetch daily quests
// useEffect(() => {
//   const fetchQuests = async () => {
//     const response = await axios.get('/api/habits?frequency=daily');
//     setQuests(response.data);
//   };
//   fetchQuests();
// }, []);
//
// // Complete quest
// const handleCompleteQuest = async (questId) => {
//   try {
//     const response = await axios.post(`/api/habits/${questId}/track`);
//     setHero(response.data.hero);
//     // ... rest of completion logic
//   } catch (error) {
//     toast.error('Failed to complete quest');
//   }
// };

// ============================================================================
// STYLING NOTES
// ============================================================================
//
// Color Palette:
// - Primary Purple: #a855f7 (from-purple-500 to-pink-500)
// - Background: #0f172a (slate-950)
// - Dark Card: from-slate-800/80 to-slate-900/80
// - Borders: border-purple-500/30
// - Text: text-white, text-purple-300, text-purple-200
//
// Effects:
// - Glassmorphism: backdrop-blur-xl with semi-transparent bg
// - Shadows: shadow-2xl with glow effects
// - Borders: Thin purple with reduced opacity
// - Gradients: Diagonal from-/to- color combinations
//
// Animations:
// - Stagger animations on component mount
// - Hover scale transforms
// - Smooth transitions on all interactive elements
// - Floating and rotating animations for decorative elements

// ============================================================================
// RESPONSIVENESS
// ============================================================================
//
// Breakpoints (Tailwind):
// - sm: 640px
// - md: 768px
// - lg: 1024px
// - xl: 1280px
//
// Layout changes:
// - Mobile: Single column, full width, sidebar hidden
// - Tablet: 1-2 columns, sidebar shown
// - Desktop: 3 column layout, fixed sidebar
//
// Mobile menu:
// - Hidden menu toggle in top-left
// - Fixed overlay when open
// - Smooth slide-in animation

// ============================================================================
// PERFORMANCE NOTES
// ============================================================================
//
// - Use React.memo() for components that don't need frequent updates
// - Framer Motion animations are GPU-accelerated
// - Canvas particles use requestAnimationFrame for smooth 60fps
// - Lazy load images and heavy components if needed
// - Consider virtualization for large quest lists

// ============================================================================
// ACCESSIBILITY
// ============================================================================
//
// - Focus visible states on interactive elements
// - Semantic HTML with proper heading hierarchy
// - Color-coded difficulty levels supplemented with text
// - Touch-friendly button sizes (min 44x44px)
// - Keyboard navigation support
// - Alt text for emojis where appropriate
// - ARIA labels for icon buttons

export const COMPONENT_EXAMPLES = {
  heroCard: {
    name: 'Arthas',
    level: 5,
    xp: 450,
    xpNeededForNextLevel: 1000,
    hp: 85,
    maxHp: 100,
    attack: 15,
    defense: 8,
    class: 'Warrior',
  },
  
  quests: [
    {
      id: 1,
      title: '30 Min Run',
      description: 'Complete a 30-minute running session',
      difficulty: 'Hard',
      category: 'Fitness',
      xpReward: 150,
      streak: 3,
      completed: false,
    },
    {
      id: 2,
      title: 'Read 20 Pages',
      description: 'Read 20 pages of your current book',
      difficulty: 'Easy',
      category: 'Learning',
      xpReward: 75,
      streak: 7,
      completed: false,
    },
  ],
  
  badges: [
    { name: 'First Quest', icon: '🎯', color: 'from-blue-500 to-cyan-500' },
    { name: '7 Day Streak', icon: '🔥', color: 'from-orange-500 to-red-500' },
    { name: 'Level 5', icon: '⭐', color: 'from-yellow-500 to-orange-500' },
    { name: 'Scholar', icon: '📚', color: 'from-purple-500 to-pink-500' },
  ],
};
