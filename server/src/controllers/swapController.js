const SwapRequest = require('../models/SwapRequest');
const ClothingItem = require('../models/ClothingItem');
const { mockSwapRequests, mockUsers, mockItems } = require('../utils/seedData');

let memorySwaps = [...mockSwapRequests];

// @desc    Get user's swap requests (received & sent)
// @route   GET /api/swaps
const getSwaps = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    try {
      const swaps = await SwapRequest.find({
        $or: [{ requester: userId }, { recipient: userId }],
      })
        .populate('requester', 'name email avatarUrl rating')
        .populate('recipient', 'name email avatarUrl rating')
        .populate('requestedItem')
        .populate('offeredItem');

      if (swaps && swaps.length > 0) {
        return res.json({ success: true, count: swaps.length, swaps });
      }
    } catch (dbErr) {
      // Memory fallback
    }

    const populatedSwaps = memorySwaps.map((swap) => {
      const requesterObj = mockUsers.find((u) => u._id === swap.requester) || mockUsers[1];
      const recipientObj = mockUsers.find((u) => u._id === swap.recipient) || mockUsers[0];
      const requestedItemObj = mockItems.find((i) => i._id === swap.requestedItem) || mockItems[0];
      const offeredItemObj = mockItems.find((i) => i._id === swap.offeredItem) || mockItems[1];

      return {
        ...swap,
        requester: requesterObj,
        recipient: recipientObj,
        requestedItem: requestedItemObj,
        offeredItem: offeredItemObj,
      };
    });

    res.json({ success: true, count: populatedSwaps.length, swaps: populatedSwaps });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new swap request
// @route   POST /api/swaps
const createSwap = async (req, res) => {
  try {
    const { requestedItemId, offeredItemId, note, meetupLocation } = req.body;

    if (!requestedItemId || !offeredItemId) {
      return res.status(400).json({ success: false, message: 'Both requested and offered items are required' });
    }

    try {
      const targetItem = await ClothingItem.findById(requestedItemId);
      if (!targetItem) {
        return res.status(404).json({ success: false, message: 'Requested item not found' });
      }

      const swap = await SwapRequest.create({
        requester: req.user._id,
        recipient: targetItem.owner,
        requestedItem: requestedItemId,
        offeredItem: offeredItemId,
        note: note || '',
        meetupLocation: meetupLocation || 'Local Community Hub',
      });

      return res.status(201).json({ success: true, swap });
    } catch (dbErr) {
      // Memory fallback
      const targetItem = mockItems.find((i) => i._id === requestedItemId) || mockItems[0];
      const newSwap = {
        _id: 'swap_' + Date.now(),
        requester: req.user._id || '66a000000000000000000002',
        recipient: targetItem.owner || '66a000000000000000000001',
        requestedItem: requestedItemId,
        offeredItem: offeredItemId,
        status: 'pending',
        note: note || 'Interested in swapping!',
        meetupLocation: meetupLocation || 'Local Community Hub',
        createdAt: new Date().toISOString(),
      };

      memorySwaps.unshift(newSwap);
      return res.status(201).json({ success: true, swap: newSwap });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update swap request status (accept, reject, complete, cancel)
// @route   PUT /api/swaps/:id/status
const updateSwapStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'accepted', 'rejected', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    try {
      const swap = await SwapRequest.findById(req.params.id);
      if (swap) {
        swap.status = status;
        await swap.save();
        return res.json({ success: true, swap });
      }
    } catch (dbErr) {
      // Memory fallback
    }

    const idx = memorySwaps.findIndex((s) => s._id === req.params.id);
    if (idx !== -1) {
      memorySwaps[idx].status = status;
      return res.json({ success: true, swap: memorySwaps[idx] });
    }

    res.status(404).json({ success: false, message: 'Swap request not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSwaps, createSwap, updateSwapStatus };
