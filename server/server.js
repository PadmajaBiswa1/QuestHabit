const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB, getDBStatus } = require('./config/db');

const app = express();

const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowAnyOrigin = corsOrigins.includes('*');

app.use(cors({
  origin: allowAnyOrigin ? true : corsOrigins,
  credentials: !allowAnyOrigin,
}));

app.use(morgan(process.env.LOG_LEVEL === 'debug' ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/habits', require('./routes/habits'));
app.use('/api/hero', require('./routes/hero'));
app.use('/api/leaderboard', require('./routes/leaderboard'));

app.get('/health', (req, res) => {
  const database = getDBStatus();
  const isHealthy = database.connected || process.env.NODE_ENV !== 'production';

  res.status(isHealthy ? 200 : 503).json({
    status: database.connected ? 'OK' : 'DEGRADED',
    timestamp: new Date().toISOString(),
    database,
  });
});

const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (process.env.NODE_ENV === 'production' && fs.existsSync(path.join(clientDistPath, 'index.html'))) {
  app.use(express.static(clientDistPath));
  app.get(/^(?!\/api\/|\/health$).*/, (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`QuestHabit server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  });
}

module.exports = app;
