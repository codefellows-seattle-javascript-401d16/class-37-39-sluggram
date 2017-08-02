'use strict';

require('dotenv').config();
const production = process.env.NODE_ENV === 'production';

const {DefinePlugin, EnvironmentPlugin} = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');

let plugins = [
  new EnvironmentPlugin(['NODE_ENV']),
  new ExtractPlugin('bundle-[hash].css'),
  new HTMLPlugin({template: `${__dirname}/src/index.html`}),
  new DefinePlugin({
    __DEBUG__: JSON.stringify(!production),
    __API_URL__: JSON.stringify(process.env.API_URL),
  }),
];

if (production)
  plugins = plugins.concat([ new CleanPlugin(), new UglifyPlugin() ]);

module.exports = {
  plugins,
  entry: `${__dirname}/src/main.js`,
  devServer: { historyApiFallback: true },
  devtool: production ? undefined : 'cheap-module-eval-source-map',
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle-[hash].js',
    publicPath: process.env.CDN_URL,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract(['css-loader', 'sass-loader']),
      },
    ],
  },
};
