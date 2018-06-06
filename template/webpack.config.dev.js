'use strict';

const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  mode: NODE_ENV,

  devtool: 'cheap-module-eval-source-map',

  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './assets/main.jsx',
  ],

  output: {
    path: path.join(__dirname, '/public/dist/'),
    filename: 'bundle.js',
    pathinfo: true,
    publicPath: 'http://localhost:8080/dist/',
  },

  resolve: {
    modules: [__dirname, 'node_modules'],
    alias:{
      assets: 'assets',
      styles:'assets/styles',
      components: 'assets/components/'
    },
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __ENV__: NODE_ENV,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.scss$/, // sass files
        use: [
          {loader: 'style-loader'}, {loader: 'css-loader?sourceMap'}, {loader: 'sass-loader?sourceMap'}
        ],
      },
      {
        test: /\.(ttf|eot|svg|woff)(\?[a-z0-9]+)?$/, // fonts files
        use: [{loader: 'file-loader?name=[path][name].[ext]'}],
      },
      {
        test: /\.jsx?$/, // react files
        exclude: /node_modules/,
        use: [{loader:'babel-loader'}],
        include: path.join(__dirname, 'assets'),
      },
    ],

    noParse: /\.min\.js/,
  },
};
