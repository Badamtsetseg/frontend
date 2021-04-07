import {useState} from 'react'
import Link from 'next/link'
import {Row, Col, Tabs} from 'antd'
import {RightOutlined} from '@ant-design/icons'

import styles from './statistic.module.less'

import Livestock from './Livestock'

const {TabPane} = Tabs

const HomeStatistic = () => {
  const [active, setActive] = useState('livestock')
  const menu = [
    {
      key: 'livestock',
      title: 'Мал тэжээвэр амьтад',
    },
    {
      key: 'areaSown',
      title: 'Тариалсан талбай ургамлын төрлөөр',
    },
    {
      key: 'harvest',
      title: 'Хураасан нийт ургац, ургамлын төрлөөр',
    },
    {
      key: 'agricultureArea',
      title: 'Хөдөө аж ахуйн газар',
    },
    {
      key: 'agricultureProduction',
      title: 'Хөдөө аж ахуйн бүтээгдэхүүний нийт үйлдвэрлэл',
    },
    {
      key: 'agricultureProduct',
      title: 'Хөдөө аж ахуйн гол нэр төрлийн бүтээгдэхүүний үйлдвэрлэл',
    },
  ]

  return (
    <div className='container'>
      <Row gutter={25}>
        <Col xs={24} sm={24} md={8} lg={7}>
          <div className={styles.menu}>
            <ul>
              {menu.map(item => (
                <li key={`statistic-menu-${item.key}`} className={active === item.key && styles.active} onClick={() => setActive(item.key)}>
                  <div className={styles.left}>{item.title}</div>
                  <div className={styles.right}>
                    <RightOutlined />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <br />
        </Col>
        <Col xs={24} sm={24} md={16} lg={17}>
          <div className={styles.wrapper}>
            {active === 'livestock' && <Livestock />}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default HomeStatistic
