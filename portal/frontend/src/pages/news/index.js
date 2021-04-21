import {useEffect} from 'react'
import {NextSeo} from 'next-seo'
import Link from 'next/link'
import {observer, inject} from 'mobx-react'
import {Breadcrumb, Row, Col} from 'antd'
import {HomeOutlined} from '@ant-design/icons'

import {Loader} from '../../components/elements'

import styles from './news.module.less'

const NewsBase = observer(({children, referenceDataStore, referenceDataStore: {selectData, selectLoading}}) => {

  useEffect(() => {
    referenceDataStore.fetchSelect({typeCode: 'COVID_TYPE'})
  }, [])
  
  return (
    <>
      <NextSeo title='MOFA - Мэдээ, мэдээлэл'/>
      <div className='breadcrumb'>
        <div className='container'>
          <Breadcrumb>
            <Breadcrumb.Item href=''>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Мэдээ, мэдээлэл</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <br />
      <div className='container'>
        {selectLoading ? 
          <Loader />
          :
          <Row gutter={15}>
            <Col xs={24} sm={24} md={12} lg={5}>
              <div className={styles.menu}>
                <div className={styles.title}>
                  <span>Мэдээ, мэдээлэл</span>
                </div>
                <ul>
                  {selectData.map(item => (
                    <li key={item.id}>
                      <Link as={'/news/latest'} href='/news/[category]'>
                        <a>{item.name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col xs={0} sm={24} md={12} lg={19}>
              {children}
            </Col>
          </Row>
        }
        
      </div>
    </>
  )
})

export default inject('referenceDataStore')(NewsBase)
