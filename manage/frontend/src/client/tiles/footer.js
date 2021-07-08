import React from 'react'
import {Layout} from 'antd'

const Footer = () => {
  return <Layout.Footer style={{textAlign: 'center'}}>
    ©2021 POWERED LLC, @{typeof (window) !== 'undefined' && window.APP_VERSION}
  </Layout.Footer>
}

export default Footer
