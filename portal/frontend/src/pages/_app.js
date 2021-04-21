
import {Provider} from 'mobx-react'

import LayoutWrapper from '../components/layouts'
import {TopProgress} from '../components/elements'

import store from '../common/stores/root'

import '../styles/global.css'
import '../styles/slick.css'

const MyApp = ({Component, pageProps}) => { 

  return (
    <Provider {...store}>
      <TopProgress />
      <LayoutWrapper {...pageProps}>
        <Component {...pageProps}/>
      </LayoutWrapper>
    </Provider>
  )
}

export default MyApp
