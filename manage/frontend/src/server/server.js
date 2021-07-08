import path from 'path'
import express from 'express'
import compression from 'compression'
//import webpack from 'webpack'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
// import { createMemoryHistory } from 'history'
import {Provider} from 'mobx-react'
import {I18nextProvider} from 'react-i18next'
import {LanguageDetector, handle} from 'i18next-express-middleware'
// const i18nextMiddleware = require('i18next-express-middleware')
import Backend from 'i18next-node-fs-backend'
import i18n from 'i18next'

import Html from '../client/html'
import Routes from '../config/routes'
import {getContextPath} from '../config/context-path'
import RootStore from '../common/stores/root'
import {i18nOptionsServer} from '../common/i18nOptions'
//import configDev from '../config/webpack-dev-config'

/*const isObject = require('is-object')
function normalizeAssets(assets) {
  if (isObject(assets)) {
    return Object.values(assets)
  }

  return Array.isArray(assets) ? assets : [assets]
}*/

const app = express()
app.disable('x-powered-by')
app.use(compression())

/*if (process.env.NODE_ENV === 'development') {
  console.log('setting up dev and hot reload middlewares...')
  const compiler = webpack(configDev)
  app.use(require('webpack-dev-middleware')(compiler, {
    //publicPath: configDev.output.publicPath,
    publicPath: '/',
    serverSideRender: true,
    index: false
  }))
  // app.use(require('webpack-hot-middleware')(compiler))
}*/

// service workers
app.get(getContextPath() + '/static/register-service-worker.js', function(req, res) {
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Cache-Control', 'max-age=0')
  res.sendFile(path.resolve(__dirname, '../client/register-service-worker.js'))
})
app.get(getContextPath() + '/service-worker.js', function(req, res) {
  //res.setHeader('Service-Worker-Allowed', '/')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Cache-Control', 'max-age=0')
  res.setHeader('Content-Type', 'application/javascript')
  res.sendFile(path.resolve(__dirname, '../client/service-worker.js'))
})
app.get(/^\/workbox-.*(.)js/, function(req, res) {
  //res.setHeader('Service-Worker-Allowed', '/')
  // res.set('Content-Type', 'application/javascript')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Cache-Control', 'max-age=0')
  res.setHeader('Content-Type', 'application/javascript')
  res.sendFile(path.resolve(__dirname, '../client' + req.url))
})

// config
app.get(getContextPath() + '/static/config.js', function (req, res) {
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Cache-Control', 'max-age=0')
  res.setHeader('Content-Type', 'application/javascript')
  res.sendFile(path.resolve(__dirname, '../client/config.js'))
})

// app.use(express.static(path.join(__dirname, 'build')))
console.log(`Serving static files from: ${path.resolve(__dirname, '../client')}`)
app.use(getContextPath() + '/static', express.static(path.resolve(__dirname, '../client'), {
  setHeaders(res, resPath) {
    //res.setHeader('Service-Worker-Allowed', '/')
    res.setHeader('Pragma', 'public')
    res.setHeader('Cache-Control', 'max-age=2592000, public')
  }
}))

// const router = express.Router()
// const history = createMemoryHistory()

// LOCALE
const localePath = path.resolve(__dirname, '../common/locales')
console.log('Serving locale from: ' + localePath)
app.use(getContextPath() + '/locales', express.static(localePath))
i18n
  .use(Backend)
  .use(LanguageDetector)
  .init(Object.assign(i18nOptionsServer, {
    backend: {
      loadPath: `${localePath}/{{lng}}/{{ns}}.json`
      // addPath: `${localePath}/{{lng}}/{{ns}}.missing.json`,
    }
  }))
app.use(handle(i18n))

// MAIN
app.get(getContextPath() + '*', function(req, res) {
  // res.header('SameSite', 'Strict')
  // console.log(req.i18n)
  /*const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName
  const fs = res.locals.fs
  const outputPath = res.locals.webpackStats.toJson().outputPath
  console.log(normalizeAssets(assetsByChunkName.main)
    .filter((path) => path.endsWith('.css'))
    .map((path) => fs.readFileSync(outputPath + '/' + path))
    .join('\n'))
  console.log(normalizeAssets(assetsByChunkName.main)
    .filter((path) => path.endsWith('.js'))
    .map((path) => `<script src="${path}"></script>`)
    .join('\n'))*/

  const initialStates = {
    // authStore: { status: true }
  }
  const rootStore = new RootStore(initialStates)
  const context = {}

  // let insertCss = () => {}
  // if (process.env.NODE_ENV === 'development') {
  //   const css = new Set() // CSS for all rendered React components
  //   insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))
  // }

  const component = ReactDOMServer.renderToString(
    //<Router location={req.url} context={context} history={history}>
    <Provider {...rootStore.getStores()}>
      <I18nextProvider i18n={req.i18n}>
        {/*<StyleContext.Provider value={{insertCss}}>*/}
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(Routes)}
        </StaticRouter>
        {/*</StyleContext.Provider>*/}
      </I18nextProvider>
    </Provider>
  )

  if (context.url) {
    res.writeHead(301, {Location: context.url})
    res.end()
  } else {
    const initialI18nStore = {}
    req.i18n.languages.forEach(l => {
      initialI18nStore[l] = req.i18n.services.resourceStore.data[l]
    })
    res.send(Html(getContextPath(), 'Astvision Starter', initialStates,
      initialI18nStore, req.i18n.language, component))

    //res.send(Html('Astvision Starter', initialStates, component))
  }
})

// app.use('/*', router)

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express is listening on port ' + port + ' with: ' + process.env.NODE_ENV)
