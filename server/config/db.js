const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // If USE_MOCK_DB is true, skip MongoDB connection
    if (process.env.USE_MOCK_DB === 'true') {
      console.log('✓ Using Mock Database (in-memory storage)');
      return { mock: true };
    }

    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-todo';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`⚠ MongoDB connection failed: ${error.message}`);
    console.warn('✓ Falling back to mock database (in-memory storage)');
    process.env.USE_MOCK_DB = 'true';
    return { mock: true };
  }
};

module.exports = connectDB;
