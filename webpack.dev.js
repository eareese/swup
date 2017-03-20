const webpackMerge = require('webpack-merge'),
      commonConfig = require('./webpack.config.js'),
      path = require('path')

module.exports = function(env) {
  return webpackMerge(commonConfig(), {
    output: {
      filename: '[name].js',
      sourceMapFilename: '[name].map'
    },
    devtool: 'cheap-module-source-map',
  })
}
