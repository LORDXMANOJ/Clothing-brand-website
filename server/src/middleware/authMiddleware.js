const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { mockUsers } = require('../utils/seedData');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_clothing_swap_jwt_key_2026');

    // Try finding in DB, fallback to seed mockUsers if DB is down/empty
    let user;
    try {
      user = await User.findById(decoded.id).select('-password');
    } catch (err) {
      user = null;
    }

    if (!user) {
      user = mockUsers.find((u) => u._id === decoded.id || u.email === decoded.email);
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token authorization failed', error: error.message });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied: Admin authorization required' });
  }
};

module.exports = { protect, adminOnly };
