const path = require('path')

const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest-contrib')

const {getContextPath} = require('./context-path')

module.exports = {
  target: 'web', // default is web
  entry: {
    'index.js': path.resolve(__dirname, '../client/index.js')
  },
  plugins: [
    /*new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      title: 'Astvision Starter Manage',
      favicon: './src/assets/favicon.png'
    }),*/
    // new WorkboxPlugin.GenerateSW({
    //   // swSrc: 'serviceWorker/service-worker.js',
    //   swDest: 'service-worker.js',
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   include: [/\.js$/, /\.css$/, /\.ico$/, /\.png$/, /\.svg$/, /\.xml$/],
    // }),
    // new InjectManifest({
    //   swSrc: 'src/serviceWorker/service-worker.js',
    // }),
    new CopyPlugin({
      patterns: [
        {from: 'src/config/config.js', to: '../client'}, // copy config
        {from: 'src/serviceWorker', to: '../client'}, // copy service workers
        {from: 'src/common/locales', to: '../common/locales'}, // copy service workers
        {from: 'src/client/assets/tinymce', to: '../client/tinymce'}, // copy tinymce
      ]
    }),
    new WorkboxPlugin.GenerateSW({
      cacheId: 'starter',
      clientsClaim: true,
      skipWaiting: true,
      cleanupOutdatedCaches: true,
      maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
      manifestTransforms: [
        (manifestEntries) => (
          {manifest: manifestEntries.map((entry) => {
            if (entry.url.startsWith('../client')) {
              entry.url = entry.url.replace('../client', '/static')
            } else if (entry.url.startsWith('/../client')) {
              entry.url = entry.url.replace('/../client', '/static')
            } else if (entry.url.startsWith('../common')) {
              entry.url = entry.url.replace('../common', '')
            } else if (entry.url.startsWith('/../common')) {
              entry.url = entry.url.replace('/../common', '')
            } else if (entry.url.startsWith('/')) {
              entry.url = '/static' + entry.url
            } else {
              entry.url = '/static/' + entry.url
            }
            return entry
          }), warnings: []}
        )
      ],

      // Do not precache images
      exclude: [
        /\.(?:png|jpg|jpeg|svg)$/,
        /\.map$/,
        /favicon\.ico$/,
        /config\.js$/,
        /^manifest.*\.js?$/
      ],
      runtimeCaching: [{
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'starter-images',
          expiration: {
            maxEntries: 20,
          },
        },
      }],
    }),
    new WebpackPwaManifest({
      filename: 'assets/manifest.json',
      publicPath: '/static',
      name: 'Astvision Starter',
      short_name: 'Astvision Starter',
      description: 'Astvision Starter',
      // crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve('src/client/assets/favicon.png'),
          sizes: [32, 64, 192, 512], // multiple sizes
          destination: 'assets'
        }
        /*,{
          src: path.resolve('src/assets/large-icon.png'),
          size: '1024x1024' // you can also use the specifications pattern
        }*/
      ],
      start_url: '/dashboard',
      display: 'standalone',
      theme_color: '#000000',
      background_color: '#ffffff'
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
            presets: ['@babel/react'],
            // plugins: [['import', { libraryName: 'antd', style: 'css' }]]
            plugins: [['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}]]
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets',
              //name: '[hash].[ext]',
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
  },
  resolve: {
    // File extensions. Add others and needed (e.g. scss, json)
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  }
}
