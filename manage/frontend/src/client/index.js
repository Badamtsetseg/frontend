import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import {reaction} from 'mobx'
import {Provider} from 'mobx-react'
import {I18nextProvider} from 'react-i18next'
// import {useSSR} from 'react-i18next'
// import StyleContext from 'isomorphic-style-loader/StyleContext'

// import registerServiceWorker from '../serviceWorker/register'
import {getContextPath} from '../config/context-path'
import i18n from '../common/i18n'
import Routes from '../config/routes'
import RootStore from '../common/stores/root'
import PageLoading from './components/pageLoading'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
// import globalStyles from './global.less'
import './global.less'

const rootStore = new RootStore(window.__INITIAL_STATE__)

reaction(
  () => {
    // return i18n.language
    return rootStore.langStore.locale
  },
  locale => {
    i18n.changeLanguage(locale)
    rootStore.langStore.setLocale(locale)
    // localStorage.setItem('i18nextLng', locale)
    // document.cookie = `i18next=${locale}`
  }
)

// console.log('Running in client: ' + process.env.NODE_ENV)
// let insertCss = () => { }
// if (process.env.NODE_ENV === 'development') {
//   insertCss = (...styles) => {
//     const removeCss = styles.map(style => style._insertCss())
//     return () => removeCss.forEach(dispose => dispose())
//   }
//   // insertCss(globalStyles)
// }

// insertCss(globalStyles)

// useSSR(window.initialI18nStore, window.initialLanguage)
// const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
const contextPath = getContextPath()
ReactDOM.hydrate(
  <Suspense fallback={<PageLoading />}>
    <Provider {...rootStore.getStores()}>
      <I18nextProvider i18n={i18n}>
        {/*<StyleContext.Provider value={{insertCss}}>*/}
        <Router basename={contextPath}>
          <ScrollToTop>
            {renderRoutes(Routes)}
          </ScrollToTop>
        </Router>
        {/*</StyleContext.Provider>*/}
      </I18nextProvider>
    </Provider>
  </Suspense>,
  document.getElementById('root')
)

// registerServiceWorker()

// TODO Webpack Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./App', () => {
//     // if you are using harmony modules ({modules:false})
//     render(App)
//   })
// }
