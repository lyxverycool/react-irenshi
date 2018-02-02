const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './app',
    port: 8087,
    proxy: {
      '/weixin/gateway': {
        target: 'http://192.168.2.188:5555',
        changeOrigin: true,
        pathRewrite: {
          '^/weixin/gateway': '/gateway'
        }
      },
      '/weixin/': {
        target: 'http://192.168.2.188:8087',
        changeOrigin: true
      },
      '/index/': {
        target: 'http://192.168.2.203:3000',
        changeOrigin: true
      }
    }
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8087',
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
      { test: /\.(png|jpg|svg)$/, include: path.resolve(__dirname, 'app'), loader: 'url-loader' },
      { test: /\.scss$/i, include: path.resolve(__dirname, 'app'), loader: 'style-loader!css-loader!sass-loader' },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:8087' })
  ]
};