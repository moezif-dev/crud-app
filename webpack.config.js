const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dev = process.env.NODE_ENV !== 'production';

const htmlMinConfig = {
  removeComments: true,
  collapseWhitespace: true,
  ignoreCustomFragments: [/\{\{[\s\S]*?\}\}/]
};

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'main.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          cacheDirectory: true,
        }
      }
    }, {
      test: [/\.css$/, /\.scss$/],
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: dev,
        }
      }, {
        loader: 'css-loader',
      }, {
        loader: 'sass-loader',
      }, {
        loader: 'postcss-loader',
        options: { plugins: () => [require('autoprefixer')] }
      }]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: dev ? '[name].css' : '[name].[hash].css',
    }),
    new HtmlWebpackPlugin({
      // load a custom HTML template
      template: './client/index.html',
      minify: htmlMinConfig,
    }),
  ],
  devServer: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
}