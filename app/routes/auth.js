var express = require("express");
var passport = require("passport");
var router = express.Router();

router.get("/twitch", passport.authenticate("twitch"));

router.get("/twitch/callback", passport.authenticate("twitch", { successRedirect: "/auth/twitch/success", failureRedirect: "/" }));

router.get("/twitch/success", (req, res) => {
  res.render("success");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({"ErrorOccured": false});
});

router.get("/isloggedin", (req, res) => {
  var isLoggedIn = req.isAuthenticated();
  res.json({"isLoggedIn": isLoggedIn});
});

module.exports = router;
