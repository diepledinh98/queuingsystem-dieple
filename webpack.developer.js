console.log('development');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const devServer = {
  port: 4321,
  open: true,
  historyApiFallback: {
    verbose: true,
  },
  compress: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  hot: true,
  static: {
    publicPath: '/',
  },
  watchFiles: ['src/**/*.(tsx|ts|css|scss)', 'public/**/*'],
};
const config = {
  mode: 'development', //production,development
  devtool: 'source-map', //cheap-module-source-map
  devServer,
  plugins: [new Dotenv({ path: './.env.development' })],
};
module.exports = merge(common, config);
