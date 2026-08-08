const ClothingItem = require('../models/ClothingItem');
const { mockItems, mockUsers } = require('../utils/seedData');

let memoryItems = [...mockItems];

// @desc    Get all clothing items with filtering & search
// @route   GET /api/items
const getItems = async (req, res) => {
  try {
    const { category, brand, size, condition, search, page = 1, limit = 6 } = req.query;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 6;

    try {
      let query = { status: 'available' };

      if (category && category !== 'All') query.category = category;
      if (brand && brand !== 'All') query.brand = brand;
      if (size && size !== 'All') query.size = size;
      if (condition && condition !== 'All') query.condition = condition;

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } },
        ];
      }

      const total = await ClothingItem.countDocuments(query);
      const items = await ClothingItem.find(query)
        .populate('owner', 'name email avatarUrl location rating')
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      if (items && items.length > 0) {
        return res.json({
          success: true,
          count: items.length,
          total,
          page: pageNum,
          pages: Math.ceil(total / limitNum) || 1,
          items,
        });
      }
    } catch (dbErr) {
      // Fallback to memoryItems
    }

    // Filter memoryItems fallback
    let filtered = memoryItems.map((item) => {
      const ownerObj = mockUsers.find((u) => u._id === item.owner) || {
        name: 'Marcus Vance',
        email: 'marcus@fashionexchange.org',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        location: 'Brooklyn, NY',
        rating: 4.9,
      };
      return { ...item, owner: ownerObj };
    });

    if (category && category !== 'All') {
      filtered = filtered.filter((i) => i.category.toLowerCase() === category.toLowerCase());
    }
    if (brand && brand !== 'All') {
      filtered = filtered.filter((i) => i.brand.toLowerCase() === brand.toLowerCase());
    }
    if (size && size !== 'All') {
      filtered = filtered.filter((i) => i.size === size);
    }
    if (condition && condition !== 'All') {
      filtered = filtered.filter((i) => i.condition.toLowerCase() === condition.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (i) => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.brand.toLowerCase().includes(q)
      );
    }

    const total = filtered.length;
    const startIndex = (pageNum - 1) * limitNum;
    const paginated = filtered.slice(startIndex, startIndex + limitNum);
    const pages = Math.ceil(total / limitNum) || 1;

    res.json({
      success: true,
      count: paginated.length,
      total,
      page: pageNum,
      pages,
      items: paginated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single clothing item details
// @route   GET /api/items/:id
const getItemById = async (req, res) => {
  try {
    try {
      const item = await ClothingItem.findById(req.params.id).populate('owner', 'name email avatarUrl location bio rating swapsCompleted');
      if (item) {
        return res.json({ success: true, item });
      }
    } catch (dbErr) {
      // Fallback
    }

    const item = memoryItems.find((i) => i._id === req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Clothing item not found' });
    }

    const ownerObj = mockUsers.find((u) => u._id === item.owner) || {
      _id: '66a000000000000000000001',
      name: 'Marcus Vance',
      email: 'marcus@fashionexchange.org',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Sustainable wardrobe curator & Vintage Denim collector.',
      location: 'Brooklyn, NY',
      rating: 4.9,
      swapsCompleted: 14,
    };

    res.json({ success: true, item: { ...item, owner: ownerObj } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new clothing item listing
// @route   POST /api/items
const createItem = async (req, res) => {
  try {
    const { title, description, category, brand, size, condition, gender, images, estimatedValue, tags } = req.body;

    if (!title || !description || !category || !brand || !size || !condition) {
      return res.status(400).json({ success: false, message: 'Please complete all required fields' });
    }

    const defaultImage = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80';
    const itemImages = images && images.length > 0 ? images : [defaultImage];

    try {
      const item = await ClothingItem.create({
        title,
        description,
        category,
        brand,
        size,
        condition,
        gender: gender || 'Unisex',
        images: itemImages,
        owner: req.user._id,
        estimatedValue: estimatedValue || 50,
        tags: tags || [],
      });

      return res.status(201).json({ success: true, item });
    } catch (dbErr) {
      // Memory fallback
      const newItem = {
        _id: 'item_' + Date.now(),
        title,
        description,
        category,
        brand,
        size,
        condition,
        gender: gender || 'Unisex',
        images: itemImages,
        owner: req.user._id || req.user.id || '66a000000000000000000001',
        status: 'available',
        estimatedValue: Number(estimatedValue) || 50,
        tags: tags || [],
        createdAt: new Date().toISOString(),
      };

      memoryItems.unshift(newItem);
      return res.status(201).json({ success: true, item: newItem });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a clothing item listing
// @route   PUT /api/items/:id
const updateItem = async (req, res) => {
  try {
    const { title, description, category, brand, size, condition, status } = req.body;

    try {
      let item = await ClothingItem.findById(req.params.id);
      if (item) {
        if (item.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
          return res.status(403).json({ success: false, message: 'Not authorized to edit this listing' });
        }

        item.title = title || item.title;
        item.description = description || item.description;
        item.category = category || item.category;
        item.brand = brand || item.brand;
        item.size = size || item.size;
        item.condition = condition || item.condition;
        item.status = status || item.status;

        const updatedItem = await item.save();
        return res.json({ success: true, item: updatedItem });
      }
    } catch (dbErr) {
      // Memory fallback
    }

    const itemIdx = memoryItems.findIndex((i) => i._id === req.params.id);
    if (itemIdx === -1) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    memoryItems[itemIdx] = {
      ...memoryItems[itemIdx],
      ...req.body,
    };

    res.json({ success: true, item: memoryItems[itemIdx] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a clothing item listing
// @route   DELETE /api/items/:id
const deleteItem = async (req, res) => {
  try {
    try {
      const item = await ClothingItem.findById(req.params.id);
      if (item) {
        await item.deleteOne();
        return res.json({ success: true, message: 'Listing removed successfully' });
      }
    } catch (dbErr) {
      // Memory fallback
    }

    memoryItems = memoryItems.filter((i) => i._id !== req.params.id);
    res.json({ success: true, message: 'Listing removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getItems, getItemById, createItem, updateItem, deleteItem };
