const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken, verifyToken } = require('../middleware/auth');

// Get hero profile
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('hero username');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.hero);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hero profile', error: error.message });
  }
});

// Select hero class
router.post('/select-class', async (req, res) => {
  try {
    const { className } = req.body;
    let savedHero = null;
    
    // Validate class
    const validClasses = ['Warrior', 'Mage', 'Rogue', 'Healer'];
    if (!validClasses.includes(className)) {
      return res.status(400).json({ message: 'Invalid hero class' });
    }

    // If user is authenticated, save to database
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (token) {
      try {
        // Try to authenticate and save to database
        const decoded = verifyToken(token);
        
        const user = await User.findById(decoded.id);
        if (user) {
          user.hero.class = className;
          user.hero.selectedAt = new Date();
          
          // Set default stats based on class
          const classStats = {
            Warrior: { hp: 150, maxHp: 150, attack: 15, defense: 12 },
            Mage: { hp: 80, maxHp: 80, attack: 20, defense: 5 },
            Rogue: { hp: 100, maxHp: 100, attack: 18, defense: 8 },
            Healer: { hp: 110, maxHp: 110, attack: 12, defense: 10 },
          };

          const stats = classStats[className];
          user.hero.hp = stats.hp;
          user.hero.maxHp = stats.maxHp;
          user.hero.attack = stats.attack;
          user.hero.defense = stats.defense;

          await user.save();
          savedHero = user.hero;
        }
      } catch (err) {
        return res.status(403).json({ message: err.message || 'Invalid or expired token' });
      }
    }

    res.json({ 
      message: `Hero class set to ${className}`, 
      class: className,
      hero: savedHero,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error selecting hero class', error: error.message });
  }
});

// Update hero profile
router.put('/', authenticateToken, async (req, res) => {
  try {
    const { name, xp, level } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.hero.name = name;
    if (xp !== undefined) user.hero.xp = xp;
    if (level !== undefined) user.hero.level = level;

    await user.save();
    res.json({ message: 'Hero profile updated', hero: user.hero });
  } catch (error) {
    res.status(500).json({ message: 'Error updating hero profile', error: error.message });
  }
});

// Get hero stats
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('hero');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.hero);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hero stats', error: error.message });
  }
});

// Get hero level and experience
router.get('/xp', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('hero');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      level: user.hero.level,
      xp: user.hero.xp,
      xpNeededForNextLevel: user.hero.xpNeededForNextLevel,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hero XP', error: error.message });
  }
});

module.exports = router;
