import React from 'react'
import {Trans} from 'react-i18next'

const Home = () => {
  const {t} = this.props

  return (
    <div style={{border: 'solid 1px', height: '900px'}}>
      <h2>Home</h2>
      <h1>
        {t('common.test')} <br/>
        <Trans>common.test</Trans>
      </h1>
    </div>
  )
}

export default Home
