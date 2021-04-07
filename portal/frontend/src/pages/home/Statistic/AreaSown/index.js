import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {Row, Col} from 'antd'
import {HomeOutlined, UserOutlined} from '@ant-design/icons'

import styles from './areaSown.module.less'

const StatisticAreaSown = () => {

  const data = [
    {
      key: '0',
      label: 'Улаан буудай',
      value: '436.1',
      icon: '/images/icons/areaSown/icon-04.svg',
    },
    {
      key: '1',
      label: 'Арвай',
      value: '2.4',
      icon: '/images/icons/areaSown/icon-04.svg',
    },
    {
      key: '2',
      label: 'Овъёос',
      value: '10.0',
      icon: '/images/icons/areaSown/icon-04.svg',
    },
    {
      key: '3',
      label: 'Төмс',
      value: '168.9',
      icon: '/images/icons/areaSown/icon-07.svg',
    },
    {
      key: '4',
      label: 'Хүнсний ногоо',
      value: '100.7',
      icon: '/images/icons/areaSown/icon-03.svg',
    },
    {
      key: '4',
      label: 'Жимс жимсгэнэ',
      value: '1.7',
      icon: '/images/icons/areaSown/icon-02.svg',
    },
    {
      key: '4',
      label: 'Тэжээлийн ургамал',
      value: '123.8',
      icon: '/images/icons/areaSown/icon-01.svg',
    },
    {
      key: '4',
      label: 'Техникийн  ургамал',
      value: '23.9',
      icon: '/images/icons/areaSown/icon-08.svg',
    },
  ]

  return (
    <>
      <h3 className={styles.title}><span>Хураасан нийт ургац</span> ургамлын төрлөөр/мянган тонн</h3>
      <div className={styles.content} style={{backgroundImage: 'url(/images/background/livestock.png)'}}>
        {data.map(item => (
          <div key={item.key} className={styles.item}>
            <div className={styles.icon}>
              <Image
                src={item.icon}
                alt='logo-main'
                width={60}
                height={60}
              />
            </div>
            <h3>{item.label}</h3>
            <p>{item.value}</p>
            <span>{item.place && `${item.place}-р байр`}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default StatisticAreaSown
