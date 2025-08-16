// app_server/models/seed.js

/**
 * Seed script for Travlr Getaways trips collection.
 *
 * Connects to MongoDB via Mongoose, clears existing trips,
 * inserts mock data from data/trips.json, then cleanly exits.
 */

const mongoose = require('mongoose');
const Trip      = require('./travlr');
const trips     = require('../../data/trips.json');

// Default to a local MongoDB instance; can override with MONGODB_URI
const dbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';

(async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(dbUri);
    console.log(` Connected to ${dbUri}`);

    // 2. Clear existing Trip documents
    console.log('  Clearing existing trips...');
    await Trip.deleteMany({});
    console.log(' Existing trips cleared.');

    // 3. Insert mock data
    console.log(` Seeding ${trips.length} trips...`);
    const inserted = await Trip.insertMany(trips);
    console.log(` Seeded ${inserted.length} trips.`);
  } catch (err) {
    console.error(' Seeding error:', err);
  } finally {
    // 4. Disconnect and exit
    await mongoose.disconnect();
    console.log(' Disconnected from database.');
    process.exit(0);
  }
})();
