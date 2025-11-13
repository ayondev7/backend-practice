/**
 * Express Application Configuration
 * This file sets up the Express app with all middleware and routes
 * The actual server is created in server.js
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Create Express application instance
const app = express();

/**
 * ==========================================
 * MIDDLEWARE SETUP
 * ==========================================
 */

/**
 * CORS - Cross-Origin Resource Sharing
 * Allows your API to be accessed from different domains/origins
 * In production, configure specific origins for security
 */
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-frontend-domain.com'  // Replace with your frontend URL
    : '*',  // In development, allow all origins
  credentials: true,  // Allow cookies to be sent with requests
}));

/**
 * Morgan - HTTP request logger
 * Logs all incoming requests to the console
 * 'dev' format provides colored output with response time
 */
app.use(morgan('dev'));

/**
 * Body Parser Middleware
 * express.json() - Parses incoming JSON payloads (req.body)
 * Limit set to 10mb to handle larger payloads if needed
 */
app.use(express.json({ limit: '10mb' }));

/**
 * URL Encoded Parser
 * Parses URL-encoded form data (e.g., from HTML forms)
 * extended: true allows for rich objects and arrays
 */
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/**
 * ==========================================
 * ROUTES
 * ==========================================
 */

/**
 * Health Check Route
 * Simple endpoint to verify the server is running
 * Useful for monitoring and deployment systems
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),  // Server uptime in seconds
  });
});

/**
 * Root Route
 * Welcome message for the API
 */
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Express.js API with Prisma & Mongoose',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      users: '/api/users',  // Example endpoints
      products: '/api/products',
    }
  });
});

/**
 * API Routes
 * Mount your route modules here
 * Example: app.use('/api/users', userRoutes);
 */

// Import route files (will be created next)
const userRoutes = require('./routes/userRoutes');

// Mount routes with base path
app.use('/api/users', userRoutes);  // All user routes will be prefixed with /api/users

// TODO: Add more routes here as you create them
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);

/**
 * ==========================================
 * ERROR HANDLING MIDDLEWARE
 * ==========================================
 */

/**
 * 404 Handler - Route Not Found
 * This catches any requests to undefined routes
 * Must be placed AFTER all other routes
 */
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found`,
  });
});

/**
 * Global Error Handler
 * Catches all errors thrown in the application
 * This should be the LAST middleware
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Set default error status and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    message: message,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,  // Show stack trace only in development
      error: err 
    }),
  });
});

// Export the configured Express app
module.exports = app;
