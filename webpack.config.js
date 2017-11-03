const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const cssExtractor = new ExtractTextPlugin('./[name].css');
module.exports = {
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './app',
    port: 8088,
    proxy: {
      '/weixin': {
        target: 'http://192.168.2.121:8080',
        changeOrigin: true
      }
    }
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8088',
    path.resolve(__dirname, 'app/main.jsx')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(png|jpg|svg)$/,include: path.resolve(__dirname, 'app'),loader: 'url-loader'},
      { test: /\.scss$/i, include: path.resolve(__dirname, 'app'),loader: cssExtractor.extract(['css','sass'])},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    cssExtractor,
    new OpenBrowserPlugin({ url: 'http://localhost:8088' })
  ]
};