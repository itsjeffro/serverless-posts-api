const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: {
    posts: './src/handlers/posts',
    authorizer: './src/handlers/authorizer',
    migrations: './src/handlers/migrations'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },

  target: 'node',

  externals: [
    nodeExternals(),
  ]

};