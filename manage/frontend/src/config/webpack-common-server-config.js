const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const {getContextPath} = require('./context-path')

module.exports = {
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  entry: {
    'server.js': path.resolve(__dirname, '../server/server.js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_TARGET: JSON.stringify('node')
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-US/),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react']
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
              publicPath: `${getContextPath()}/static/assets`
            },
          }
        ]
      },
      // {
      //   test: /\.(woff|woff2|eot|ttf)$/,
      //   loader: 'url-loader?limit=100000'
      // }
    ]
  }
}
