const { body, validationResult } = require('express-validator');

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => err.msg);
    return res.status(400).json({
      success: false,
      message: extractedErrors[0] || 'Invalid input data',
      errors: extractedErrors,
    });
  }
  next();
};

// Auth validation rules
const registerRules = [
  body('name').trim().escape().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().normalizeEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const loginRules = [
  body('email').trim().isEmail().normalizeEmail().withMessage('Must be a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Item validation rules
const itemRules = [
  body('title').trim().escape().notEmpty().withMessage('Title is required'),
  body('description').trim().escape().notEmpty().withMessage('Description is required'),
  body('category').trim().escape().notEmpty().withMessage('Category is required'),
  body('brand').trim().escape().notEmpty().withMessage('Brand is required'),
  body('size').trim().escape().notEmpty().withMessage('Size is required'),
  body('condition').trim().escape().notEmpty().withMessage('Condition is required'),
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array')
    .custom((images) => {
      if (images && images.length > 0) {
        for (const url of images) {
          if (typeof url !== 'string' || !url.startsWith('http://') && !url.startsWith('https://')) {
            throw new Error('Each image must be a valid HTTP or HTTPS URL');
          }
        }
      }
      return true;
    }),
];

// Swap request validation rules
const swapRules = [
  body('requestedItemId').trim().notEmpty().withMessage('Requested item ID is required'),
  body('offeredItemId').trim().notEmpty().withMessage('Offered item ID is required'),
  body('note').optional().trim().escape(),
  body('meetupLocation').optional().trim().escape(),
];

// Chat validation rules
const chatRules = [
  body('swapRequestId').trim().notEmpty().withMessage('Swap request ID is required'),
  body('content').trim().escape().notEmpty().withMessage('Message content cannot be empty'),
];

module.exports = {
  validate,
  registerRules,
  loginRules,
  itemRules,
  swapRules,
  chatRules,
};
