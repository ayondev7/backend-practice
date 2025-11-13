/**
 * Server Entry Point
 * This file starts the Express server and initializes database connections
 * 
 * Separation of Concerns:
 * - app.js: Configures Express app, middleware, and routes
 * - server.js: Handles server startup, database connections, and process management
 */

// Load environment variables from .env file
require('dotenv').config();

// Import the configured Express app
const app = require('./app');

// Import database connection functions
const connectMongoDB = require('./config/mongoDb');
const { connectPostgreSQL } = require('./config/prismaDb');

/**
 * ==========================================
 * SERVER CONFIGURATION
 * ==========================================
 */

// Get port from environment variables or use default
const PORT = process.env.PORT || 3000;

// Store server instance for graceful shutdown
let server;

/**
 * ==========================================
 * DATABASE INITIALIZATION
 * ==========================================
 */

/**
 * Initialize all database connections
 * Connects to both MongoDB and PostgreSQL
 */
const initializeDatabases = async () => {
  try {
    console.log('🔄 Initializing database connections...\n');

    // Connect to MongoDB
    await connectMongoDB();

    // Connect to PostgreSQL via Prisma
    await connectPostgreSQL();

    console.log('\n✅ All database connections established successfully!\n');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    // Exit if databases cannot connect
    process.exit(1);
  }
};

/**
 * ==========================================
 * START SERVER
 * ==========================================
 */

/**
 * Start the Express server
 * First initializes databases, then starts listening for requests
 */
const startServer = async () => {
  try {
    // Initialize database connections first
    await initializeDatabases();

    // Start the Express server
    server = app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Local: http://localhost:${PORT}`);
      console.log(`❤️  Health: http://localhost:${PORT}/health`);
      console.log('='.repeat(50));
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

/**
 * ==========================================
 * GRACEFUL SHUTDOWN HANDLERS
 * ==========================================
 */

/**
 * Gracefully shut down the server
 * Closes database connections and stops accepting new requests
 */
const gracefulShutdown = async (signal) => {
  console.log(`\n⚠️  ${signal} received. Starting graceful shutdown...`);

  if (server) {
    // Stop accepting new connections
    server.close(() => {
      console.log('✅ HTTP server closed');
    });
  }

  // Database disconnections are handled in their respective config files
  // via SIGINT and SIGTERM event listeners

  // Give processes time to clean up, then exit
  setTimeout(() => {
    console.log('👋 Graceful shutdown completed');
    process.exit(0);
  }, 1000);
};

/**
 * Handle process termination signals
 * SIGTERM - Termination signal (e.g., from process managers)
 * SIGINT - Interrupt signal (e.g., Ctrl+C in terminal)
 */
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

/**
 * Handle uncaught exceptions
 * Log the error and shut down gracefully
 */
process.on('uncaughtException', (error) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
  console.error(error.name, error.message);
  console.error(error.stack);
  process.exit(1);
});

/**
 * Handle unhandled promise rejections
 * Log the error and shut down gracefully
 */
process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 UNHANDLED REJECTION! Shutting down...');
  console.error('Reason:', reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

/**
 * ==========================================
 * BOOTSTRAP APPLICATION
 * ==========================================
 */

// Start the server
startServer();
