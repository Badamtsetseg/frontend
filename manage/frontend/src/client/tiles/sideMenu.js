import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Layout, Menu} from 'antd'
import {inject, observer} from 'mobx-react'
import {action, observable} from 'mobx'
import classNames from 'classnames'
import {Trans} from 'react-i18next'

import DynamicIcon from '../components/DynamicIcon'
import styles from './sideMenu.less'
import LogoExpand from '../assets/logo/logo.svg'
import LogoCollapsed from '../assets/logo/logo.svg'

import {checkAuth} from '../../common/utils/auth'

// let firstMount = true;
const navTheme = 'light'
const {SubMenu} = Menu

@inject('langStore', 'authStore')
@observer
class SideMenu extends Component {
  @observable currentPath = null

  @action
  setPath(path) {
    this.currentPath = path
  }

  componentDidMount() {
    const {
      history,
      history: {
        location: {pathname},
      },
    } = this.props
    this.setPath(pathname)

    history.listen((evt) => {
      this.setPath(evt.pathname)
    })
  }

  render() {
    const {
      // authStore,
      collapsed,
      // toggle,
      // match: {params}
    } = this.props

    const menus = [
      {
        key: 'main-menu',
        title: 'Үндсэн цэс',
        items: [
          {
            key: '/dashboard',
            link: '/dashboard',
            icon: 'DashboardOutlined',
            title: 'menu.home',
          },
          {
            key: '/content',
            link: '/content',
            icon: 'OrderedListOutlined',
            title: 'menu.content.index',
            role: ['ROLE_ARTICLE_MANAGE'],
            subMenu: true,
            child: [
              {
                key: '/content/article',
                link: '/content/article',
                icon: 'OrderedListOutlined',
                title: 'menu.content.article',
                role: ['ROLE_ARTICLE_MANAGE'],
              },
            ],
          },
          {
            key: '/reference',
            link: '/reference',
            icon: 'OrderedListOutlined',
            title: 'menu.reference.index',
            role: ['ROLE_COUNTRY_MANAGE', 'ROLE_REFERENCE_TYPE_MANAGE', 'ROLE_REFERENCE_DATA_MANAGE', 'ROLE_FAQ_MANAGE'],
            subMenu: true,
            child: [
              {
                key: '/reference/faq',
                link: '/reference/faq',
                icon: 'OrderedListOutlined',
                title: 'menu.reference.faq',
                role: ['ROLE_FAQ_MANAGE'],
              },
              {
                key: '/reference/country',
                link: '/reference/country',
                icon: 'OrderedListOutlined',
                title: 'menu.reference.country',
                role: ['ROLE_COUNTRY_MANAGE'],
              },
              {
                key: '/reference/type',
                link: '/reference/type',
                icon: 'OrderedListOutlined',
                title: 'menu.reference.type',
                role: ['ROLE_REFERENCE_TYPE_MANAGE'],
              },
              {
                key: '/reference/data',
                link: '/reference/data',
                icon: 'OrderedListOutlined',
                title: 'menu.reference.data',
                role: ['ROLE_REFERENCE_DATA_MANAGE'],
              },
            ],
          },
          {
            key: '/mobile',
            link: '/mobile',
            icon: 'MobileOutlined',
            title: 'menu.mobile',
            role: ['ROLE_DEVICE_TOKEN_VIEW', 'ROLE_PUSH_NOTIFICATION_VIEW', 'ROLE_PUSH_NOTIFICATION_MANAGE'],
            subMenu: true,
            child: [
              {
                key: '/mobile/device-token',
                link: '/mobile/device-token',
                icon: 'MobileOutlined',
                title: 'menu.deviceToken',
                role: ['ROLE_DEVICE_TOKEN_VIEW'],
              },
              {
                key: '/mobile/push-notification',
                link: '/mobile/push-notification',
                icon: 'NotificationOutlined',
                title: 'menu.pushNotification',
                role: ['ROLE_PUSH_NOTIFICATION_VIEW', 'ROLE_PUSH_NOTIFICATION_MANAGE'],
              },
            ],
          },
        ],
      },
      // {
      //   key: 'manage',
      //   title: 'Хяналт',
      //   items: [
      //     {
      //       key: '/payment/list',
      //       link: '/payment/list',
      //       icon: 'OrderedListOutlined',
      //       title: 'menu.payment.index',
      //       role: ['ROLE_PAYMENT_VIEW', 'ROLE_PAYMENT_MANAGE'],
      //     },
      //     {
      //       key: '/payment-statement/list',
      //       link: '/payment-statement/list',
      //       icon: 'OrderedListOutlined',
      //       title: 'menu.paymentStatement.index',
      //       role: ['ROLE_PAYMENT_VIEW', 'ROLE_PAYMENT_MANAGE'],
      //     },
      //   ],
      // },
      {
        key: 'settings',
        title: 'Тохиргоо',
        items: [
          {
            key: '/user',
            link: '/user',
            icon: 'UserOutlined',
            title: 'menu.user.index',
            role: ['ROLE_BUSINESS_ROLE_MANAGE', 'ROLE_USER_VIEW', 'ROLE_USER_MANAGE'],
            subMenu: true,
            child: [
              {
                key: '/user/type',
                link: '/user/type',
                icon: 'DashOutlined',
                title: 'menu.user.type',
                role: 'ROLE_BUSINESS_ROLE_MANAGE',
              },
              {
                key: '/user/list',
                link: '/user/list',
                icon: 'DashOutlined',
                title: 'menu.user.list',
                role: ['ROLE_USER_VIEW', 'ROLE_USER_MANAGE'],
              },
            ],
          },
        ],
      },
    ]

    const renderSubMenu = (item) =>
      checkAuth(item.role) && (
        <Menu.Item key={item.key}>
          <Link to={item.link}>
            <DynamicIcon type={item.icon} />
            <span>
              <Trans>{item.title}</Trans>
            </span>
          </Link>
        </Menu.Item>
      )

    return (
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint='lg'
        width={256}
        theme={navTheme}
        className={classNames(styles.sider, styles.light)}
      >
        <div className={styles.logo}>
          <Link to='/'>
            {collapsed === true ? <img src={LogoCollapsed} alt='logo' style={{marginLeft: -5}} /> :
              <img src={LogoExpand} alt='logo' width={100} />}
            <h1>
              Astvision
              <br/>
              Starter
            </h1>
          </Link>
        </div>
        <Menu
          mode='inline'
          theme={navTheme}
          // defaultSelectedKeys={['1']}
          // defaultOpenKeys={['sub1']}
          selectedKeys={[this.currentPath]}
          style={{borderRight: 0}}
        >
          {menus.map((item, idx) => {
            return (
              <Menu.ItemGroup key={item.key} title={<span>{item.title}</span>}>
                {item.items.map((item) => {
                  if (item.subMenu) {
                    if (checkAuth(item.role)) {
                      return (
                        <SubMenu
                          key={item.key}
                          title={
                            <span>
                              <DynamicIcon type={item.icon} />
                              <span>
                                <Trans>{item.title}</Trans>
                              </span>
                            </span>
                          }
                        >
                          {item.child && item.child.length !== 0 && item.child.map(renderSubMenu)}
                        </SubMenu>
                      )
                    }
                  } else {
                    if (checkAuth(item.role)) {
                      return (
                        <Menu.Item key={item.key}>
                          <Link to={item.link}>
                            <DynamicIcon type={item.icon} />
                            <span>
                              <Trans>{item.title}</Trans>
                            </span>
                          </Link>
                        </Menu.Item>
                      )
                    }
                  }
                })}
              </Menu.ItemGroup>
            )
          })}
        </Menu>
      </Layout.Sider>
    )
  }
}

export default SideMenu
