import React from 'react'

import PageHeader from '../PageHeader'
import GridContent from './GridContent'
import MenuContext from '../../tiles/menuContext'

import styles from './index.less'

const PageHeaderWrapper = ({children, contentWidth, wrapperClassName, top, ...restProps}) => (
  <div style={{margin: '-24px -24px 0'}} className={wrapperClassName}>
    {top}
    <MenuContext.Consumer>
      {value => (
        <PageHeader
          wide={contentWidth === 'Fixed'}
          home='Home'
          {...value}
          key='pageheader'
          {...restProps}
          // linkElement={Link}
          itemRender={item => {
            if (item.locale) {
              return item.name
            }
            return item.name
          }}
        />
      )}
    </MenuContext.Consumer>
    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
)

export default PageHeaderWrapper
