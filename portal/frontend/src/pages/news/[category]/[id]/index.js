import {useEffect} from 'react'
import {NextSeo} from 'next-seo'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {observer, inject} from 'mobx-react'
import {Row, Col, Breadcrumb, Typography} from 'antd'
import {HomeOutlined} from '@ant-design/icons'

import {Loader} from '../../../../components/elements'
import NewsWrapper from '../../index'

import styles from './index.module.less'

const { Paragraph } = Typography

const NewsDetail = observer(({articleStore, articleStore: {currentData, currentLoading}}) => {
  const router = useRouter()

  useEffect(() => {
    console.log(router)
    articleStore.fetchCurrent(router.query.id)
  }, [])

  return (
    <NewsWrapper>
      <NextSeo title='MOFA - Мэдээ, мэдээлэл'/>
      <Row gutter={15}>
        <Col xs={24} sm={24} md={12} lg={19}>
          {currentLoading ?
            <Loader />
            :
            <div className={styles.content}>
              <img className={styles.cover} src={currentData?.coverImg?.url} alt='cover' />
              <h3 className={styles.title}>{currentData?.title || ''}</h3>
            </div>
          }
        </Col>
        <Col xs={0} sm={0} md={12} lg={5}>
        </Col>
      </Row>
    </NewsWrapper>
  )
})

export default inject('articleStore')(NewsDetail)
