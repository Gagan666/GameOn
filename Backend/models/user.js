const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  mobile:Number
});

module.exports = mongoose.model('User', userSchema);
