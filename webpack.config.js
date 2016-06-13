var Webpack = require('webpack');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
  entry: './src/app.js',
  output: {
    path: './bin',
    filename: 'app.bundle.js'
  },
  devtool: 'source-map',
  target: 'node',
  plugins: [
    new WebpackBuildNotifierPlugin(),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query:
        {
          compact: false,
          presets:['es2015']
        }
      }
    ]
  }
};