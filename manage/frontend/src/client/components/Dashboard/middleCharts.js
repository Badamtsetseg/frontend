import React from 'react'
import {inject, observer} from 'mobx-react'
import {Badge} from 'antd'
import numeral from 'numeral'

import styles from './middleChart.less'

const MiddleCharts = inject()
(observer(({data, title, nameField, countField, countUnit}) => {

  const calculateTotal = (data, countField) => {
    return data.reduce((totalValue, current) => totalValue + (countField ? current[countField] : current.count), 0)
  }

  return (
    <div>
      {title && <h3 className='subTitle'><b>{title}</b></h3>}
      <ul className={styles.requestList}>
        {data.map((item, i) => (
          <li key={i + 1}>
            <Badge color={item.color}/>
            <span className={styles.title}>
              {nameField && item[nameField] || item.name}
            </span>
            <span>
              <b>
                {numeral(countField && `${item[countField]}` || item.count).format('0,0')}
                {countUnit && ` ${countUnit}`}
              </b>
            </span>
          </li>
        ))}
        <li className={styles.total}>
          <Badge color='#1a4e99'/>
          <span className={styles.title}>
            <b>Нийт</b>
          </span>
          {
            data.length > 0 ?
              <span className={styles.totalNumber}>
                <b>
                  {numeral(calculateTotal(data, countField)).format('0,0')}
                  {countUnit && ` ${countUnit}`}
                </b>
              </span>
              :
              <span className={styles.totalNumber}><b>-</b></span>
          }
        </li>
      </ul>
    </div>
  )
}))

export default MiddleCharts
