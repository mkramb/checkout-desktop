const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const config = {
  target: 'electron-main',
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/index'),
  },
  externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs2',
    filename: 'main.js',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$|\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
};

if (process.env.NODE_ENV === 'production') {
  config.mode = 'production';
}

module.exports = config;
