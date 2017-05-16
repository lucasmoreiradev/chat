'use strict'

const path = require('path')
const webpack = require('webpack')

let devtool

const entryPoints = [ path.join(__dirname, 'client', 'main.js') ]
const plugins = [
  new webpack.DefinePlugin({
    __PROD__: process.env.NODE_ENV === 'production'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    chunks: ['main'],
    minChunks: module => /node_modules/.test(module.resource)
  }),
  new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)@angular/,
    './client',
    {}
  )
]

if (process.env.NODE_ENV !== 'production') {
  entryPoints.push('webpack-hot-middleware/client')
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  devtool = 'eval'
} else {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
  devtool = false
}

module.exports = {
  entry: {
    main: entryPoints,
    vendor: ['core-js', 'zone.js/dist/zone']
  },
  devtool: devtool,
  output: {
    path: path.resolve(__dirname, 'public', 'js'),
    publicPath: '/js',
    filename: '[name].bundle.js'
  },
  resolve: {
    modules: [ 'node_modules', path.resolve(__dirname, 'public', 'js') ],
    extensions: [ '.ts', '.js', '.json' ]
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'awesome-typescript-loader' }
        ]
      },
      { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, use: 'file-loader' },
      { test: /\.html$/, use: 'raw-loader' },
      { test: /\.scss$/, use: [ 'style-loader?singleton=true', 'css-loader', 'sass-loader' ] },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]
  },
  plugins: plugins
}
