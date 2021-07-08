const path = require('path')
const fs = require('fs')

const webpack = require('webpack')
const {merge} = require('webpack-merge')
const lessToJS = require('less-vars-to-js')

// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// import common webpack config
const commonServerConfig = require('./webpack-common-server-config.js')
const commonClientConfig = require('./webpack-common-client-config.js')

const themeVariables = lessToJS(
  fs.readFileSync(path.join(__dirname, '../../src/client/ant-theme-vars.less'), 'utf8')
)

const serverConfig = {
  mode: 'production',
  plugins: [
    // Set process.env.NODE_ENV to production
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // Extract text/(s)css from a bundle, or bundles, into a separate file.
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
      chunkFilename: 'assets/[name].css'
    }),
    // new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          //'isomorphic-style-loader',
          {
            loader: MiniCssExtractPlugin.loader
          },
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
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../../dist/server'),
    filename: '[name]'
  }
}

const clientConfig = {
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        {from: 'src/config/config_prod.js', to: '../client/config.js', force: true}, // copy config
        {from: 'src/client/assets/og_image.jpg', to: 'assets/og_image.jpg'},
        {from: 'src/client/assets/favicon.png', to: 'assets/favicon.png'},
        {from: 'src/client/assets/logo/logo.png', to: 'assets/logo.png'},
        {from: 'src/client/assets/sitemap.xml', to: 'assets/sitemap.xml'}
      ]
    }),
    // new CleanWebpackPlugin(),
    // Set process.env.NODE_ENV to production
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // Extract text/(s)css from a bundle, or bundles, into a separate file.
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
      chunkFilename: 'assets/[name].css'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          //'isomorphic-style-loader',
          {
            loader: MiniCssExtractPlugin.loader
          },
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
              //sourceMap: true // slows build
            }
          },
          {
            loader: 'less-loader',
            options: {
              // sourceMap: true, // slows build
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
      //     // {
      //     //   loader: MiniCssExtractPlugin.loader
      //     // },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 1,
      //         sourceMap: true,
      //         modules: true
      //       }
      //     }
      //   ]
      // }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: true,
        terserOptions: {
          extractComments: 'all',
          compress: {
            drop_console: true,
          },
        }
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          // safe: true,
          discardComments: {
            removeAll: true
          }
        }
      })
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  output: {
    path: path.resolve(__dirname, '../../dist/client'),
    filename: '[name]',
    publicPath: '/'
  }
}

module.exports = [merge(commonServerConfig, serverConfig), merge(commonClientConfig, clientConfig)]
