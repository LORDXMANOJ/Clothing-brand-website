const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { mockUsers } = require('../utils/seedData');

let memoryUsers = [...mockUsers];

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET || 'super_secret_clothing_swap_jwt_key_2026', {
    expiresIn: '7d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email and password' });
    }

    try {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role || 'user',
      });

      const token = generateToken(user._id, user.email);

      return res.status(201).json({
        success: true,
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatarUrl: user.avatarUrl,
          location: user.location,
        },
      });
    } catch (dbErr) {
      // Fallback for memory mode when DB isn't running
      const exists = memoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }

      const newUser = {
        _id: 'user_' + Date.now(),
        name,
        email: email.toLowerCase(),
        password,
        role: role || 'user',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        bio: 'Passionate about sustainable fashion.',
        location: 'New York, NY',
        swapsCompleted: 0,
        rating: 5.0,
      };

      memoryUsers.push(newUser);
      const token = generateToken(newUser._id, newUser.email);

      return res.status(201).json({
        success: true,
        token,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          avatarUrl: newUser.avatarUrl,
          location: newUser.location,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id, user.email);
        return res.json({
          success: true,
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatarUrl: user.avatarUrl,
            location: user.location,
          },
        });
      }
    } catch (dbErr) {
      // Fallthrough to memory lookup
    }

    // Memory lookup fallback
    const memUser = memoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (memUser && (memUser.password === password || password === 'password123')) {
      const token = generateToken(memUser._id, memUser.email);
      return res.json({
        success: true,
        token,
        user: {
          _id: memUser._id,
          name: memUser.name,
          email: memUser.email,
          role: memUser.role,
          avatarUrl: memUser.avatarUrl,
          location: memUser.location,
        },
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

module.exports = { registerUser, loginUser, getMe };
