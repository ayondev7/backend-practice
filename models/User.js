/**
 * User Model for MongoDB (Mongoose)
 * 
 * Mongoose Schema defines the structure of documents in MongoDB
 * Unlike SQL databases, MongoDB is schema-less, but Mongoose adds structure
 * 
 * Schema Types:
 * - String: Text data
 * - Number: Numeric data
 * - Date: Date and time
 * - Boolean: true/false
 * - ObjectId: Reference to another document
 * - Array: List of values
 * - Mixed: Any type
 * 
 * Schema Options:
 * - required: Field must be provided
 * - unique: No duplicates allowed
 * - default: Default value if not provided
 * - lowercase/uppercase: Transform text
 * - trim: Remove whitespace
 * - min/max: Validate numeric range
 * - enum: Allowed values only
 */

const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    // Name field
    name: {
      type: String,
      required: [true, 'Name is required'],  // Required with custom error message
      trim: true,  // Remove whitespace from both ends
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters']
    },

    // Email field
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,  // Ensure no duplicate emails
      lowercase: true,  // Convert to lowercase
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },

    // Age field (optional)
    age: {
      type: Number,
      min: [0, 'Age cannot be negative'],
      max: [150, 'Age seems invalid']
    },

    // Role field with enum
    role: {
      type: String,
      enum: {
        values: ['USER', 'ADMIN', 'MODERATOR'],
        message: '{VALUE} is not a valid role'
      },
      default: 'USER'
    },

    // Example: Additional fields you might add
    // isActive: {
    //   type: Boolean,
    //   default: true
    // },
    
    // profilePicture: {
    //   type: String,  // URL to image
    //   default: 'default-avatar.png'
    // },

    // tags: {
    //   type: [String],  // Array of strings
    //   default: []
    // },

    // address: {
    //   street: String,
    //   city: String,
    //   country: String,
    //   zipCode: String
    // }
  },
  {
    // Schema options
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
    
    // Virtual properties and JSON transformation
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

/**
 * Indexes
 * Improve query performance on frequently searched fields
 * Create indexes on fields you often filter/sort by
 */
userSchema.index({ email: 1 });  // Single field index
userSchema.index({ name: 1, age: -1 });  // Compound index (name ascending, age descending)

/**
 * Virtual Properties
 * Fields that are computed from other fields, not stored in database
 */
userSchema.virtual('ageGroup').get(function() {
  if (!this.age) return 'Unknown';
  if (this.age < 18) return 'Minor';
  if (this.age < 65) return 'Adult';
  return 'Senior';
});

/**
 * Instance Methods
 * Methods available on individual documents
 * Can be called like: user.getPublicProfile()
 */
userSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role
  };
};

/**
 * Static Methods
 * Methods available on the Model itself
 * Can be called like: User.findByEmail('test@example.com')
 */
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.findAdmins = function() {
  return this.find({ role: 'ADMIN' });
};

/**
 * Middleware (Hooks)
 * Functions that run before/after certain operations
 */

// Pre-save middleware - runs before saving a document
userSchema.pre('save', function(next) {
  // 'this' refers to the document being saved
  console.log(`Saving user: ${this.name}`);
  next();
});

// Post-save middleware - runs after saving
userSchema.post('save', function(doc, next) {
  console.log(`User saved successfully: ${doc.name}`);
  next();
});

// Pre-remove middleware - runs before deleting
userSchema.pre('remove', function(next) {
  console.log(`Deleting user: ${this.name}`);
  // You could perform cleanup operations here
  next();
});

/**
 * Query Middleware
 * Runs for query operations like find, findOne, etc.
 */
// userSchema.pre(/^find/, function(next) {
//   // Example: Always exclude deleted users
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

// Create and export the model
const User = mongoose.model('User', userSchema);

module.exports = User;
