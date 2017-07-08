var mongoose = require("mongoose");

var currensongSchema = mongoose.Schema({
  userId: Number,
  lastFmUsername: String
});

module.exports = mongoose.model('User', currensongSchema);
