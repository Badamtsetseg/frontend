import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {ResponsiveBar} from '@nivo/bar'

import styles from './DashboardBarChart.less'

const Barchart = inject()
(observer(({data, keys, count = 0}) => {

  const rotate = () => {
    if (count < 15) {
      return 0
    }
    if (15 < count && count < 45) {
      return 45
    }
    if (count > 45) {
      return 90
    }
  }

  return (
    <React.Fragment>
      <div style={{height: '300px'}} className={styles.barChart}>
        <ResponsiveBar
          data={data}
          keys={keys}
          indexBy='key'
          margin={{top: 12, right: 12, bottom: 60, left: 30}}
          padding={0.3}
          colors={({id, data}) => data[`${id}_color`]}
          borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
          borderRadius={1}
          axisTop={null}
          axisRight={null}
          axisBottom={
            {
              tickSize: 5,
              tickPadding: 5,
              // tickRotation: 0,
              // legend: 'Огноо',
              legendPosition: 'middle',
              legendOffset: 32,
              tickRotation: rotate(),
            }
          }
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            // legend: 'Дуудлагын тоо',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{from: 'color', modifiers: [['brighter', '3']]}}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </React.Fragment>
  )
}))

export default Barchart