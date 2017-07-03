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
  packageInfo = require("./package.json"),
  express = require("express"),
  bodyParser = require("body-parser"),
  hbs = require("hbs"),
  app = express(),
  http = require("http"),
  server = http.createServer(app),
  passport = require("passport"),
  twitchStrategy = require("passport-twitch").Strategy;

  passport.use(new twitchStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "http://localhost:3000/auth/twitch/callback",
    scope: "user_read"
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
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

  app.use(compression());
  app.set("view engine", "hbs");
  app.set("views", path.resolve(__dirname, "app/views"));

  app.use("/app/dist", express.static(path.resolve(__dirname, "app/dist")));

  app.use(bodyParser.json());

  hbs.registerPartials(path.resolve(__dirname,"app/views/partials"));
  hbs.registerHelper("currentYear", () => {
    return new Date().getFullYear();
  });

  app.get("*", (req, res, next) => {
    // Set response locals here for usage across all get calls
    res.locals.title = app.locals.title;
    next();
  });

  app.get("/auth/twitch", passport.authenticate("twitch"));
  app.get("/auth/twitch/callback", passport.authenticate("twitch", { failureRedirect: "/" }), (req, res) => {
    // Successful authentication, redirect home.
    console.log("Hello World!");
    res.redirect("/");
});

  app.get("/", (req,res) => {
    res.render("index", {
      defaults: res.locals,
      container: "container-fluid"
    });
  });

  server.listen(port, () => {
    console.log(`${app.locals.title} is listening on port ${port}`);
  });
});
