import Link from 'next/link'
import {Layout, Row, Col, List, Divider} from 'antd'
import Image from 'next/image'
import moment from 'moment'

import styles from './publicFooter.module.less'

const PublicFooter = ({isMobile}) => {

  const partnerList = [
    {
      title: 'Мал эмнэлгийн ерөнхий газар',
      url: 'http://vet.gov.mn/',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/meeg.png',
    }, {
      title: 'Жижиг, дунд үйлдвэрийн газар',
      url: 'http://www.smefund.gov.mn/',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/logo11.png',
    }, {
      title: 'Малын удмын сангийн үндэсний төв',
      url: 'http://www.genebank.gov.mn/',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/1-09.png',
    }, {
      title: 'Аймаг дундын отрын бэлчээр ашиглалтын захиргаа',
      url: 'http://otor.gov.mn',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/t7nXNjcU0AWwuJK.png',
    }, {
      title: 'Хөдөө аж ахуйг дэмжих сан',
      url: 'http://khaads.mn/',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/khaadslogo.png',
    },  {
      title: 'ХАА-н Халхгол ҮБББЗ',
      url: 'https://khalkhgol.mofa.gov.mn',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/tolgoi-logo-1-1536x311.png',
    },  {
      title: 'Хөдөө аж ахуйн бирж ТӨХХК',
      url: 'http://www.mce.mn',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/tolgoi-logo-1-1536x311.png',
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
            <Divider className={styles.divider} />
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
                        <a target='_blank'>
                          <img src={item.icon} alt={item.title} style={{width: 30, height: 30}} />
                          <span className={styles.title}>{item.title}</span>
                        </a>
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
                      <Link href={item.url}>
                        <a target='_blank'>
                          <span className={styles.dot} />
                          {item.title}
                        </a>
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
                <span className={styles.bordered}>79991010</span>
                <span className={styles.bordered}>support@telcocom.mn</span>
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
                ©{moment().format('YYYY')} Хүнс, хөдөө аж ахуй, хөнгөн үйлдвэрийн яам
              </p>
            </Col>
            <Col xs={0} sm={24} md={12} lg={12} style={{textAlign: 'right'}}>
              <Image
                src='/images/logo/astvision.svg'
                alt='astvision-logo'
                width={180}
                height={50}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Layout.Footer>
  )
}

export default PublicFooter
