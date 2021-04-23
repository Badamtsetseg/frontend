import {useState, useEffect} from 'react'
import {NextSeo} from 'next-seo'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {observer, inject} from 'mobx-react'
import {Breadcrumb, Row, Col} from 'antd'
import {HomeOutlined} from '@ant-design/icons'

import {Loader} from '../../components/elements'

import styles from './links.module.less'

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

const LinksBase = observer(({children, referenceDataStore, referenceDataStore: {selectData, selectLoading}}) => {
  const [active, setActive] = useState(null)
  const router = useRouter()
  const {link} = router.query

  useEffect(() => {
    if (link) {
      setActive(link)
    } else {
      referenceDataStore.fetchSelect({typeCode: 'COVID_TYPE'}).then(response => {
        router.push(`/links/${response.data[0].key}`)
      })
    }
  }, [link])
  
  return (
    <>
      <NextSeo title='MOFA - Холбоос' />
      <div className='breadcrumb'>
        <div className='container'>
          <Breadcrumb>
            <Breadcrumb.Item href=''>
              Нүүр
            </Breadcrumb.Item>
            <Breadcrumb.Item>Холбоос</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <br />
      <div className='container'>
        {selectLoading ? 
          <Loader />
          :
          <Row gutter={25}>
            <Col xs={24} sm={24} md={12} lg={5}>
              <div className={styles.menu}>
                <div className={styles.title}>
                  <span>Холбоос</span>
                </div>
                <ul>
                  {selectData.map(item => (
                    <li key={item.key} className={active === item.key && styles.active}>
                      <Link as={`/links/${item.key}`} href='/links/[link]'>{item.name}</Link>
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

export default inject('referenceDataStore')(LinksBase)
