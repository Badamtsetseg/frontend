import {NextSeo} from 'next-seo'
import {Row, Col} from 'antd'

import styles from './home.module.less'

import News from './News'
import Branch from './Branch'
import Legal from './Legal'
import Buy from './Buy'
import Discussion from './Discussion'
import Price from './Price'
import Statistic from './Statistic'
import Systems from './Systems'

const Home = () => {
  return (
    <>
      <NextSeo title='MOFA - Нүүр'/>
      <>
        <News />
        <br />
        <Branch />
        <br />
        <div className='container'>
          <Row gutter={10}>
            <Col xs={24} sm={24} md={12} lg={6}>
              <Legal />
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
              <Buy />
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
              <Discussion />
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
              <Price />
            </Col>
          </Row>
        </div>
        <br />
        <br />
        <Statistic />
        <br />
        <Systems />
      </>
    </>
  )
}

export default Home
