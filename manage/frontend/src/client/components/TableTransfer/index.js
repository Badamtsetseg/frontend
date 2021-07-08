import React, {Component} from 'react'
import {Table, Transfer} from 'antd'

class TableTransfer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRowKeys: [],
    }
  }

  render() {
    const {leftColumns, rightColumns, ...restProps} = this.props

    return (
      <Transfer {...restProps} showSelectAll>
        {(
          {
            direction,
            filteredItems,
            onItemSelectAll,
            onItemSelect,
            selectedKeys: listSelectedKeys,
            disabled: listDisabled,
          }) => {
          const columns = direction === 'left' ? leftColumns : rightColumns

          const rowSelection = {
            // getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
            onSelectAll(selected, selectedRows) {
              const treeSelectedKeys = selectedRows.map(({key}) => key)
              // const diffKeys = selected ? difference(treeSelectedKeys, listSelectedKeys) : difference(listSelectedKeys, treeSelectedKeys)
              const diffKeys = selected ? treeSelectedKeys : listSelectedKeys
              onItemSelectAll(diffKeys, selected)
            },
            onSelect({key}, selected) {
              onItemSelect(key, selected)
            },
            selectedRowKeys: listSelectedKeys,
          }

          return (
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredItems}
              size='small'
              style={{pointerEvents: listDisabled ? 'none' : null}}
              onRow={({key, disabled: itemDisabled}) => ({
                onClick: () => {
                  if (itemDisabled || listDisabled) return
                  onItemSelect(key, !listSelectedKeys.includes(key))
                },
              })}
            />
          )
        }}
      </Transfer>
    )
  }
}

export default TableTransfer
