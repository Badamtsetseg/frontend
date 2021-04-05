import Link from 'next/link'
import {Layout, Row, Col, List, Divider} from 'antd'
import Image from 'next/image'
import moment from 'moment'

import styles from './publicFooter.module.less'

const PublicFooter = ({isMobile}) => {

  const partnerList = [
    {
      title: 'Мал эмнэлгийн ерөнхий газар',
      url: '/',
    }, {
      title: 'Малын удмын сангийн үндэсний төв',
      url: '/',
    }, {
      title: 'Аймаг дундын отрын бэлчээр ашиглалтын захиргаа',
      url: '/',
    }, {
      title: 'Хөдөө аж ахуйг дэмжих сан',
      url: '/',
    }, {
      title: 'Жижиг, дунд үйлдвэрийг хөгжүүлэх сан',
      url: '/',
    },  {
      title: 'ХАА-н Халхгол ҮБББЗ',
      url: '/',
    },  {
      title: 'Хөдөө аж ахуйн бирж ТӨХХК',
      url: '/',
    },
  ]

  const cityList = [
    {
      title: 'Архангай аймаг',
      url: '/',
    }, {
      title: 'Баян-Өлгий аймаг',
      url: '/',
    }, {
      title: 'Баянхонгор аймаг',
      url: '/',
    }, {
      title: 'Булган аймаг',
      url: '/',
    }, {
      title: 'Говь-Алтай аймаг',
      url: '/',
    }, {
      title: 'Говьсүмбэр аймаг',
      url: '/',
    }, {
      title: 'Дархан-Уул',
      url: '/',
    }, {
      title: 'Дорнод аймаг',
      url: '/',
    },  {
      title: 'Дорноговь аймаг',
      url: '/',
    },  {
      title: 'Дундговь аймаг',
      url: '/',
    },  {
      title: 'Завхан аймагОрхон',
      url: '/',
    },  {
      title: 'Өвөрхангай аймаг',
      url: '/',
    },  {
      title: 'Өмнөговь аймаг',
      url: '/',
    },   {
      title: 'Сэлэнгэ аймаг',
      url: '/',
    }, 
  ]

  return (
    <Layout.Footer className={styles.footerWrapper}>
      <div className='container'>
        {!isMobile && (
          <div className={styles.content}>
            <div>
              <Image
                src='/images/logo/main.svg'
                alt='footer-logo'
                width={360}
                height={60}
              />
            </div>
            <br />
            <Row gutter={25}>
              <Col xs={24} sm={24} md={12} lg={7}>
                <List
                  className={styles.list}
                  size='small'
                  header={
                    <div className={styles.listHeader}>харъяа байгууллагууд</div>
                  }
                  dataSource={partnerList}
                  renderItem={item => (
                    <List.Item className={styles.listItem}>
                      <Link href={item.url}>
                        {item.title}
                      </Link>
                    </List.Item>
                  )}
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={11}>
                <List
                  className={styles.list}
                  grid={{ gutter: 16, column: 3 }}
                  size='small'
                  header={
                    <div className={styles.listHeader}>аймгийн ХХААГ</div>
                  }
                  dataSource={cityList}
                  renderItem={item => (
                    <List.Item className={styles.listItem}>
                      <span />
                      <Link href={item.url}>
                        {item.title}
                      </Link>
                    </List.Item>
                  )}
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={6}>
                <div className={styles.listHeader}>холбоо барих</div>
                <p style={{marginTop: '15px'}}>
                  Монгол улс, Улаанбаатар хот 13381
                  Баянзүрх дүүрэг, Энхтайваны өргөн чөлөө 16а,
                  Засгийн газрын IXа байр
                </p>
                <span>79991010</span>
                <span>support@telcocom.mn</span>
              </Col>
            </Row>
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <div className='container'>
          <Row gutter={25}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <p>
                Зохиогчийн эрх ©{moment().format('YYYY')} Хүнс, хөдөө аж ахуй, хөнгөн үйлдвэрийн яам
              </p>
            </Col>
            <Col xs={0} sm={24} md={12} lg={12} style={{textAlign: 'right'}}>
              <Link href='/'>Үйлчилгээний нөхцөл</Link>
              <Divider type='vertical' />
              <Link href='/'>Нууцлалын бодлого</Link>
            </Col>
          </Row>
        </div>
      </div>
    </Layout.Footer>
  )
}

export default PublicFooter
