import {useEffect} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {List, Table, Typography} from 'antd'
import {observer, inject} from 'mobx-react'

import styles from '../links.module.less'

import LinksWrapper from '../index'

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

const LinkList = observer(({articleStore, articleStore: {data, loading}}) => {
  const router = useRouter()
  const {link} = router.query
  
  useEffect(() => {
    articleStore.fetchList({covidType: link})
  }, [link])
  
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, idx) => <span className={styles.index}>{data?.pagination.current * data?.pagination.pageSize + 1 + idx}</span>,
      width: 50,
      align: 'center'
    },
    {
      title: 'Нэр',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <a href='/' target='_blank' className={styles.action}>
          {text}
        </a>
      )
    },
  ]

  return (
    <LinksWrapper>
      <Table dataSource={data?.list} columns={columns} size='middle' loading={loading} />
      {/* <List
        grid={{
          gutter: 15,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 1,
          xxl: 1,
        }}
        dataSource={data?.list || []}
        loading={loading}
        renderItem={item => (
          <List.Item key={item.id}>
            <Link 
              href='/links/[category]/[id]' 
              as={`/links/${category}/${item.id}`} 
              key={`links-${item.id}`}
            >
              {item.title}
            </Link>
          </List.Item>
        )}
      /> */}
      <br />
      <br />
    </LinksWrapper>
  )
})

export default inject('articleStore')(LinkList)
