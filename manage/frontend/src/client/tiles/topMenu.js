import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Button, Menu} from 'antd'
import {inject, observer} from 'mobx-react'
import {action, observable} from 'mobx'
import classNames from 'classnames'
import {Trans, withTranslation} from 'react-i18next'

import DynamicIcon from '../components/DynamicIcon'
import styles from './topMenu.less'
import logo from '../assets/logo/logo.svg'
import i18n from '../../common/i18n'

const navTheme = 'light'

@withTranslation()
@inject('langStore')
@observer
class TopMenu extends Component {
  @observable currentPath = null

  @action
  setPath(path) {
    this.currentPath = path
  }
  componentWillMount() {
    const {history, history: {location: {pathname}}} = this.props
    this.setPath(pathname)

    history.listen((evt) => {
      this.setPath(pathname)
    })
  }

  setLocale(locale) {
    const {langStore} = this.props

    const newLocale = locale === 'en' ? 'mn' : 'en'
    langStore.setLocale(newLocale)
    // i18n.changeLanguage(newLocale)
  }

  render() {
    // const { history: { location: { pathname } } } = this.props
    const {isMobile} = this.props

    const menus = [
      {
        key: '/home',
        link: '/home',
        icon: 'HomeOutlined',
        title: 'menu.home'
      }, {
        key: '/aws-rekognition',
        link: '/aws-rekognition',
        icon: 'CarOutlined',
        title: 'menu.rental cars'
      }, {
        key: '/service/list',
        link: '/service/list',
        icon: 'TagsOutlined',
        title: 'menu.services'
      }, {
        key: '/promotion/list',
        link: '/promotion/list',
        icon: 'GiftOutlined',
        title: 'menu.promotion'
      }, {
        key: '/article/list',
        link: '/article/list',
        icon: 'FileTextOutlined',
        title: 'menu.news'
      }
    ]

    return (
      <div className='container' style={{display: isMobile ? 'none' : ''}}>
        <div className={classNames(styles.head, styles.light)}>
          <div className={styles.left}>
            <div className={styles.logo} key='logo' id='logo'>
              <Link to='/'>
                <img src={logo} alt='logo' />
                <h1>Astvision Starter</h1>
              </Link>
            </div>
          </div>
          <div className={styles.right}>
            <Button
              className={styles.lang}
              onClick={() => this.setLocale(i18n.language)}
            >
              {/* {i18n.language.toUpperCase()} */}
              <Trans>navbar.lang</Trans>
            </Button>
          </div>
        </div>
        <Menu
          mode='horizontal'
          theme={navTheme}
          // onClick={this.handleClick}
          // defaultOpenKeys={['sub1']} 
          // defaultSelectedKeys={[pathname]}
          selectedKeys={[this.currentPath]}
          className={styles.menu}
        >
          {menus.map((item, idx) => (
            <Menu.Item key={item.key}>
              <Link to={item.link}>
                <DynamicIcon type={item.icon}/>
                <span>
                  <Trans>{item.title}</Trans>
                </span>
              </Link>
              {/* {authStore.values.status === true ? (
              <Menu.SubMenu
                key='sub1'
                title={
                  <span>
                    <Icon type='user' />
                    subnav 1
                  </span>
                }
              >
                <Menu.Item key='1'>option1</Menu.Item>
                <Menu.Item key='2'>option2</Menu.Item>
                <Menu.Item key='3'>option3</Menu.Item>
                <Menu.Item key='4'>option4</Menu.Item>
              </Menu.SubMenu>
            ) : null
            } */}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    )
  }
}

export default TopMenu
