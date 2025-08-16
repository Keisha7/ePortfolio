const mongoose = require('mongoose');
require('dotenv').config();


const dbURI = process.env.MONGODB_URI ||
  `mongodb://${process.env.DB_HOST || '127.0.0.1'}:${process.env.DB_PORT || '27017'}/${process.env.DB_NAME || 'travlr'}`;

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: parseInt(process.env.DB_POOL_SIZE, 10) || 5,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};


async function connect() {
  try {
    await mongoose.connect(dbURI, connectionOptions);
  } catch (err) {
    console.error('MongoDB initial connection error:', err);
    setTimeout(connect, 2000);
  }
}

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});


function gracefulShutdown(msg, callback) {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
}

process.on('SIGINT', () => gracefulShutdown('app termination', () => process.exit(0)));
process.on('SIGTERM', () => gracefulShutdown('container shutdown', () => process.exit(0)));

// Initialize connection
connect();

module.exports = mongoose;