import Link from 'next/link'
import Image from 'next/image'
import {List} from 'antd'
import {RightOutlined} from '@ant-design/icons'
import styles from './price.module.less'

const HomePrice = () => {

  const data = [
    {
      title: 'Гурилан бүтээгдэхүүн',
      date: '2021/03/03',
      icon: '/images/icons/product/icon-01.svg',
    },
    {
      title: 'Махан бүтээгдэхүүн',
      date: '2021/03/03',
      icon: '/images/icons/product/icon-02.svg',
    },
    {
      title: 'Сүүн бүтээгдэхүүн',
      date: '2021/03/03',
      icon: '/images/icons/product/icon-03.svg',
    },
    {
      title: 'Жимс, ногоо',
      date: '2021/03/03',
      icon: '/images/icons/product/icon-04.svg',
    },
    {
      title: 'Бусад бүтээгдэхүүн',
      date: '2021/03/03',
      icon: '/images/icons/product/icon-05.svg',
    },
    {
      title: 'Шатахуун',
      date: '2021/03/03',
      icon: '/images/icons/product/icon-06.svg',
    },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Үнэ ханш</div>
      <div className={styles.content}>
        <List
          className={styles.list}
          dataSource={data}
          renderItem={item => (
            <List.Item className={styles.listItem}>
              <Link href='/'>
                <div className={styles.inner}>
                  <div className={styles.left}>
                    <div className={styles.icon}>
                      <Image
                        src={item.icon}
                        alt='logo-main'
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>
                  <div className={styles.middle}>
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
        {/* <div style={{textAlign: 'center'}}>
          <Button type='primary' size='small'>Бүгдийг харах</Button>
        </div> */}
      </div>
    </div>
  )
}

export default HomePrice
