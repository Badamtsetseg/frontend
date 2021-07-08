import React, {Component, Fragment} from 'react'
import {observer} from 'mobx-react'
import {Alert, Table} from 'antd'
import {Trans} from 'react-i18next'

import styles from './index.less'

function initTotalList(columns) {
  const totalList = []
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({...column, total: 0})
    }
  })
  return totalList
}

@observer
class StandardTable extends Component {
  constructor(props) {
    super(props)
    const {columns} = props
    const needTotalList = initTotalList(columns)

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns)
      return {
        selectedRowKeys: [],
        needTotalList,
      }
    }
    return null
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let {needTotalList} = this.state
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }))
    const {onSelectRow} = this.props
    if (onSelectRow) {
      onSelectRow(selectedRows)
    }

    this.setState({selectedRowKeys, needTotalList})
  }

  handleTableChange = (pagination, filters, sorter) => {
    const {onChange} = this.props
    if (onChange) {
      onChange(pagination, filters, sorter)
    }
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], [])
  }

  render() {
    const {selectedRowKeys, needTotalList} = this.state
    const {alert = true, paginationSizeChanger = true, paginationQuickJumper = true} = this.props
    const {data = {}, rowKey, ...rest} = this.props
    const {list = [], pagination} = data

    const paginationProps = {
      showSizeChanger: paginationSizeChanger,
      showQuickJumper: paginationQuickJumper,
      ...pagination,
    }

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    }

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          {alert &&
          <Alert
            message={
              <Fragment>
                <span style={{marginLeft: 8}}>
                  <Trans>common.title.total</Trans>
                  &nbsp
                  <span style={{fontWeight: 600}}>
                    <a style={{fontWeight: 600}}>{pagination ? pagination.total : 0}</a>{' '}
                  </span>
                </span>
                {/* {'Сонгосон'}{' '} */}
                <Trans>common.title.selected</Trans>
                &nbsp
                <a style={{fontWeight: 600}}>{selectedRowKeys.length}</a>{' '}
                {/* {'бичлэг'} */}
                <Trans>common.title.record</Trans>
                &nbsp
                {/* {needTotalList.map(item => (
                  <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                    {item.title}
                    {'total'}
                    &nbsp
                    <span style={{ fontWeight: 600 }}>
                      {item.render ? item.render(item.total) : item.total}
                    </span>
                  </span>
                ))} */}
                <a onClick={this.cleanSelectedKeys} style={{marginLeft: 24}}>
                  {/* {'Цэвэрлэх'} */}
                  <Trans>common.action.clear</Trans>
                </a>
              </Fragment>
            }
            type='info'
            showIcon
          />
          }
        </div>
        <Table
          rowKey={rowKey || 'key'}
          // rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    )
  }
}

export default StandardTable
