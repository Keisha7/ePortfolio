// app_server/models/travlr.js
// Enhanced Trip schema with full validation, defaults, indexes, hooks, and optimistic concurrency
//New Version

const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Trip code is required'],
    unique: true,
    trim: true,
    uppercase: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Trip name is required'],
    trim: true,
    index: true
  },
  length: {
    type: String,
    required: [true, 'Trip length is required'],
    match: [/^\d+\s?days?$/, 'Length must be in the format "X days"']
  },
  start: {
    type: Date,
    required: [true, 'Start date is required'],
    default: Date.now,
    index: true
  },
  resort: {
    type: String,
    required: [true, 'Resort name is required'],
    trim: true
  },
  perPerson: {
    type: Number,
    required: [true, 'Per-person cost is required'],
    min: [0, 'Cost must be non-negative']
  },
  image: {
    type: String,
    required: [true, 'Image path is required'],
    default: 'default.jpg'
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  }
}, {
  timestamps: true,
  versionKey: 'version',
  optimisticConcurrency: true
});

// Text index for search on name and description
tripSchema.index({ name: 'text', description: 'text' });

// Pre-save hook for data normalization or additional checks
tripSchema.pre('save', function(next) {
  // Example: ensure description length
  if (this.description.length < 20) {
    return next(new Error('Description must be at least 20 characters'));
  }
  next();
});

module.exports = mongoose.model('Trip', tripSchema);