var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  twitchId: Number,
  displayName: String
});

module.exports = mongoose.model('User', userSchema);
