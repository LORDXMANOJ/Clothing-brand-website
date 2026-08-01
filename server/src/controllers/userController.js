const User = require('../models/User');
const ClothingItem = require('../models/ClothingItem');
const { mockUsers, mockItems } = require('../utils/seedData');

// @desc    Get user profile and listings
// @route   GET /api/users/:id
const getUserProfile = async (req, res) => {
  try {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (user) {
        const userItems = await ClothingItem.find({ owner: user._id });
        return res.json({ success: true, user, listings: userItems });
      }
    } catch (dbErr) {
      // Memory fallback
    }

    const user = mockUsers.find((u) => u._id === req.params.id) || mockUsers[0];
    const listings = mockItems.filter((i) => i.owner === user._id);

    res.json({ success: true, user, listings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, bio, location, avatarUrl } = req.body;

    try {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = name || user.name;
        user.bio = bio || user.bio;
        user.location = location || user.location;
        user.avatarUrl = avatarUrl || user.avatarUrl;

        const updatedUser = await user.save();
        return res.json({ success: true, user: updatedUser });
      }
    } catch (dbErr) {
      // Memory fallback
    }

    const updatedUser = {
      ...req.user,
      name: name || req.user.name,
      bio: bio || req.user.bio,
      location: location || req.user.location,
      avatarUrl: avatarUrl || req.user.avatarUrl,
    };

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getUserProfile, updateUserProfile };
