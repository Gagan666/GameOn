const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  gameName: String,
  location: String,
  playersNeeded: Number,
  players: [{ type: String }],
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
