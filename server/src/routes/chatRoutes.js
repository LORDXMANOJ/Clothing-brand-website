const express = require('express');
const router = express.Router();
const { getMessages, sendMessage } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');
const { validate, chatRules } = require('../middleware/validateMiddleware');

router.use(protect);

router.get('/:swapId', getMessages);
router.post('/', chatRules, validate, sendMessage);

module.exports = router;
