// app_api/models/db.js

const mongoose = require('mongoose');
const readLine = require('readline');

// Build the connection string (allow override via env)
const host  = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Graceful shutdown helper
function gracefulShutdown(msg, callback) {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    if (callback) callback();
  });
}

// Catch nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// Catch app termination (Ctrl-C)
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => process.exit(0));
});

// Catch Heroku/Container shutdown
process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown', () => process.exit(0));
});

// Windows support for SIGINT
if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input:  process.stdin,
    output: process.stdout
  });
  rl.on('SIGINT', () => process.emit('SIGINT'));
}

// 1) Connect (with a small delay to avoid race conditions)
setTimeout(() => {
  mongoose
    .connect(dbURI, {
      useNewUrlParser:    true,
      useUnifiedTopology: true
    })
    .catch(err => console.error('Initial connection error:', err));
}, 1000);

// 2) Connection event logging
mongoose.connection.on('connected', () => {
  console.log(` Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.error(' Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log(' Mongoose disconnected');
});

// 3) Register all schemas/models
require('./travlr');   // ensures mongoose.model('Trip', schema) runs

// 4) Export the mongoose instance
module.exports = mongoose;
