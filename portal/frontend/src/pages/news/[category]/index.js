import {useEffect} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {List, Typography} from 'antd'
import {observer, inject} from 'mobx-react'

import styles from '../news.module.less'

import NewsWrapper from '../index'

const { Paragraph } = Typography

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

const NewsList = observer(({articleStore, articleStore: {data, loading}}) => {
  const router = useRouter()
  const {category} = router.query
  
  useEffect(() => {
    articleStore.fetchList({covidType: category})
  }, [router])

  return (
    <NewsWrapper>
      <List
        grid={{
          gutter: 15,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={data?.list || []}
        loading={loading}
        renderItem={item => (
          <List.Item key={item.id}>
            <Link 
              href='/news/[category]/[id]' 
              as={`/news/${category}/${item.id}`} 
              key={`news-${item.id}`}
            >
              <div className={styles.item}>
                <div className={styles.content}>
                  {/* <Tag color='orange' className={styles.type}>{item.covidTypeName}</Tag> */}
                  <Paragraph ellipsis={{rows: 3, expandable: false}} className={styles.title}>{item.title}</Paragraph>
                  <Paragraph ellipsis={{rows: 3, expandable: false}} className={styles.description}>{item.description}</Paragraph>
                  <span className={styles.date}>{item.createdDateText}</span>
                </div>
                <div className={styles.cover}>
                  <div style={{backgroundImage: `url(${item.coverImg?.url})`}} /> 
                </div>
              </div>
            </Link>
          </List.Item>
        )}
      />
      <br />
      <br />
    </NewsWrapper>
  )
})

export default inject('articleStore')(NewsList)
