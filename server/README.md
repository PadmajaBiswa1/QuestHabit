# QuestHabit - Server

Production-ready Express.js backend for QuestHabit, a gamified habit tracking application.

## 📁 Project Structure

```
server/
├── config/
│   └── db.js              # MongoDB connection configuration
├── routes/
│   ├── auth.js            # Authentication endpoints
│   ├── habits.js          # Habit management endpoints
│   ├── hero.js            # Hero profile endpoints
│   └── leaderboard.js     # Leaderboard endpoints
├── controllers/           # Business logic (to be implemented)
├── models/                # Mongoose schemas (to be implemented)
├── middleware/
│   └── auth.js            # Authentication middleware
├── .env                   # Environment variables (DO NOT COMMIT)
├── .gitignore             # Git ignore rules
├── server.js              # Main server file
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
MONGODB_URI=mongodb+srv://...
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_here
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=debug
```

3. Start the server:
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## 🛣️ API Endpoints

### Auth Routes (`/api/auth`)
- `GET /api/auth/status` - Check auth status
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Habits Routes (`/api/habits`)
- `GET /api/habits` - Get all user habits
- `GET /api/habits/:id` - Get habit by ID
- `POST /api/habits` - Create new habit
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit
- `POST /api/habits/:id/track` - Track habit completion

### Hero Routes (`/api/hero`)
- `GET /api/hero` - Get hero profile
- `PUT /api/hero` - Update hero profile
- `GET /api/hero/stats` - Get hero stats
- `GET /api/hero/xp` - Get hero XP and level

### Leaderboard Routes (`/api/leaderboard`)
- `GET /api/leaderboard` - Get top leaderboard users
- `GET /api/leaderboard/rank/:userId` - Get user rank
- `GET /api/leaderboard/category/:category` - Get leaderboard by category

## 🔧 Technologies

- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **dotenv** - Environment variable management
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Nodemon** - Development auto-reload

## ✅ Health Check

The server includes a health check endpoint:
```
GET /health
```

Returns:
```json
{
  "status": "OK",
  "timestamp": "2026-05-06T10:30:00.000Z"
}
```

## 📝 Next Steps

1. Implement Mongoose schemas in `models/`
2. Implement controllers in `controllers/`
3. Add authentication logic in routes
4. Implement business logic for each endpoint
5. Add validation middleware
6. Set up proper error handling
7. Add unit tests

## 🔒 Security Notes

- Never commit `.env` file to version control
- Use strong JWT_SECRET in production
- Implement rate limiting for production
- Validate and sanitize all user inputs
- Use HTTPS in production
- Set appropriate CORS_ORIGIN for production domain

## 📞 Support

For issues or questions, please refer to the main QuestHabit repository.
