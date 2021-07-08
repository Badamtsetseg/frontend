import React, {Component} from 'react';
import {renderRoutes} from 'react-router-config';
import {Layout} from 'antd';
import {ContainerQuery} from 'react-container-query';
import classNames from 'classnames';

import Context from '../tiles/menuContext';
import SideMenuWrapper from '../tiles/sideMenuWrapper';
import Header from '../tiles/header';
import Footer from '../tiles/footer';

import styles from './baseLayout.less';
import {withTranslation} from 'react-i18next';

const query = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  },
  isMobile: {
    maxWidth: 599
  }
};

@withTranslation()
class BaseLayout extends Component {
  state = {
    collapsed: false
  };

  toggle = (collapse) => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  getContext() {
    const {location} = this.props;
    return {
      location
    };
  }

  render() {
    const {route, history} = this.props;
    const {collapsed} = this.state;

    return (
      <ContainerQuery query={query}>
        {params => (
          <Context.Provider value={this.getContext()}>
            <div className={classNames(params, styles.fullHeight)}>
              <Layout className={classNames(styles.fullHeight)}>
                <SideMenuWrapper {...this.props} isMobile={params.isMobile || false}
                  collapsed={collapsed}
                  toggle={this.toggle} />
                <Layout>
                  <Header history={history}
                    isMobile={params.isMobile || false}
                    collapsed={collapsed}
                    toggle={this.toggle} />
                  <Layout.Content
                    style={{
                      margin: '24px 24px 0px',
                      minHeight: 'auto'
                    }}
                  >
                    {route != null ? renderRoutes(route.routes) : null}
                  </Layout.Content>
                  <Footer />
                </Layout>
              </Layout>
            </div>
          </Context.Provider>
        )}
      </ContainerQuery>
    );
  }
}

export default BaseLayout;
