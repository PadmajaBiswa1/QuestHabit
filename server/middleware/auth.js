const jwt = require('jsonwebtoken');

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return process.env.JWT_SECRET;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, getJwtSecret());
  const id = decoded.id || decoded.userId || decoded.sub;

  if (!id) {
    throw new Error('Token payload is missing user id');
  }

  return {
    ...decoded,
    id,
  };
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    const status = error.message === 'JWT_SECRET is not configured' ? 500 : 403;
    res.status(status).json({ message: error.message || 'Invalid or expired token' });
  }
};

module.exports = { authenticateToken, verifyToken, getJwtSecret };
