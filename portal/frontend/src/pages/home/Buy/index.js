import Link from 'next/link'
import Image from 'next/image'
import {List, Button} from 'antd'
import styles from './homeBuy.module.less'

const HomeBuy = () => {

  const data = [
    {
      title: 'Төсөл шалгаруулалтын журмын төсөлд санал авах тухай',
      date: '2021/03/03',
      description: 'Эрчим хүчний төсөл'
    },
    {
      title: 'Төсөл шалгаруулалтын журмын төсөлд санал авах тухай',
      date: '2021/03/03',
      description: 'Эрчим хүчний төсөл'
    },
    {
      title: 'Төсөл шалгаруулалтын журмын төсөлд санал авах тухай',
      date: '2021/03/03',
      description: 'Эрчим хүчний төсөл'
    },
    {
      title: 'Төсөл шалгаруулалтын журмын төсөлд санал авах тухай',
      date: '2021/03/03',
      description: 'Эрчим хүчний төсөл'
    },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Хулалдан авах ажиллагаа</div>
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
                <>
                  <h3>{item.title}</h3>
                  <span className={styles.date}>{item.date}</span>
                  <span className={styles.description}>{item.description}</span>
                </>
              </Link>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default HomeBuy
