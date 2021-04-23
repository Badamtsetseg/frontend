import {useState, useEffect} from 'react'
import {NextSeo} from 'next-seo'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {observer, inject} from 'mobx-react'
import {Breadcrumb, Row, Col} from 'antd'
import {HomeOutlined, MessageFilled} from '@ant-design/icons'

import {Loader} from '../../components/elements'

import styles from './sitemap.module.less'

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

const Sitemap = observer(() => {
  const router = useRouter()
  useEffect(() => {
    // TODO
  }, [])
  
  return (
    <>
      <NextSeo title='MOFA - Сайтын бүтэц' />
      <div className='breadcrumb'>
        <div className='container'>
          <Breadcrumb>
            <Breadcrumb.Item href=''>
              Нүүр
            </Breadcrumb.Item>
            <Breadcrumb.Item>Сайтын бүтэц</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className='container'>
        {/* {selectLoading ? 
          <Loader />
          :
        } */}
        <div className={styles.header}>
          <h3>Сайтын бүтэц</h3>
        </div>
        <div className={styles.content}>
          <Row gutter={25}>
            <Col xs={24} sm={24} md={8} lg={6}>
              <div className={styles.card}>
                <div className={styles.header}>
                  Ил тод байдал
                </div>
                <div className={styles.content}>
                  <ul>
                    <li><a href='/'>Шилэн данс</a></li>
                    <li><a href='/'>Төсөв, санхүү</a></li>
                    <li><a href='/'>Худалдан авах ажиллагаа</a></li>
                    <li><a href='/'>Сонгон шалгаруулалт</a></li>
                    <li><a href='/'>Төлөвлөгөө, тайлан</a></li>
                    <li><a href='/'>Хяналт-шинжилгээ, үнэлгээ</a></li>
                    <li><a href='/'>Дотоод аудит</a></li>
                    <li><a href='/'>Хүний нөөц</a></li>
                    <li><a href='/'>Авлигын эсрэг, ХАСХОМ</a></li>
                    <li><a href='/'>Статистик мэдээлэл</a></li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
})

export default inject('referenceDataStore')(Sitemap)
