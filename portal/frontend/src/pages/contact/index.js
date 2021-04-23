import {useState, useEffect} from 'react'
import {NextSeo} from 'next-seo'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {observer, inject} from 'mobx-react'
import {Breadcrumb, Row, Col} from 'antd'
import {EnvironmentFilled} from '@ant-design/icons'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'

import {Loader} from '../../components/elements'

import styles from './contact.module.less'

const defaultCenter = { lat: 40.748817, lng: -73.985428 }
const defaultOptions = { scrollwheel: false }
const RegularMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={ defaultCenter }
      defaultOptions={ defaultOptions }
    >
      <Marker position={ defaultCenter } />
    </GoogleMap>
  ))
)
const loadingElementStyle = { height: '100%' }
const containerElementStyle = { height: '400px' }
const mapElementStyle = { height: '100%' }

const Contact = observer(() => {
  return (
    <>
      <NextSeo title='MOFA - Холбоо барих' />
      <div className='breadcrumb'>
        <div className='container'>
          <Breadcrumb>
            <Breadcrumb.Item href=''>
              Нүүр
            </Breadcrumb.Item>
            <Breadcrumb.Item>Холбоо барих</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className='container'>
        {/* {selectLoading ? 
          <Loader />
          :
        } */}
        <div className={styles.content}>
          <Row gutter={25}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <div className={styles.card}>
                <div className={styles.header}>
                  <div className={styles.left}>
                    <EnvironmentFilled />
                  </div>
                  <div className={styles.right}>
                    Монгол улс, Улаанбаатар хот 13381 Баянзүрх дүүрэг, Энхтайваны өргөн чөлөө 16а, Засгийн газрын IXа байр
                  </div>
                </div>
                <div className={styles.content}>
                  <RegularMap
                    googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyBnHTAm3TeKdpAu3RhACGQZl4IULxuRj4s'
                    loadingElement={<div style={ loadingElementStyle } />}
                    containerElement={<div style={ containerElementStyle } />}
                    mapElement={<div style={ mapElementStyle } />}
                  />
                </div>
              </div>
              <br />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <div className={styles.card}>
                <div className={styles.header}>
                  <div className={styles.left}>
                    <EnvironmentFilled />
                  </div>
                  <div className={styles.right}>
                    И-мэйл: mofa@mofa.gov.mn, info@mofa.gov.mn<br/>
                    Вэб: mofa.gov.mn<br/>
                    Утас: 51-262271<br/>
                    Факс: 51-263237
                  </div>
                </div>
              </div>
              <br />
              <h3 className={styles.title}>Яамны газар, хэлтсийн мэргэжилтнүүдийн утас</h3>
              <ul className={styles.list}>
                <li><p>Дэд сайд <span>123</span></p></li>
                <li>
                  <p>Төрийн нарийн бичгийн дарга <span>123</span></p>
                  <ul>
                    <li>
                      <p>Бодлого төлөвлөлтийн газрын дарга <span>123</span></p>
                      <ul>
                        <li><p>Санхүүгийн хэлтсийн дарга <span>123</span></p></li>
                      </ul>
                    </li>
                    <li>
                      <p>Төрийн захиргааны удирдлагын газрын дарга <span>123</span></p>
                      <ul>
                        <li><p>Хуулийн хэлтсийн дарга <span>123</span></p></li>
                        <li><p>Гадаад хамтын ажиллагааны хэлтсийн дарга <span>123</span></p></li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
      <br />
      <br />
    </>
  )
})

export default inject()(Contact)
