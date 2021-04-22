import Link from 'next/link'
import {List, Button} from 'antd'
import {RightOutlined} from '@ant-design/icons'
import styles from './homeLegal.module.less'

const HomeLegal = () => {

  const data = [
    {
      title: 'Монгол улсын хууль',
      date: '2021/03/03',
      description: 'Сайдын тушаал'
    },
    {
      title: 'Улсын Их Хурлын тогтоол',
      date: '2021/03/03',
      description: 'Сайдын тушаал',
    },
    {
      title: 'Засгийн газрын тогтоол',
      date: '2021/03/03',
      description: 'Сайдын тушаал'
    },
    {
      title: 'Сайд, Төрийн нарийн бичгийн даргын тушаал',
      date: '2021/03/03',
      description: 'Сайдын тушаал'
    },
    {
      title: 'Үндэсний төсөл, хөтөлбөр',
      date: '2021/03/03',
      description: 'Сайдын тушаал'
    },
    {
      title: 'Гадаадын төсөл, хөтөлбөр',
      date: '2021/03/03',
      description: 'Сайдын тушаал'
    },
    {
      title: 'Стандарт',
      date: '2021/03/03',
      description: 'Сайдын тушаал'
    },
    {
      title: 'Төсөл, хэлэлцүүлэг',
      date: '2021/03/03',
      description: 'Сайдын тушаал'
    },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Хууль, тогтоомж</div>
      <div className={styles.content}>
        <List
          className={styles.list}
          loadMore={
            <div style={{textAlign: 'center', paddingTop: 10}}>
              <Button type='primary' size='small'>Бүгдийг харах</Button>
            </div>
          }
          dataSource={data}
          renderItem={item => (
            <List.Item className={styles.listItem}>
              <Link href='/'>
                <div className={styles.inner}>
                  <div className={styles.left}>
                    <h3>{item.title}</h3>
                  </div>
                  <div className={styles.right}>
                    <RightOutlined />
                  </div>
                </div>
              </Link>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default HomeLegal
