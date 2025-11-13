/**
 * Prisma Database Configuration
 * This file handles the Prisma Client setup for PostgreSQL
 */

const { PrismaClient } = require('@prisma/client');

/**
 * Create a single instance of PrismaClient
 * In development, this prevents creating multiple instances during hot-reloads
 * In production, we create a new instance
 */
const prismaClientSingleton = () => {
  return new PrismaClient({
    // Log queries in development for debugging
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'info', 'warn', 'error'] 
      : ['error'],
  });
};

// Global variable to store Prisma instance (prevents multiple instances in dev)
const globalForPrisma = global;

// Create or reuse Prisma Client instance
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// In development, store instance globally to prevent hot-reload issues
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Connect to PostgreSQL database using Prisma
 * Tests the connection by making a simple query
 * @returns {Promise} - Resolves when connection is verified
 */
const connectPostgreSQL = async () => {
  try {
    // Test the database connection
    await prisma.$connect();
    
    console.log('✅ PostgreSQL (Prisma) Connected Successfully');
    
    // Optional: You can run a test query to verify
    // await prisma.$queryRaw`SELECT 1`;
    
  } catch (error) {
    console.error('❌ PostgreSQL (Prisma) Connection Error:', error.message);
    // Don't exit process, let the app decide how to handle it
    throw error;
  }
};

/**
 * Gracefully disconnect from PostgreSQL
 * Should be called when shutting down the application
 */
const disconnectPostgreSQL = async () => {
  try {
    await prisma.$disconnect();
    console.log('PostgreSQL connection closed');
  } catch (error) {
    console.error('Error disconnecting from PostgreSQL:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await disconnectPostgreSQL();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectPostgreSQL();
  process.exit(0);
});

module.exports = { prisma, connectPostgreSQL, disconnectPostgreSQL };
