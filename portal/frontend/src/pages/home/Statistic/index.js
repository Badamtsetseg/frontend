import {useState} from 'react'
import {Row, Col} from 'antd'
import {RightOutlined} from '@ant-design/icons'

import styles from './statistic.module.less'

import Livestock from './Livestock'
import AreaSown from './AreaSown'
import Harvest from './Harvest'

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
            {active === 'areaSown' && <AreaSown />}
            {active === 'harvest' && <Harvest />}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default HomeStatistic
