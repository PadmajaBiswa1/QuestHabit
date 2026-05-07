# Codex Guide For QuestHabit

This file is the working guide for Codex or any AI coding assistant editing this project. Read it before making changes, then inspect the relevant source files directly because some older docs may lag behind the code.

## Project Snapshot

QuestHabit is a gamified habit tracker with an RPG-style hero system.

- Frontend: React 19, Vite, Tailwind CSS, Framer Motion, lucide-react, react-hot-toast.
- Backend: Node.js, Express 5, Mongoose, MongoDB, JWT-related scaffolding.
- Root scripts use `concurrently` to run the client and server together.
- The dashboard currently uses mostly local React state and demo data.
- Several backend routes are placeholders; `server/routes/hero.js` is more implemented than the others.

## Important Paths

- `client/src/App.jsx`: switches between hero class selection and dashboard.
- `client/src/pages/Dashboard.jsx`: main dashboard state and layout.
- `client/src/pages/HeroClassSelection.jsx`: hero class selection flow.
- `client/src/components/Dashboard/`: dashboard cards and widgets.
- `client/src/components/HeroClassSelection/`: hero class cards.
- `client/src/components/HabitCard/`: habit card showcase components.
- `client/src/components/Common/`: shared UI utilities such as progress bars and particles.
- `client/src/index.css`: Tailwind directives and global styles.
- `client/tailwind.config.js`: Tailwind theme extension.
- `client/vite.config.js`: Vite config and `/api` proxy to the backend.
- `server/server.js`: Express app setup, middleware, route mounting, health check.
- `server/config/db.js`: MongoDB connection helper.
- `server/models/User.js`: user, hero, streak, badge, and XP schema logic.
- `server/models/Habit.js`: habit schema, streak tracking, XP reward helpers.
- `server/middleware/auth.js`: JWT auth middleware scaffold.
- `server/routes/`: API route handlers.

## Commands

Install dependencies if needed:

```bash
npm install
cd client && npm install
cd ../server && npm install
```

Run both apps from the repo root:

```bash
npm run dev
```

Run one side at a time:

```bash
npm run client
npm run server
```

Build the frontend:

```bash
npm run build
```

Lint the frontend:

```bash
cd client
npm run lint
```

There are no real automated tests yet. The root and server `test` scripts intentionally exit with an error.

## Local URLs

- Frontend dev server: `http://localhost:5173`
- Backend server: `http://localhost:5000`
- Backend health check: `http://localhost:5000/health`
- Vite proxies frontend `/api/*` requests to `http://localhost:5000/api/*`.

## Environment

The backend expects `server/.env` with values like:

```env
MONGODB_URI=...
PORT=5000
NODE_ENV=development
JWT_SECRET=...
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=debug
```

Do not print, commit, or expose secrets from `.env`. If the database is unavailable, `server/config/db.js` logs the failure and lets the server continue with limited functionality.

## Current Backend State

- `server/routes/auth.js`, `server/routes/habits.js`, and `server/routes/leaderboard.js` are placeholder implementations.
- `server/routes/hero.js` has real logic for authenticated hero reads/updates and anonymous class selection.
- `server/middleware/auth.js` currently returns an empty object from `verifyToken`, so authenticated routes that depend on `req.user.id` will not work correctly until JWT verification is implemented.
- `User.js` supports password hashing, XP leveling, badges, and streak updates.
- `Habit.js` supports daily completion, streak tracking, XP rewards, notes, and status helpers.

## Current Frontend State

- The app starts at hero class selection if `localStorage.selectedClass` is missing.
- After selecting a class, `Dashboard` renders with local demo quests and hero stats.
- Quest completion updates local state, fires confetti, shows a toast, and adds XP.
- The frontend class selection attempts `POST /api/hero/select-class`, but still works locally if the backend is unavailable.
- Keep UI changes consistent with the existing RPG dashboard style, but prefer readable, responsive controls over decorative complexity.

## Coding Guidelines

- Match the existing JavaScript style: React function components in the client, CommonJS modules in the server.
- Keep frontend components focused and reusable; dashboard widgets belong under `client/src/components/Dashboard/`.
- Use Tailwind utilities already present in the project before adding new CSS.
- Use lucide-react icons when adding UI icons.
- Keep backend route logic aligned with the Mongoose model methods instead of duplicating streak or XP calculations.
- Validate request input before writing to MongoDB.
- Never trust client-provided user IDs for authenticated user data; derive the user from the JWT once auth is fixed.
- Preserve existing user work and avoid unrelated rewrites.

## Verification Checklist

For frontend changes:

```bash
cd client
npm run lint
npm run build
```

For backend changes:

```bash
cd server
npm run dev
```

Then check:

```bash
curl http://localhost:5000/health
```

For full app changes, run from the root:

```bash
npm run dev
```

Open `http://localhost:5173` and manually verify the affected workflow.

## Good First Fixes

- Implement real JWT verification in `server/middleware/auth.js`.
- Implement register/login/logout in `server/routes/auth.js`.
- Wire dashboard data to the real habits and hero APIs.
- Add focused tests for model helper methods such as `addXP`, `updateStreak`, and `completeToday`.
- Update older docs that contain stale endpoint or class lists.
