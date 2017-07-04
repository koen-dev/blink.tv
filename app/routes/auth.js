var express = require("express");
var passport = require("passport");
var router = express.Router();

router.get("/twitch", passport.authenticate("twitch"));

router.get("/twitch/callback", passport.authenticate("twitch", { successRedirect: "/auth/twitch/success", failureRedirect: "/" }));

router.get("/twitch/success", (req, res) => {
  res.render("success");
});

module.exports = router;
