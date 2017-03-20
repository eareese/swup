let path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')

let commonModule = {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    },
    {
      test: /\.pug$/,
      use: 'pug-loader'
    }
  ]
}

let commonPlugins = [
  new HtmlWebpackPlugin({
    template: '!!pug-loader!src/index.pug'
  }),
  new ExtractTextPlugin('styles.css'),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  }),
  new ServiceWorkerWebpackPlugin({
    entry: path.resolve(__dirname, 'src/serviceworker.js'),
    myOpt: 'whatever'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest']
  })
]

module.exports = function() {
  return {
    target: 'web',

    entry: {
      'main': './src/app.js',
      'vendor': 'jquery'
    },

    module: commonModule,

    plugins: commonPlugins
  }
}
