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
  server          = http.createServer(app);

  // DB Connection
  mongoose.connect(process.env.MONGODB_URL, { useMongoClien: true });

  // Middlewares
  app.use("/app/dist", express.static(path.resolve(__dirname, "app/dist")));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
  require("./passport")(app);

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

  // Setup View Engine
  app.set("view engine", "hbs");
  app.set("views", path.resolve(__dirname, "app/views"));
  hbs.registerPartials(path.resolve(__dirname,"app/views/partials"));

  // Set response locals
  app.use((req, res, next) => {
    res.locals.title = app.locals.title;
    res.locals.isLoggedIn = (req.isAuthenticated()) ? true : false;
    next();
  });

  // Routers
  app.use("/", require("./app/routes/root"));
  app.use("/auth", require("./app/routes/auth"));
  app.use("/api", require("./app/routes/api"));

  server.listen(port, () => {
    console.log(`${app.locals.title} is listening on port ${port}`);
  });
});
