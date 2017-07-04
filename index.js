const throng = require("throng");
const path = require("path");
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var concurrency = isProduction ? process.env.WEB_CONCURRENCY : 1;

throng({
  workers: concurrency,
  lifetime: Infinity
}, () => {
  var compression = require("compression"),
  packageInfo     = require("./package.json"),
  express         = require("express"),
  mongoose        = require("mongoose"),
  bodyParser      = require("body-parser"),
  hbs             = require("hbs"),
  app             = express(),
  http            = require("http"),
  server          = http.createServer(app),
  cookieParser    = require("cookie-parser"),
  cookieSession   = require("cookie-session"),
  passport        = require("passport"),
  twitchStrategy  = require("passport-twitch").Strategy,
  auth            = require("./app/routes/auth");

  function loggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  var configDB = require('./config/database.js');
  mongoose.connect(configDB.url);

  // Middlewares
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(compression());
  app.use(cookieParser());
  app.use(cookieSession({secret: "somesecrettokenhere"}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/app/dist", express.static(path.resolve(__dirname, "app/dist")));
  // Routers
  app.use("/auth", auth);
  //app.use(bodyParser.json());

  var User = require('./app/models/user');

  passport.use(new twitchStrategy({
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/twitch/callback",
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
    next();
  });

  app.get("/", (req, res) => {
    if (req.user) {
      res.redirect("/portal");
    }else{
      res.render("index", {
        defaults: res.locals
      });
    }
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
