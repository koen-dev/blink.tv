var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  twitchId: Number,
  displayName: String,
  logo: String,
  updated_at: String
});

module.exports = mongoose.model('User', userSchema);
