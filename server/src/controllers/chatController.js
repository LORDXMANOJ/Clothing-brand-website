const Message = require('../models/Message');
const { mockMessages, mockUsers } = require('../utils/seedData');

let memoryMessages = [...mockMessages];

// @desc    Get negotiation chat messages for a specific swap request
// @route   GET /api/chat/:swapId
const getMessages = async (req, res) => {
  try {
    const { swapId } = req.params;

    try {
      const messages = await Message.find({ swapRequest: swapId })
        .populate('sender', 'name avatarUrl')
        .sort({ createdAt: 1 });

      if (messages && messages.length > 0) {
        return res.json({ success: true, messages });
      }
    } catch (dbErr) {
      // Memory fallback
    }

    const filtered = memoryMessages
      .filter((m) => m.swapRequest === swapId)
      .map((msg) => {
        const senderObj = mockUsers.find((u) => u._id === msg.sender) || {
          name: 'Marcus Vance',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        };
        return { ...msg, sender: senderObj };
      });

    res.json({ success: true, messages: filtered });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Send a new message in negotiation chat
// @route   POST /api/chat
const sendMessage = async (req, res) => {
  try {
    const { swapRequestId, receiverId, content } = req.body;

    if (!swapRequestId || !content) {
      return res.status(400).json({ success: false, message: 'Swap request ID and message content are required' });
    }

    const senderId = req.user._id || req.user.id || '66a000000000000000000001';

    try {
      const message = await Message.create({
        swapRequest: swapRequestId,
        sender: senderId,
        receiver: receiverId || '66a000000000000000000001',
        content,
      });

      return res.status(201).json({ success: true, message });
    } catch (dbErr) {
      // Memory fallback
      const newMsg = {
        _id: 'msg_' + Date.now(),
        swapRequest: swapRequestId,
        sender: {
          _id: senderId,
          name: req.user.name || 'Marcus Vance',
          avatarUrl: req.user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
        receiver: receiverId || '66a000000000000000000001',
        content,
        createdAt: new Date().toISOString(),
      };

      memoryMessages.push(newMsg);
      return res.status(201).json({ success: true, message: newMsg });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getMessages, sendMessage };
