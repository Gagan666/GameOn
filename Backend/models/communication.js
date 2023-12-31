// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  roomID: String,
  sender: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
