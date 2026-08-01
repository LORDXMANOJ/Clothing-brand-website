const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB gracefully
connectDB();

const server = app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Clothing Exchange API Server (v0.1) running on port ${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});

module.exports = server;
