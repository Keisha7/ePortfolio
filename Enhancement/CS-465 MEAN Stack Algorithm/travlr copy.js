// app_server/models/travlr.js

/**
 * Trip Mongoose schema & model for Travlr Getaways
 * NEW VERSION IN PROGRESS.
 */

const mongoose = require('mongoose');
const moment = require('moment'); 

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
    index: true // search optimization
  },
  length: {
    type: Number, // Changed to Number for computation (was String)
    required: [true, 'Trip length is required'],
    min: [1, 'Trip length must be at least 1 day']
  },
  start: {
    type: Date,
    required: [true, 'Start date is required'],
    validate: {
      validator: function(value) {
        // Start date must be in the future
        return value > new Date();
      },
      message: 'Start date must be in the future'
    }
  },
  resort: {
    type: String,
    required: [true, 'Resort name is required'],
    trim: true,
    index: true // queries
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



// Compute the end date as start + length (in days)
tripSchema.virtual('endDate').get(function() {
  if (this.start && this.length) {
    return moment(this.start).add(this.length, 'days').toDate();
  }
  return null;
});




tripSchema.pre('save', function(next) {
  if (this.code) this.code = this.code.trim().toUpperCase();
  if (this.name) this.name = this.name.trim();
  next();
});



// Case-insensitive, partial search by name or resort
tripSchema.statics.searchTrips = function(searchTerm) {
  const regex = new RegExp(searchTerm, 'i');
  return this.find({
    $or: [{ name: regex }, { resort: regex }]
  });
};

// Find trips within a date range 
tripSchema.statics.findWithinDateRange = function(startDate, endDate) {
  return this.find({
    start: { $gte: new Date(startDate), $lte: new Date(endDate) }
  });
};

// Total: Average price per resort
tripSchema.statics.avgPricePerResort = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$resort',
        avgPrice: { $avg: '$perPerson' },
        tripCount: { $sum: 1 }
      }
    },
    {
      $sort: { avgPrice: -1 }
    }
  ]);
};



module.exports = mongoose.model('Trip', tripSchema);
