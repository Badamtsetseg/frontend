import Link from 'next/link'
import Image from 'next/image'
import {List, Button} from 'antd'
import styles from './legal.module.less'

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
          size='small'
          dataSource={data}
          renderItem={item => (
            <List.Item className={styles.listItem}>
              <Link href='/'>
                <>
                  <h3>{item.title}</h3>
                  {/* <span className={styles.date}>{item.date}</span>
                  <span className={styles.description}>{item.description}</span> */}
                </>
              </Link>
            </List.Item>
          )}
        />
        <div style={{textAlign: 'center'}}>
          <Button type='primary' size='small'>Бүгдийг харах</Button>
        </div>
      </div>
    </div>
  )
}

export default HomeLegal
