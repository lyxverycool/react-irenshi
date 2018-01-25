const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const cssExtractor = new ExtractTextPlugin('./[name].css');
module.exports = {
  devtool: 'cheap-source-map',
  entry: {
    main: [
      path.resolve(__dirname, 'app/main.jsx')
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'redux',
      'redux-thunk'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: './',
    productionSourceMap: false,
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].chunk.[chunkhash:8].js'
  },
  module: {
    loaders: [
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(png|jpg|svg)$/, include: path.resolve(__dirname, 'app'), loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]' },
      { test: /\.scss$/i, include: path.resolve(__dirname, 'app'), loader: cssExtractor.extract(['css', 'sass']) },
      { test: /\.html$/, loader: 'html-withimg-loader' }
    ]
  },
  //忽略项
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    //sass转css
    cssExtractor,
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[chunkhash:8].js'),
    //压缩代码
    new uglifyJsPlugin({
      compress: {
        warnings: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    //生成html
    new HtmlWebpackPlugin({
      path: path.resolve(__dirname, 'build'),
      publicPath: './',
      filename: './index.html',
      template: path.resolve(__dirname, 'app/template/index.html'),
      hash: true,
      //为静态资源生成hash
    })
  ]
};
