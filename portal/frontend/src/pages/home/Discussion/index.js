import Link from 'next/link'
import Image from 'next/image'
import {List, Button} from 'antd'
import styles from './discussion.module.less'

const HomeDiscussion = () => {

  const data = [
    {
      title: 'Сайдын нэрэмжит грантын  шалгаруулалтад бүтээлээ ирүүлэхийг урьж байна.',
      date: '2021/03/03',
      description: 'Эрчим хүчний төсөл'
    },
    {
      title: 'Журмын төсөлд санал авч байна',
      date: '2021/03/03',
      description: 'Эрчим хүчний төсөл'
    },
    {
      title: 'Жагсаалтын төсөлд санал авч байна',
      date: '2021/03/03',
      description: 'Эрчим хүчний төсөл'
    },
    {
      title: 'Дорноговь аймгийн Сайншанд сумын төвийн цахилгаан түгээх сүлжээг шинэчлэн сайжруулах',
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
          size='small'
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
        <div style={{textAlign: 'center'}}>
          <Button type='primary' size='small'>Бүгдийг харах</Button>
        </div>
      </div>
    </div>
  )
}

export default HomeDiscussion
