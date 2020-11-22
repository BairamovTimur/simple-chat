// @ts-check
import path from 'path';
import Dotenv from 'dotenv-webpack';

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

  devServer: {
    contentBase: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
    contentBasePublicPath: '/assets/',
    compress: true,
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: true,
    }),
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
