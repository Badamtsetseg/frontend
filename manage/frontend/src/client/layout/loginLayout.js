import React, {Component} from 'react'
import {withTranslation} from 'react-i18next'
import {renderRoutes} from 'react-router-config'
import {inject, observer} from 'mobx-react'
import Particles from 'react-particles-js'

import Logo from '../assets/logo/logo.svg'
import styles from './loginLayout.less'

@withTranslation()
@inject('langStore')
@observer
class LoginLayout extends Component {
  state = {
    collapsed: false,
  }

  toggle = (collapse) => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  getContext() {
    const {location} = this.props
    return {
      location,
    }
  }

  render() {
    const {t, route} = this.props

    return (
      <div className={styles.container}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Particles
            height={'100%'}
            width={'100%'}
            params={{
              particles: {
                number: {
                  value: 150,
                },
                size: {
                  value: 3,
                },
              },
            }}
            className={styles.particles}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <a href='/'>
                <img alt='logo' className={styles.logo} src={Logo}/>
                <span className={styles.title}>{t('logo.slogan')}</span>
              </a>
            </div>
          </div>
          {route != null ? renderRoutes(route.routes) : null}
        </div>
      </div>
    )
  }
}

export default LoginLayout
