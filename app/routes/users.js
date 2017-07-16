var express = require("express"),
router      = express.Router(),
User        = require('../models/user');

router.get("/:userId/followeralert", (req, res) => {
  if (req.params.userId) {
    User.findById(req.params.userId, (err, user) => {
      if(err) return;
      res.render("followeralert", {
        defaults: res.locals,
        token: user.token
      });
    });
  }else{

  }
});

module.exports = router;
