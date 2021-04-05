const withPlugins = require('next-compose-plugins')
const withAntdLess = require('next-plugin-antd-less')
const withBundleAnalyzer = require('@next/bundle-analyzer')
const path = require('path')

module.exports = withPlugins(
  [
    // [withLess()],
    [withAntdLess({
      // modifyVars: { '@primary-color': '#521122' },
      lessVarsFilePath: './src/styles/antd-custom.less',
      cssLoaderOptions: {
        esModule: false,
        sourceMap: false,
        modules: {
          mode: 'local',
        },
      },
      webpack(config) {
        return config
      },
    })],    
    [withBundleAnalyzer({
      enabled: process.env.ANALYZE === 'true',
      // enabled: true,
    })]
  ],
  {
    // async redirects() {
    //   return [
    //     {
    //       source: '/',
    //       destination: '/home',
    //       permanent: true,
    //     },
    //   ]
    // },
  })
