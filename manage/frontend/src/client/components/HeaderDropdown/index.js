import React, {PureComponent} from 'react'
import {Dropdown} from 'antd'
import classNames from 'classnames'

import styles from './index.less'

class HeaderDropdown extends PureComponent {
  render() {
    const {overlayClassName, ...props} = this.props
    return (
      <Dropdown overlayClassName={classNames(styles.container, overlayClassName)} {...props} />
    )
  }
}

export default HeaderDropdown
