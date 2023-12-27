/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const isProduction = process.env.NODE_ENV == 'production'

const config = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './public' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/i,
        exclude: /(node_modules)/,
        use: ['swc-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },
}

const prodConfig = {
  mode: 'production',
  output: {
    publicPath: './',
  },
  plugins: [
    new CompressionPlugin(),
  ],
}

const devConfig = {
  mode: 'development',
  devServer: {
    // open: true,
    host: 'localhost',
    port: 3000,
  },
  plugins: [
    new ReactRefreshPlugin(),
  ],
}

module.exports = () => merge(config, isProduction ? prodConfig : devConfig)