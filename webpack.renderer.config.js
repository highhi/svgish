const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  target: 'electron-renderer',

  mode: ENV,

  entry: {
    renderer: './src/renderer/index.tsx',
  },

  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist', 'renderer')
  },

  resolve: {
    extensions: ['.mjs', '.web.ts', '.ts', '.web.tsx', '.tsx', '.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      "~": path.resolve(__dirname, 'src', 'renderer'),
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: path.resolve(__dirname, 'tsconfig.renderer.json'),
          }
        },
        exclude: /node_modlues/,
      },
    ]
  },

  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },

  plugins: [
    new CleanWebpackPlugin(['dist/renderer']),
    new HtmlWebpackPlugin({
      inject: false,
      title: 'Svgish',
      template: './templates/index.html',
      filename: path.resolve(__dirname, 'index.html'),
    })
  ]
};