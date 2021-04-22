import {useEffect} from 'react'
import Link from 'next/link'
import {List, Row, Col, Typography} from 'antd'
import {observer, inject} from 'mobx-react'
import Slider from 'react-slick'
import {Loader} from '../../../components/elements'

import styles from './homeNews.module.less'

const { Paragraph } = Typography
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: false,
  autoplaySpeed: 2000
}

const HomeNews = observer(({
  articleStore, 
  articleStore: {data, loading, importantData, importantLoading}
}) => {

  useEffect(() => {
    articleStore.fetchList()
    articleStore.fetchImportantList()
  }, [])

  return (
    <div className='container'>
      <br />
      <Row gutter={25}>
        <Col xs={24} sm={24} md={15} lg={15}>
          <div className='title'>
            Онцлох мэдээ
          </div>
          {importantLoading ? 
            <Loader />
            :
            <Slider {...settings} className={styles.sliderWrapper}>
              {importantData?.list?.map((item, index) => (
                <Link 
                  href='/news/[category]/[id]' 
                  as={`/news/latest/${item.id}`} 
                  key={`important-news-${index}`}
                >
                  <div className={styles.sliderItem}>
                    <div className={styles.imageWrapper}>
                      <div className={styles.image} style={{backgroundImage: `url(${item.coverImg?.url})`}} />
                    </div>
                    <div className={styles.content}>
                      <Paragraph ellipsis={{rows: 2, expandable: false}} className={styles.title}>{item.title}</Paragraph>
                      <span>{item.createdDateText || '-'}</span>
                      <Paragraph ellipsis={{rows: 3, expandable: false}} className={styles.description}>{item.description}</Paragraph>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          }
          <br />    
          <br />
        </Col>
        <Col xs={24} sm={24} md={9} lg={9}>
          <div className='title'>
            Сүүлд нэмэгдсэн
          </div>
          <List
            className={styles.list}
            dataSource={data?.list || []}
            loading={loading}
            renderItem={(item, index) => (
              <List.Item className={styles.listItem} key={`news-right-${index}`}>
                <Link 
                  href='/news/[category]/[id]' 
                  as={`/news/latest/${item.id}`}
                >
                  <div className={styles.inner}>
                    <div className={styles.left}>
                      <div className={styles.imageWrapper}>
                        <div className={styles.image} style={{backgroundImage: `url(${item.coverImg?.url})`}} />
                      </div>
                    </div>
                    <div className={styles.right}>
                      <Paragraph ellipsis={{rows: 3, expandable: false}} className={styles.title}>{item.title}</Paragraph>
                      <span>{item.createdDateText || '-'}</span>
                      <Paragraph ellipsis={{rows: 2, expandable: false}} className={styles.description}>{item.description}</Paragraph>
                    </div>
                  </div>
                </Link>
              </List.Item>
            )}
          />
          <br />
        </Col>
      </Row>
    </div>
  )
})

export default inject('articleStore')(HomeNews)
