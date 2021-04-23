import {useState, useEffect} from 'react'
import {NextSeo} from 'next-seo'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {observer, inject} from 'mobx-react'
import {Breadcrumb, Row, Col} from 'antd'
import {HomeOutlined} from '@ant-design/icons'

import {Loader} from '../../components/elements'

import styles from './news.module.less'

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

const NewsBase = observer(({children, referenceDataStore, referenceDataStore: {selectData, selectLoading}}) => {
  const [active, setActive] = useState(null)
  const router = useRouter()
  const {category} = router.query

  useEffect(() => {
    if (category) {
      setActive(category)
    } else {
      referenceDataStore.fetchSelect({typeCode: 'COVID_TYPE'}).then(response => {
        router.push(`/news/${response.data[0].key}`)
      })
    }
  }, [router])
  
  return (
    <>
      <NextSeo title='MOFA - Мэдээ, мэдээлэл' />
      <div className='breadcrumb'>
        <div className='container'>
          <Breadcrumb>
            <Breadcrumb.Item href=''>
              Нүүр
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
          <Row gutter={25}>
            <Col xs={24} sm={24} md={12} lg={5}>
              <div className={styles.menu}>
                <div className={styles.title}>
                  <span>Мэдээ, мэдээлэл</span>
                </div>
                <ul>
                  {selectData.map(item => (
                    <li key={item.key} className={active === item.key && styles.active}>
                      <Link as={`/news/${item.key}`} href='/news/[category]'>{item.name}</Link>
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
