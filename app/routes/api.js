var express = require("express"),
router      = express.Router(),
User        = require('../models/user');

router.get("/profile", (req, res) => {
  if(!req.isAuthenticated()) return;
  User.findById(req.user._id, (err, user) => {
    if(err) return;
    res.json({
      ErrorOccured: false,
      User: user
    });
  });
});

module.exports = router;
