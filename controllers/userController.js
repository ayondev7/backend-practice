/**
 * User Controller
 * Contains all business logic for user operations
 * 
 * Controller Responsibilities:
 * - Handle request/response cycle
 * - Validate input data
 * - Interact with database (Mongoose/Prisma)
 * - Send appropriate responses
 * - Handle errors gracefully
 */

const User = require('../models/User');  // Mongoose model
const { prisma } = require('../config/prismaDb');  // Prisma client

/**
 * ==========================================
 * MONGODB CONTROLLERS (Mongoose)
 * ==========================================
 */

/**
 * Get all users from MongoDB
 * @route   GET /api/users/mongo
 */
exports.getAllUsersFromMongo = async (req, res) => {
  try {
    // Find all users in MongoDB
    // You can add filters, sorting, pagination here
    const users = await User.find();

    // Send successful response
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });

  } catch (error) {
    // Handle errors
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch users from MongoDB',
      error: error.message
    });
  }
};

/**
 * Get a single user by ID from MongoDB
 * @route   GET /api/users/mongo/:id
 */
exports.getUserByIdFromMongo = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by MongoDB ObjectId
    const user = await User.findById(id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch user from MongoDB',
      error: error.message
    });
  }
};

/**
 * Create a new user in MongoDB
 * @route   POST /api/users/mongo
 * @body    { name, email, age, role }
 */
exports.createUserInMongo = async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, age, role } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Name and email are required'
      });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      age,
      role
    });

    // Send success response with created user
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: {
        user: newUser
      }
    });

  } catch (error) {
    // Handle duplicate key error (email already exists)
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Failed to create user in MongoDB',
      error: error.message
    });
  }
};

/**
 * Update a user by ID in MongoDB
 * @route   PUT /api/users/mongo/:id
 * @body    { name, email, age, role } - any fields to update
 */
exports.updateUserInMongo = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find and update user
    // { new: true } returns the updated document
    // { runValidators: true } runs schema validations on update
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: {
        user: updatedUser
      }
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update user in MongoDB',
      error: error.message
    });
  }
};

/**
 * Delete a user by ID from MongoDB
 * @route   DELETE /api/users/mongo/:id
 */
exports.deleteUserFromMongo = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete user
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
      data: {
        user: deletedUser
      }
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete user from MongoDB',
      error: error.message
    });
  }
};

/**
 * ==========================================
 * POSTGRESQL CONTROLLERS (Prisma)
 * ==========================================
 */

/**
 * Get all users from PostgreSQL
 * @route   GET /api/users/postgres
 */
exports.getAllUsersFromPostgres = async (req, res) => {
  try {
    // Find all users using Prisma
    const users = await prisma.user.findMany();

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch users from PostgreSQL',
      error: error.message
    });
  }
};

/**
 * Get a single user by ID from PostgreSQL
 * @route   GET /api/users/postgres/:id
 */
exports.getUserByIdFromPostgres = async (req, res) => {
  try {
    // Parse ID as integer (PostgreSQL uses integer IDs)
    const id = parseInt(req.params.id);

    // Validate ID
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid user ID'
      });
    }

    // Find user by ID
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch user from PostgreSQL',
      error: error.message
    });
  }
};

/**
 * Create a new user in PostgreSQL
 * @route   POST /api/users/postgres
 * @body    { name, email, age, role }
 */
exports.createUserInPostgres = async (req, res) => {
  try {
    const { name, email, age, role } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Name and email are required'
      });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        age: age ? parseInt(age) : null,
        role: role || 'USER'
      }
    });

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: {
        user: newUser
      }
    });

  } catch (error) {
    // Handle unique constraint violation (email already exists)
    if (error.code === 'P2002') {
      return res.status(400).json({
        status: 'error',
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Failed to create user in PostgreSQL',
      error: error.message
    });
  }
};

/**
 * Update a user by ID in PostgreSQL
 * @route   PUT /api/users/postgres/:id
 * @body    { name, email, age, role } - any fields to update
 */
exports.updateUserInPostgres = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, age, role } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid user ID'
      });
    }

    // Build update data object (only include provided fields)
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (age) updateData.age = parseInt(age);
    if (role) updateData.role = role;

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData
    });

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: {
        user: updatedUser
      }
    });

  } catch (error) {
    // Handle user not found
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Failed to update user in PostgreSQL',
      error: error.message
    });
  }
};

/**
 * Delete a user by ID from PostgreSQL
 * @route   DELETE /api/users/postgres/:id
 */
exports.deleteUserFromPostgres = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid user ID'
      });
    }

    // Delete user
    const deletedUser = await prisma.user.delete({
      where: { id }
    });

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
      data: {
        user: deletedUser
      }
    });

  } catch (error) {
    // Handle user not found
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Failed to delete user from PostgreSQL',
      error: error.message
    });
  }
};
