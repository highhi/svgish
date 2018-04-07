const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const IS_DEV = 'development';
const OUTPUT_FILENAME = '[name].[chunkhash].js'

module.exports = {
  target: 'electron-renderer',

  entry: {
    index: './src/index.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      { test: /\.js?$/, use: 'babel-loader', exclude: /node_modeules/ },
      {
        test: /\.css$/, 
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
              module: true,
            },
          }],
        })
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: (module) => {
        return module.context && module.context.includes("node_modules");
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    new ExtractTextPlugin({
      filename: "style.css",
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'index.html'),
      template: path.resolve(__dirname, 'src', 'templates', 'index.html'),
      inject: false,
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
};