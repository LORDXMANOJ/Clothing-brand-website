const express = require('express');
const router = express.Router();
const { getItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');
const { validate, itemRules } = require('../middleware/validateMiddleware');

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', protect, itemRules, validate, createItem);
router.put('/:id', protect, itemRules, validate, updateItem);
router.delete('/:id', protect, deleteItem);

module.exports = router;
