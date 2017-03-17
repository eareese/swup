let path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')


const webpackConfig = {
  target: 'web'
}

webpackConfig.entry = {
  app: './src/app.js'
}

webpackConfig.output = {
  path: path.resolve(__dirname, 'dist'),
  filename: '[chunkhash].bundle.js'
}

webpackConfig.plugins = [
  new ExtractTextPlugin('styles.css'),
  new HtmlWebpackPlugin({
    title: 'WebsiteGreatTitle',
    template: '!!pug-loader!src/index.pug'
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  }),
  new ServiceWorkerWebpackPlugin({
    entry: path.resolve(__dirname, 'src/serviceworker.js')
  })
]

webpackConfig.module = {
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
    }
  ]
}
// node: {
//   fs: 'empty'
// }

webpackConfig.devServer = {
  contentBase: 'src/'
}

module.exports = webpackConfig
