// app_server/models/travlr.js

/**
 * Trip Mongoose schema & model for Travlr Getaways
 * Defines validation, indexes, and timestamps.
 */

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
    trim: true
  },
  length: {
    type: String,
    required: [true, 'Trip length is required']
  },
  start: {
    type: Date,
    required: [true, 'Start date is required']
  },
  resort: {
    type: String,
    required: [true, 'Resort name is required']
  },
  perPerson: {
    type: Number,
    required: [true, 'Price per person is required'],
    min: [0, 'perPerson must be a positive number']
  },
  image: {
    type: String,
    required: [true, 'Image path is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  }
}, {
  timestamps: true
});

// Exporting as 'Trip' so Mongoose auto-pluralizes to the 'trips' collection
module.exports = mongoose.model('Trip', tripSchema);
