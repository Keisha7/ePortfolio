// app_server/models/seed.js


const mongoose = require('mongoose');
const Trip      = require('./travlr');
const trips     = require('../../data/trips.json');
require('dotenv').config();

const dbURI = process.env.MONGODB_URI ||
  `mongodb://${process.env.DB_HOST || '127.0.0.1'}:${process.env.DB_PORT || '27017'}/${process.env.DB_NAME || 'travlr'}`;

async function seed() {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`Connected to ${dbURI}`);

    for (const tripData of trips) {
      const filter = { code: tripData.code };
      const update = { $set: tripData };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      await Trip.findOneAndUpdate(filter, update, options);
      console.log(`Upserted trip ${tripData.code}`);
    }

    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database.');
    process.exit(0);
  }
}

seed();
