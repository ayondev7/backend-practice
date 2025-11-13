/**
 * User Routes
 * Defines all HTTP endpoints for user-related operations
 * 
 * Route Structure:
 * - Routes define the endpoint paths and HTTP methods
 * - Routes delegate business logic to controllers
 * - Keep routes clean and focused on routing only
 */

const express = require('express');
const router = express.Router();

// Import controller functions
const userController = require('../controllers/userController');

/**
 * ==========================================
 * USER ROUTES - MongoDB (Mongoose)
 * ==========================================
 * These routes interact with MongoDB via Mongoose models
 */

/**
 * @route   GET /api/users/mongo
 * @desc    Get all users from MongoDB
 * @access  Public
 */
router.get('/mongo', userController.getAllUsersFromMongo);

/**
 * @route   GET /api/users/mongo/:id
 * @desc    Get a single user by ID from MongoDB
 * @access  Public
 * @param   id - MongoDB ObjectId
 */
router.get('/mongo/:id', userController.getUserByIdFromMongo);

/**
 * @route   POST /api/users/mongo
 * @desc    Create a new user in MongoDB
 * @access  Public
 * @body    { name, email, age, role }
 */
router.post('/mongo', userController.createUserInMongo);

/**
 * @route   PUT /api/users/mongo/:id
 * @desc    Update a user by ID in MongoDB
 * @access  Public
 * @param   id - MongoDB ObjectId
 * @body    { name, email, age, role } - any fields to update
 */
router.put('/mongo/:id', userController.updateUserInMongo);

/**
 * @route   DELETE /api/users/mongo/:id
 * @desc    Delete a user by ID from MongoDB
 * @access  Public
 * @param   id - MongoDB ObjectId
 */
router.delete('/mongo/:id', userController.deleteUserFromMongo);

/**
 * ==========================================
 * USER ROUTES - PostgreSQL (Prisma)
 * ==========================================
 * These routes interact with PostgreSQL via Prisma Client
 */

/**
 * @route   GET /api/users/postgres
 * @desc    Get all users from PostgreSQL
 * @access  Public
 */
router.get('/postgres', userController.getAllUsersFromPostgres);

/**
 * @route   GET /api/users/postgres/:id
 * @desc    Get a single user by ID from PostgreSQL
 * @access  Public
 * @param   id - Integer (PostgreSQL auto-increment ID)
 */
router.get('/postgres/:id', userController.getUserByIdFromPostgres);

/**
 * @route   POST /api/users/postgres
 * @desc    Create a new user in PostgreSQL
 * @access  Public
 * @body    { name, email, age, role }
 */
router.post('/postgres', userController.createUserInPostgres);

/**
 * @route   PUT /api/users/postgres/:id
 * @desc    Update a user by ID in PostgreSQL
 * @access  Public
 * @param   id - Integer (PostgreSQL auto-increment ID)
 * @body    { name, email, age, role } - any fields to update
 */
router.put('/postgres/:id', userController.updateUserInPostgres);

/**
 * @route   DELETE /api/users/postgres/:id
 * @desc    Delete a user by ID from PostgreSQL
 * @access  Public
 * @param   id - Integer (PostgreSQL auto-increment ID)
 */
router.delete('/postgres/:id', userController.deleteUserFromPostgres);

/**
 * ==========================================
 * ADVANCED QUERY EXAMPLES (For your practice)
 * ==========================================
 * These routes will be implemented by you as part of your learning tasks
 */

// MongoDB Advanced Routes (TO BE IMPLEMENTED BY YOU)
// router.get('/mongo/search', userController.searchUsersInMongo);
// router.get('/mongo/aggregate/age-groups', userController.aggregateUsersByAge);
// router.get('/mongo/filter', userController.filterUsers);

// PostgreSQL Advanced Routes (TO BE IMPLEMENTED BY YOU)
// router.get('/postgres/search', userController.searchUsersInPostgres);
// router.get('/postgres/aggregate/stats', userController.getUserStats);
// router.get('/postgres/filter', userController.filterUsersPostgres);

// Export the router to be used in app.js
module.exports = router;
