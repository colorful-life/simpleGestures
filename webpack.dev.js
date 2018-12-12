const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {

  mode: 'production',

  module: {
    rules: [{
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader',

      options: {
        plugins: ['syntax-dynamic-import'],

        presets: [['env', {
          'modules': false,
        }]],
      },

      test: /\.js$/,
    }, {
      test: /\.(scss|css)$/,

      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }, {
        loader: 'sass-loader',
      }],
    }],
  },

  entry: {
    handler: './src/js/app/content/handler',
    background: './src/js/app/background/background',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js'),
  },

  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true,
    },
  },

  plugins: [
    new CopyWebpackPlugin([
          {
            from: path.join(__dirname, 'src', 'manifest.json'),
            to: path.join(__dirname, 'dist'),
          },
     ]),
      new CopyWebpackPlugin(
          [
              {
                  from: '',
                  to: path.join(__dirname, 'dist/img/'),
              },
          ],
          {
              context: 'src/img',
          },
      ),
      new CopyWebpackPlugin(
          [
              {
                  from: '',
                  to: path.join(__dirname, 'dist/html/'),
              },
          ],
          {
              context: 'src/html',
          },
      ),
      new CopyWebpackPlugin(
          [
              {
                  from: '',
                  to: path.join(__dirname, 'dist/css/'),
              },
          ],
          {
              context: 'src/css',
          },
      ),
      new CopyWebpackPlugin(
          [
              {
                  from: '',
                  to: path.join(__dirname, 'dist/js/'),
              },
          ],
          {
              context: 'src/js',
          },
      ),
  ],
};