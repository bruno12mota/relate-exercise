/* eslint-disable */
var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './lib/server/index.js',
  output: {
    path: path.join(__dirname, '..', '..', 'build'),
    filename: 'index.js'
  },
  resolve: {
    modulesDirectories: ['shared', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.json']
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],
  target: 'node',
  node: { // webpack strangely doesn't do this when you set `target: 'node'`
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-decorators-legacy', ['react-transform', {
            transforms: [
              {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react']
              }
            ]
          }]]
        }
      },
      {
        test: /\.(css|less)$/,
        loader: 'null-loader'
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'null-loader'
      }
    ]
  }
};
