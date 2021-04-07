import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {Row, Col} from 'antd'
import {HomeOutlined, UserOutlined} from '@ant-design/icons'

import styles from './livestock.module.less'

const StatisticLivestock = () => {

  const data = [
    {
      key: '0',
      label: 'Морь',
      value: '3.9',
      place: '5',
      icon: '/images/icons/livestock/icon-05.svg',
    },
    {
      key: '1',
      label: 'Ямаа',
      value: '27.3',
      place: '9',
      icon: '/images/icons/livestock/icon-04.svg',
    },
    {
      key: '2',
      label: 'Хонь',
      value: '30.1',
      place: '11',
      icon: '/images/icons/livestock/icon-03.svg',
    },
    {
      key: '3',
      label: 'Тэмээ',
      value: '0.4',
      place: '13',
      icon: '/images/icons/livestock/icon-01.svg',
    },
    {
      key: '4',
      label: 'Үхэр',
      value: '4.4',
      place: '57',
      icon: '/images/icons/livestock/icon-05.svg',
    },
  ]

  return (
    <>
      <h3 className={styles.title}><span>Монгол улс малын тоо</span> дэлхийд эзлэх байраар/сая толгой</h3>
      <div className={styles.content} style={{backgroundImage: 'url(/images/background/livestock.png)'}}>
        {data.map(item => (
          <div key={item.key} className={styles.item}>
            <div className={styles.icon}>
              <Image
                src={item.icon}
                alt={item.label}
                width={120}
                height={120}
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

export default StatisticLivestock
