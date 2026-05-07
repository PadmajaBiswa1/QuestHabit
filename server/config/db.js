const mongoose = require('mongoose');

const dbStatus = {
  connected: false,
  error: null,
};

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS) || 5000,
    });

    dbStatus.connected = true;
    dbStatus.error = null;
    console.log('MongoDB connected successfully');
  } catch (error) {
    dbStatus.connected = false;
    dbStatus.error = error.message;
    console.error('MongoDB connection failed:', error.message);

    if (process.env.NODE_ENV === 'production') {
      throw error;
    }

    console.error('Running server without database connection in development mode');
  }
};

const getDBStatus = () => ({
  connected: mongoose.connection.readyState === 1,
  readyState: mongoose.connection.readyState,
  error: dbStatus.error,
});

module.exports = { connectDB, getDBStatus };
