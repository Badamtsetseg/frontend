import Link from 'next/link'
import {Breadcrumb, Row, Col} from 'antd'

import styles from './pageHeader.module.less'

const PageHeader = ({routes, title, subTitle, action}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.breadcrumb}>
        <div className='container'>
          {routes && (
            <Breadcrumb>
              {routes.map((route, index) => (
                <Breadcrumb.Item key={`breadcrumb-${index}`}>
                  <Link href={route.link}>{route.title}</Link>
                </Breadcrumb.Item>
              ))}
              <Breadcrumb.Item>{title}</Breadcrumb.Item>
            </Breadcrumb>
          )}
        </div>
      </div>
      <div className='container'>
        {action ? (
          <Row gutter={25}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <h3>{title || ''}</h3>
              <p>{subTitle || ''}</p>
            </Col>
            <Col xs={0} sm={24} md={12} lg={12} style={{textAlign: 'right'}}>
              {action}
            </Col>
          </Row>
        )
        :
        (
          <>
            <h3>{title || ''}</h3>
            <p>{subTitle || ''}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default PageHeader
