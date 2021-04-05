import {useState, useEffect} from 'react'
import {Provider} from 'next-auth/client'
import {useRouter} from 'next/router'

import LayoutWrapper from '../components/layouts'
import {TopProgress} from '../components/elements'

import '../styles/global.less'
import '../styles/slick.less'

const AppError = ({Component, pageProps}) => {
  const {session} = pageProps
  const router = useRouter()

  useEffect(() => {
    console.log(pageProps)
  }, [])
  
  return (
    <Provider session={session}>
      <TopProgress barColor={router.pathname.split('/')[1] === 'user' && '#ffcb04'} />
      <LayoutWrapper {...pageProps}>
        <h1>Error</h1>
        <Component {...pageProps}/>
      </LayoutWrapper>
    </Provider>
  )
}

export default AppError
