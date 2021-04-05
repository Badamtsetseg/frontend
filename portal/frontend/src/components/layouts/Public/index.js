import {useState} from 'react'
import {DefaultSeo} from 'next-seo'
import {ContainerQuery} from 'react-container-query'
import {Layout, BackTop} from 'antd'
import {ArrowUpOutlined} from '@ant-design/icons'

import {Context, PublicHeader, PublicFooter} from '../../modules'

import styles from './layoutPublic.module.less'

const PublicLayout = ({location, children}) => {
  const [screenQuery] = useState({
    'screenXs': {
      maxWidth: 575
    },
    'screenSm': {
      minWidth: 576,
      maxWidth: 767
    },
    'screenMd': {
      minWidth: 768,
      maxWidth: 991
    },
    'screenLg': {
      minWidth: 992,
      maxWidth: 1199
    },
    'screenXl': {
      minWidth: 1200,
      maxWidth: 1599
    },
    'screenXxl': {
      minWidth: 1600
    }
  })

  const getContext = () => {
    return location
  }

  return (
    <ContainerQuery query={screenQuery}>
      {params => {
        return (
          <Context.Provider value={getContext}>
            <DefaultSeo
              title='Хүнс, хөдөө аж ахуй, хөнгөн үйлдвэрийн яам'
              description='Хүнс, хөдөө аж ахуй, хөнгөн үйлдвэрийн яам'
            />
            <Layout className={styles.wrapper} style={params.screenXs ? {paddingTop: 80} : {}}>
              <PublicHeader isMobile={params.screenXs}/>
              <Layout>
                <Layout.Content>
                  <div className={styles.content}>{children}</div>
                  <BackTop>
                    <div className={styles.anchor}>
                      <ArrowUpOutlined />
                    </div>
                  </BackTop>
                </Layout.Content>
                <PublicFooter isMobile={params.screenXs} />
              </Layout>
            </Layout>
          </Context.Provider>
        )
      }}
    </ContainerQuery>
  )
}

export default PublicLayout
