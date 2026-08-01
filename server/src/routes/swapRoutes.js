const express = require('express');
const router = express.Router();
const { getSwaps, createSwap, updateSwapStatus } = require('../controllers/swapController');
const { protect } = require('../middleware/authMiddleware');
const { validate, swapRules } = require('../middleware/validateMiddleware');

router.use(protect);

router.get('/', getSwaps);
router.post('/', swapRules, validate, createSwap);
router.put('/:id/status', updateSwapStatus);

module.exports = router;
