import React, {Component} from 'react';
import {Drawer} from 'antd';
import SideMenu from './sideMenu';

class SideMenuWrapper extends Component {
  render() {
    const {isMobile, collapsed, toggle} = this.props;

    return isMobile ? (
      <Drawer
        visible={!collapsed}
        placement="left"
        onClose={() => toggle(true)}
        style={{
          padding: 0,
          height: '100vh',
        }}
      >
        <SideMenu {...this.props} collapsed={isMobile ? false : collapsed} toggle={toggle} />
      </Drawer>
    ) : <SideMenu {...this.props} collapsed={isMobile ? false : collapsed} toggle={toggle} />
  }
}

export default SideMenuWrapper;
