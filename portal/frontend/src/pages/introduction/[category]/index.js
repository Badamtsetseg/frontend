import {useEffect} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {List, Typography} from 'antd'
import {observer, inject} from 'mobx-react'

import styles from '../introduction.module.less'

import IntroductionWrapper from '../index'

const { Paragraph } = Typography

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

const IntroductionList = observer(({articleStore, articleStore: {data, loading}}) => {
  const router = useRouter()
  const {category} = router.query
  
  useEffect(() => {
    articleStore.fetchList({covidType: category})
  }, [router])

  return (
    <IntroductionWrapper>
      <div className={styles.header}>
        <h3>Title goes here!</h3>
      </div>
      <div className={styles.content}>
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
      </div>
      {/* <List
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
              href='/introduction/[category]/[id]' 
              as={`/introduction/${category}/${item.id}`} 
              key={`introduction-${item.id}`}
            >
              <div className={styles.item}>
                <div className={styles.content}>
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
      /> */}
      <br />
      <br />
    </IntroductionWrapper>
  )
})

export default inject('articleStore')(IntroductionList)
