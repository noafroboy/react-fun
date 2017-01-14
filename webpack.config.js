var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['bootstrap-loader', './main.js'],
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
};
