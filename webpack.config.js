const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  },
  performance: {
    hints: false
  },
  module: {
    rules: [{
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader',
      ],
    }, ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new Dotenv(),
  ]
};