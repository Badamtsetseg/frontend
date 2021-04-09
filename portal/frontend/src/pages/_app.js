import {Provider} from 'next-auth/client'

import LayoutWrapper from '../components/layouts'
import {TopProgress} from '../components/elements'

import '../styles/global.css'
import '../styles/slick.css'

const MyApp = ({Component, pageProps}) => {
  const {session} = pageProps
  
  return (
    <Provider session={session}>
      <TopProgress />
      <LayoutWrapper {...pageProps}>
        <Component {...pageProps}/>
      </LayoutWrapper>
    </Provider>
  )
}

export default MyApp
