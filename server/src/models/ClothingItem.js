const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Item title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      required: true,
      enum: ['Outerwear', 'Dresses', 'Tops', 'Bottoms', 'Footwear', 'Accessories', 'Activewear'],
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Shoes 8', 'Shoes 9', 'Shoes 10', 'One Size'],
    },
    condition: {
      type: String,
      required: true,
      enum: ['Brand New with Tags', 'Like New', 'Gently Used', 'Fair Condition'],
    },
    gender: {
      type: String,
      enum: ['Unisex', 'Men', 'Women'],
      default: 'Unisex',
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'pending_swap', 'swapped'],
      default: 'available',
    },
    tags: [{ type: String }],
    estimatedValue: {
      type: Number,
      default: 50,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ClothingItem', clothingItemSchema);
