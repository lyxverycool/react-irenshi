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
    port: 8088
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
      { test: /\.css$/, include: path.resolve(__dirname, 'app'), loader: 'style-loader!css-loader' },
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(png|jpg|svg)$/,include: path.resolve(__dirname, 'app'),loader: 'url-loader'},
      { test:/\.(scss|sass)$/,include: path.resolve(__dirname, 'app'),loader:'style-loader!css-loader!sass-loader'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:8088' })
  ]
};