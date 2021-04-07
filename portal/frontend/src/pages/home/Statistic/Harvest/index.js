import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {Row, Col} from 'antd'
import {HomeOutlined, UserOutlined} from '@ant-design/icons'

import styles from './harvest.module.less'

const StatisticHarvest = () => {

  const data = [
    {
      key: '0',
      label: 'Даршны ургамал',
      value: '6.6',
      icon: '/images/icons/harvest/icon-01.svg',
    },
    {
      key: '1',
      label: 'Хужир шүү',
      value: '94.5',
      icon: '/images/icons/harvest/icon-02.svg',
    },
    {
      key: '2',
      label: 'Үйлдвэрлэсэн тэжээл',
      value: '553.5',
      icon: '/images/icons/harvest/icon-03.svg',
    },
    {
      key: '3',
      label: 'Бэлтгэсэн өвс',
      value: '1229.4',
      icon: '/images/icons/harvest/icon-04.svg',
    },
  ]

  return (
    <>
      <h3 className={styles.title}><span>Бэлтгэсэн бусад тэжээл</span> мянган тонн/төрлөөр</h3>
      <div className={styles.content}>
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
      <h3 className={styles.title}><span>Малын тэжээл</span> мянган тонн/төрлөөр</h3>
      <div className={styles.content}>
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

export default StatisticHarvest
