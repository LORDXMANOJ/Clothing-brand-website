const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');
const ClothingItem = require('../models/ClothingItem');
const SwapRequest = require('../models/SwapRequest');
const Message = require('../models/Message');
const { mockUsers, mockItems, mockSwapRequests, mockMessages } = require('./seedData');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('[Seed] Clearing existing collections...');
    await User.deleteMany({});
    await ClothingItem.deleteMany({});
    await SwapRequest.deleteMany({});
    await Message.deleteMany({});

    console.log('[Seed] Inserting users...');
    const createdUsers = await User.insertMany(mockUsers);

    console.log('[Seed] Inserting clothing items...');
    const createdItems = await ClothingItem.insertMany(mockItems);

    console.log('[Seed] Inserting swap requests & messages...');
    await SwapRequest.insertMany(mockSwapRequests);
    await Message.insertMany(mockMessages);

    console.log('[Seed Success] Database populated with realistic clothing data!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error.message);
    process.exit(1);
  }
};

seedData();
