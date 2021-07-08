import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Affix, Layout} from 'antd'
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons'

import TopRightMenu from './topRightMenu'
import styles from './header.less'
import logo from '../assets/logo/logo.svg'

class Header extends Component {
  render() {
    const {collapsed, toggle, isMobile, history} = this.props

    return (
      <Affix offsetTop={0.1}>
        <Layout.Header className={styles.container}>
          <div className={styles.header}>
            {isMobile ? (
              <Link to='/' className={styles.logo} key='logo'>
                <img src={logo} alt='logo'/>
              </Link>
            ) : null}
            <TopRightMenu history={history}/>
            <span className={styles.trigger} onClick={toggle}>
              {
                collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>
              }
            </span>
          </div>
        </Layout.Header>
      </Affix>
    )
  }
}

export default Header
