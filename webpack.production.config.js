const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const cssExtractor = new ExtractTextPlugin('./[name].css');
module.exports = {
  devtool: 'cheap-source-map',
  entry: [
    path.resolve(__dirname, 'app/main.jsx')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: './',
    productionSourceMap:false,
    filename: './bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.(png|jpg|svg)$/,include: path.resolve(__dirname, 'app'),loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'},
      { test: /\.scss$/i, include: path.resolve(__dirname, 'app'),loader: cssExtractor.extract(['css','sass'])},
      { test: /\.html$/,loader: 'html-withimg-loader'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    cssExtractor,
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([
      { from: './app/index.html', to: 'index.html' },
      { from: './app/favicon.ico',to:'favicon.ico'}
    ])
  ]
};
