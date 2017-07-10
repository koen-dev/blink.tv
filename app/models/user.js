var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  twitchId: Number,
  displayName: String,
  logo: String,
  updated_at: String,
  token: String
});

module.exports = mongoose.model('User', userSchema);
