module.exports = function(app){
  var passport    = require("passport"),
  twitchStrategy  = require("passport-twitch").Strategy,
  User = require('./app/models/user');

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new twitchStrategy({
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    callbackURL: process.env.TWITCH_CALLBACK_URL,
    scope: "user_read"
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({
      twitchId: profile.id
    }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        user = new User({
          twitchId: profile.id,
          displayName: profile.displayName,
          logo: profile._json.logo,
          updated_at: profile._json.updated_at
        });
        user.save((err) => {
          if (err) console.log(err);
          return done(err, user);
        });
      }else{
        if(new Date(profile.updated_at) > new Date(user.updated_at)){
          user.displayName = profile.displayName;
          user.logo = profile._json.logo;
          user.updated_at = profile._json.updated_at;
          user.save((err) => {
            if (err) console.log(err);
            return done(err, user);
          });
        }else{
          return done(err, user);
        }
      }
    });
  }));


  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
