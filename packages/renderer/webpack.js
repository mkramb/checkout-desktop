const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

const config = {
  target: 'electron-renderer',
  mode: 'development',
  entry: {
    renderer: [path.resolve(__dirname, 'src/index')],
  },
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
  },
  output: {
    filename: 'renderer.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$|\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.mode = 'production';
}

module.exports = config;
