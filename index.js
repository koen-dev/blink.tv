const throng = require("throng");
const path = require("path");
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var concurrency = isProduction ? process.env.WEB_CONCURRENCY : 1;

throng({
  workers: concurrency,
  lifetime: Infinity
}, () => {
  var express     = require("express"),
  app             = express(),
  bodyParser      = require("body-parser"),
  session         = require("express-session"),
  cookieParser    = require("cookie-parser"),
  packageInfo     = require("./package.json"),
  mongoose        = require("mongoose"),
  hbs             = require("hbs"),
  http            = require("http"),
  server          = http.createServer(app),
  passport        = require("passport"),
  twitchStrategy  = require("passport-twitch").Strategy,
  auth            = require("./app/routes/auth");

  function loggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/');
    }
  }

  var configDB = require('./config/database.js');
  mongoose.connect(process.env.MONGODB_URL);

  // Middlewares
  app.use("/app/dist", express.static(path.resolve(__dirname, "app/dist")));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Routers
  app.use("/auth", auth);

  var User = require('./app/models/user');

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
          displayName: profile.displayName
        });
        user.save((err) => {
          if (err) console.log(err);
          return done(err, user);
        });
      }else{
        return done(err, user);
      }
    });
  }));

  if (!isProduction) {
    const webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('./webpack.config.js'),
    compiler = webpack(config);

    app.use(webpackHotMiddleware(compiler));
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }));
  }

  app.locals.title = packageInfo.name;

  app.set("view engine", "hbs");
  app.set("views", path.resolve(__dirname, "app/views"));

  hbs.registerPartials(path.resolve(__dirname,"app/views/partials"));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  app.get("*", (req, res, next) => {
    // Set response locals here for usage across all get calls
    res.locals.title = app.locals.title;
    res.locals.isLoggedIn = (req.isAuthenticated()) ? true : false;
    next();
  });

  app.get("/", (req, res) => {
    res.render("index", {
      defaults: res.locals
    });
  });

  app.get("/portal", loggedIn, (req, res) => {
    User.findById(req.user._id, (err, user) => {
      if (err) res.redirect('/');
      res.render("portal", {
        defaults: res.locals,
        user: user
      });
    });
  });

  server.listen(port, () => {
    console.log(`${app.locals.title} is listening on port ${port}`);
  });
});
