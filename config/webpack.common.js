const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlPages = require('./webpack.pages.js')

module.exports = {
  entry: {
    index: './src/assets/javascripts/index.js',
    poster1: './src/assets/javascripts/poster1.js',
    poster2: './src/assets/javascripts/poster2.js',
    poster3: './src/assets/javascripts/poster3.js',
    poster4: './src/assets/javascripts/poster4.js',
    poster5: './src/assets/javascripts/poster5.js',
    poster6: './src/assets/javascripts/poster6.js',
    poster7: './src/assets/javascripts/poster7.js',
    poster8: './src/assets/javascripts/poster8.js',
    poster9: './src/assets/javascripts/poster9.js',
    poster10: './src/assets/javascripts/poster10.js'
  },
  output: {
    path: path.resolve('.', 'docs'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|svg|webp|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      }
    ]
  },
  plugins: [...htmlPages, new MiniCssExtractPlugin()]
}
