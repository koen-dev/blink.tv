var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "app/src/js/App.jsx"),
    followeralert: path.resolve(__dirname, "app/src/js/Widgets/FollowerAlert.jsx"),
    vendor: ["react", "react-dom", "moment", "prop-types"]
  },
  output: {
    path: path.resolve(__dirname, "app/dist"),
    filename: '[name].js',
    publicPath: '/app/dist/'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      },{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: "css-loader",
            options: {
              minimize: true
            }
          },{
            loader: "sass-loader",
            options: {
              minimize: true
            }
          }],
        })
      },{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader",
            options: {
              minimize: true
            }
          }]
        })
      }, {
        test: /\.(eot|svg|ttf|woff|woff2|jpg)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ]
};
