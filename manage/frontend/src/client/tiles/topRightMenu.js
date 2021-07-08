import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
// import { Link } from 'react-router-dom';
import {Avatar, Menu, Tooltip} from 'antd';
import {LogoutOutlined, QuestionCircleOutlined, UserOutlined} from '@ant-design/icons';

import HeaderDropdown from '../components/HeaderDropdown';
import styles from './topRightMenu.less';

@inject('authStore')
@observer
class TopRightMenu extends Component {
  handleMenuClick = ({key}) => {
    const {authStore, history} = this.props;

    // TODO update urls
    if (key === 'settings') {
      history.push('/user/settings');
      return;
    }
    if (key === 'logout') {
      // do logout
      authStore.reset();
      history.push('/auth/login');
    }
  };

  render() {
    const {authStore} = this.props;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.handleMenuClick}>
        <Menu.Item key='settings'>
          <UserOutlined/>
          Тохиргоо
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key='logout'>
          <LogoutOutlined/>
          Гарах
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.right}>
        <Tooltip title='Тусламж'>
          <a
            target='_blank'
            href='https://powered.mn'
            rel='noopener noreferrer'
            className={styles.action}
          >
            <QuestionCircleOutlined/>
          </a>
        </Tooltip>
        <HeaderDropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            {authStore.values.avatar ?
              <Avatar
                size='small'
                className={styles.avatar}
                src={authStore.values.avatar}
                alt='avatar'
              />
              :
              <Avatar
                size='small'
                className={styles.avatar}
                icon={<UserOutlined/>}
                alt='avatar'
              />}
            <span className={styles.name}>{authStore.values.fullName || 'Хэрэглэгч'}</span>
          </span>
        </HeaderDropdown>
      </div>
    );
  }
}

export default TopRightMenu;
