import {useState} from 'react'
import Link from 'next/link'
import {Row, Col, Tabs} from 'antd'
import {RightOutlined} from '@ant-design/icons'

import styles from './statistic.module.less'

const {TabPane} = Tabs

const HomeStatistic = () => {
  const [active, setActive] = useState(0)
  const menu = [
    {
      key: 0,
      title: 'Мал тэжээвэр амьтад',
    },
    {
      key: 1,
      title: 'Тариалсан талбай ургамлын төрлөөр',
    },
    {
      key: 2,
      title: 'Хураасан нийт ургац, ургамлын төрлөөр',
    },
    {
      key: 3,
      title: 'Хөдөө аж ахуйн газар',
    },
    {
      key: 4,
      title: 'Хөдөө аж ахуйн бүтээгдэхүүний нийт үйлдвэрлэл',
    },
    {
      key: 5,
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
                <li key={`statistic-menu-${item.key}`} onClick={() => setActive(item.key)}>
                  <div className={styles.left}>{item.title}</div>
                  <div className={styles.right}>
                    <RightOutlined />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col xs={24} sm={24} md={16} lg={17}>
          <div className='title'>
            {menu[active].title}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default HomeStatistic
