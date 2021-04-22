import {useState, useEffect} from 'react'
import {NextSeo} from 'next-seo'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {observer, inject} from 'mobx-react'
import {Breadcrumb, Collapse} from 'antd'
import {HomeOutlined, MessageFilled} from '@ant-design/icons'

import {Loader} from '../../components/elements'

import styles from './faq.module.less'

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

const { Panel } = Collapse

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const BranchBase = observer(() => {
  const router = useRouter()
  useEffect(() => {
    // TODO
  }, [])
  
  return (
    <>
      <NextSeo title='MOFA - Түгээмэл асуулт, хариулт' />
      <div className='breadcrumb'>
        <div className='container'>
          <Breadcrumb>
            <Breadcrumb.Item href=''>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Түгээмэл асуулт, хариулт</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className='container'>
        {/* {selectLoading ? 
          <Loader />
          :
        } */}
        <div className={styles.header}>
          <h3>Түгээмэл асуулт, хариулт</h3>
        </div>
        <div className={styles.content}>
          <Collapse 
            accordion 
            defaultActiveKey={['1']}
            expandIconPosition='right'
          >
            <Panel 
              header={
                <>
                  <MessageFilled /> This is panel header 1
                </>
              } 
              key='1'
            >
              <p>{text}</p>
            </Panel>
            <Panel 
              header={
                <>
                  <MessageFilled /> This is panel header 2
                </>
              } 
              key='2'
            >
              <p>{text}</p>
            </Panel>
            <Panel 
              header={
                <>
                  <MessageFilled /> This is panel header 3
                </>
              } 
              key='3'
            >
              <p>{text}</p>
            </Panel>
          </Collapse>
        </div>
      </div>
    </>
  )
})

export default inject('referenceDataStore')(BranchBase)
