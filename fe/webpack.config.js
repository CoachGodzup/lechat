// https://medium.com/jeremy-gottfrieds-tech-blog/tutorial-how-to-build-a-webpack-app-with-vanilla-js-or-react-72ca2cc7e14
// https://webpack.js.org/guides/typescript/
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
// const HtmlLoader = require('html-loader');

module.exports = {
  mode: 'development',
  entry: [
    './src/index.js'
  ],
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {minimize: true}
      }]
    }, {
      test: /\.s[ac]ss$/,
      use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader',
      ]
    }, {
      test: /\.ts?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }]
  },
  devServer: {
    contentBase: require('path').join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
}