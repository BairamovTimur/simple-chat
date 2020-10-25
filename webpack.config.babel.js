// @ts-check

import path from 'path';
// import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  devtool: 'source-map',
  mode: process.env.NODE_ENV || 'development',
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist/public`,
  },
  // entry: {
  //  app: './src/index.js',
  // },
  devServer: {
    contentBase: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
    contentBasePublicPath: '/assets/',
    compress: true,
    // hot: true,
  },
  plugins: [
    // new MiniCssExtractPlugin(),
    // new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //  template: 'index.html',
    //  title: 'Hot Module Replacement',
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
