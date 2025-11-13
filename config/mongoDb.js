/**
 * Mongoose Database Configuration
 * This file handles the connection to MongoDB using Mongoose ODM
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Uses the MONGO_URI from environment variables
 * @returns {Promise} - Resolves when connection is established
 */
const connectMongoDB = async () => {
  try {
    // Connection options for better stability and performance
    const options = {
      // useNewUrlParser and useUnifiedTopology are no longer needed in Mongoose 6+
      // They are now always true by default
    };

    // Attempt to connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, options);

    console.log('✅ MongoDB Connected Successfully');
    console.log(`   Database: ${mongoose.connection.name}`);
    console.log(`   Host: ${mongoose.connection.host}`);

  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    // Exit process with failure if database connection fails
    process.exit(1);
  }
};

/**
 * Handle MongoDB connection events
 */
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB Disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Error:', err);
});

// Graceful shutdown handler
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during MongoDB disconnect:', err);
    process.exit(1);
  }
});

module.exports = connectMongoDB;
