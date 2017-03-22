const webpackMerge = require('webpack-merge'),
      commonConfig = require('./webpack.config.js'),
      path = require('path')

module.exports = function(env) {
  return webpackMerge(commonConfig(), {
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash].js'
    },
    devtool: 'cheap-module-source-map'
  })
}
