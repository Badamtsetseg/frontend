const path = require('path')
const fs = require('fs')

// const webpack = require('webpack')
const {merge} = require('webpack-merge')
const lessToJS = require('less-vars-to-js')

// import common webpack config
const commonServerConfig = require('./webpack-common-server-config.js')
const commonClientConfig = require('./webpack-common-client-config.js')

const themeVariables = lessToJS(
  fs.readFileSync(path.join(__dirname, '../../src/client/ant-theme-vars.less'), 'utf8')
)

const serverConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          // 'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              //import: true,
              importLoaders: 1,
              modules: {
                getLocalIdent: (loaderContext, localIdentName, localName, options) => {
                  if (loaderContext.resourcePath.includes('node_modules')) {
                    return localName
                  } else {
                    const fileName = path.basename(loaderContext.resourcePath)
                    const name = fileName.replace(/\.[^/.]+$/, '')
                    if (name === 'global') {
                      return localName
                    }
                    return `${name}__${localName}`
                  }
                }
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: themeVariables
              }
            }
          }
        ]
      },
      // {
      //   test: /\.css/,
      //   use: [
      //     // 'isomorphic-style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 1,
      //         modules: true
      //       }
      //     }
      //   ]
      // }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../../build/server'),
    filename: '[name]'
  }
}

const clientConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          // 'isomorphic-style-loader',
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              //import: true,
              importLoaders: 1,
              modules: {
                getLocalIdent: (loaderContext, localIdentName, localName, options) => {
                  if (loaderContext.resourcePath.includes('node_modules')) {
                    return localName
                  } else {
                    const fileName = path.basename(loaderContext.resourcePath)
                    const name = fileName.replace(/\.[^/.]+$/, '')
                    if (name === 'global') {
                      return localName
                    }
                    return `${name}__${localName}`
                  }
                }
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: themeVariables
              }
            }
          }
        ]
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     //'isomorphic-style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 1,
      //         modules: true
      //       }
      //     }
      //   ]
      // }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  output: {
    path: path.resolve(__dirname, '../../build/client'),
    filename: '[name]'
  }
}

module.exports = [merge(commonServerConfig, serverConfig), merge(commonClientConfig, clientConfig)]

// module.exports = merge(common, {
//   entry: [paths.appIndexJs],
//   mode: 'development',
//   // devtool: 'eval',
//   plugins: [
//     // new webpack.HotModuleReplacementPlugin(),
//     new webpack.NamedModulesPlugin(),
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: JSON.stringify('development')
//       }
//     })
//   ],
//   module: {
//     rules: rules
//   }
// })
