import {useEffect} from 'react'
import {NextSeo} from 'next-seo'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {observer, inject} from 'mobx-react'
import {Row, Col} from 'antd'

import {Loader} from '../../../../components/elements'
import NewsWrapper from '../../index'

import styles from './newsId.module.less'

const baseUrl = 'https://mofa.gov.mn'

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

const NewsDetail = observer(({articleStore, articleStore: {currentData, currentLoading}}) => {
  const router = useRouter()
  const {category, id} = router.query

  useEffect(() => {
    articleStore.fetchCurrent(id)
  }, [router])

  const createMarkup = (content) => {
    return {__html: content}
  }

  return (
    <NewsWrapper>
      <NextSeo 
        title={currentData?.title || ''}
        description={currentData?.description || ''}
        canonical={`${baseUrl}/news/${category}/${id}`}
        openGraph={{
          url: `${baseUrl}/news/${category}/${id}`,
          title: currentData?.title || '',
          description: currentData?.description || '',
          images: [
            { url: currentData?.coverImg?.url },
          ],
          site_name: 'MOFA - Хүнс, хөдөө аж ахуй, хөнгөн үйлдвэрийн яам',
        }}
      />
      <Row gutter={15}>
        <Col xs={24} sm={24} md={12} lg={19}>
          {currentLoading ?
            <Loader />
            :
            <div className={styles.content}>
              {currentData?.coverImg?.url && 
                <div className={styles.cover}>
                  <img src={currentData?.coverImg?.url} alt='' />
                </div>
              }
              <div className={styles.header}>
                <div className={styles.date}>
                  <ul>
                    {currentData?.source && (
                      <li>
                        Эх сурвалж: <span>{currentData?.source}</span>
                      </li>
                    )}
                    <li>
                      Нийтлэгдсэн огноо: <span>{currentData?.createdDateText || ''}</span>
                    </li>
                  </ul>
                </div>
                <h3 className={styles.title}>{currentData?.title || ''}</h3>
              </div>
              <div dangerouslySetInnerHTML={createMarkup(currentData?.content || '')} />
            </div>
          }
        </Col>
        <Col xs={0} sm={0} md={12} lg={5}>
        </Col>
      </Row>
      <br />
      <br />
      <br />
    </NewsWrapper>
  )
})

export default inject('articleStore')(NewsDetail)
