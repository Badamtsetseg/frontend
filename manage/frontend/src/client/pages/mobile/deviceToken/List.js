import React, {useEffect, useState} from 'react'
import {inject, observer} from 'mobx-react'
import {Alert, Button, Card, Col, Form, Input, Row, Select, Table, Tooltip} from 'antd'
import {FileExcelTwoTone} from '@ant-design/icons'
import moment from 'moment'

import DeviceTokenImportModal from './DeviceTokenImportModal'
import styles from './List.less'

const FormItem = Form.Item
const {Option} = Select

const DeviceTokenList = observer((
  {
    deviceTokenStore
  }) => {

  const [form] = Form.useForm()
  const [importModalVisible, setImportModalVisible] = useState(false)

  useEffect(() => {
    refreshTable()
  }, [])

  const refreshTable = (params) => {
    if (params) {
      deviceTokenStore.fetchList(params)
    } else {
      deviceTokenStore.fetchList(deviceTokenStore.searchFormValues)
    }
  }

  const handleTableChange = (pagination, filtersArg, sorter) => {
    const params = Object.assign(
      deviceTokenStore.searchFormValues,
      {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
      })

    if (sorter.field) {
      params.sortOrder = `${sorter.order}`
      params.sortField = `${sorter.field}`
    }

    deviceTokenStore.setSearchFormValues(params)
    refreshTable(params)
  }

  const handleSearchFormReset = () => {
    form.resetFields()
    deviceTokenStore.setSearchFormValues({})
    refreshTable({})
  }

  const handleSearch = values => {
    deviceTokenStore.setSearchFormValues(values)
    refreshTable(values)
  }

  const renderFilterForm = () => {
    return (
      <Form
        onFinish={handleSearch}
        initialValues={deviceTokenStore.searchFormValues}
        layout='vertical'
      >
        <Row gutter={{md: 8, lg: 24, xl: 36}}>
          <Col sm={24} md={6}>
            <FormItem
              label='Device төрөл'
              name='os'
            >
              <Select
                allowClear
                placeholder='Device төрөл сонгох'
                style={{width: '100%'}}
              >
                {deviceTokenStore.deviceTypes && deviceTokenStore.deviceTypes.map(item => (
                  <Option key={item.value} value={item.value}>{item.label}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col sm={24} md={6}>
            <FormItem
              label='Token'
              name='token'
            >
              <Input
                allowClear
                placeholder='Token'
              />
            </FormItem>
          </Col>
          <Col sm={24} md={6}>
            <FormItem
              label='Device ID'
              name='deviceId'
            >
              <Input
                allowClear
                placeholder='Device ID'
              />
            </FormItem>
          </Col>
          <Col sm={24} md={6}>
            <FormItem
              label='Username'
              name='username'
            >
              <Input
                allowClear
                placeholder='АБ12345678'
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 36}}>
          <Col sm={24} md={6}>
            <FormItem
              label='IP хаяг'
              name='ip'
            >
              <Input
                allowClear
                placeholder='127.0.0.1'
              />
            </FormItem>
          </Col>
          <Col sm={24} md={6}>
            <span className={styles.submitButtons}>
              <Button type='primary' htmlType='submit'>
                Хайх
              </Button>
              <Button style={{marginLeft: 8}} onClick={handleSearchFormReset}>
                Цэвэрлэх
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }

  const handleImportModalVisible = (visible) => {
    setImportModalVisible(visible)
    if (!visible)
      handleSearchFormReset()
  }

  const columns = [
    {
      title: 'Device төрөл',
      dataIndex: 'os',
    },
    {
      title: 'Token',
      dataIndex: 'token',
      render: (text) =>
        <span>
          <div className={styles.dataItem}>
            <Tooltip title={text}>
              <small className={styles.shortText}>{text || '-'}</small>
            </Tooltip>
          </div>
        </span>,
    },
    {
      title: 'Device ID',
      dataIndex: 'deviceId',
      render: (text) =>
        <span>
          <div className={styles.dataItem}>
            <Tooltip title={text}>
              <small className={styles.shortText}>{text || '-'}</small>
            </Tooltip>
          </div>
        </span>,
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'IP хаяг',
      dataIndex: 'ip',
    },
    {
      title: 'Шинэчилсэн огноо',
      dataIndex: 'modifiedDate',
      render: (text) => <span>{text && moment(text).format('YYYY-MM-DD HH:mm:ss') || '-'}</span>,
    },
  ]

  const headerActions =
    <Button onClick={() => handleImportModalVisible(true)}>
      <FileExcelTwoTone/> Import
    </Button>

  return <Card title='Device token жагсаалт' bordered={false} extra={headerActions}>
    <div>
      <div className={styles.tableListForm}>{renderFilterForm()}</div>
    </div>
    <Table
      rowKey='key'
      loading={deviceTokenStore.loading}
      dataSource={deviceTokenStore.data && deviceTokenStore.data.list || []}
      columns={columns}
      pagination={
        deviceTokenStore.data && deviceTokenStore.data.pagination &&
        {
          ...deviceTokenStore.data.pagination,
          showSizeChanger: true,
          showQuickJumper: true,
        } || {}
      }
      onChange={handleTableChange}
      title={() => (
        <Alert
          message={
            <p style={{marginBottom: 0}}>
              Нийт тоо:{' '}
              <b>{(deviceTokenStore.data && deviceTokenStore.data.pagination && deviceTokenStore.data.pagination.total) || '-'}</b>
            </p>
          }
          type='info'
        />
      )}
    />
    <DeviceTokenImportModal modalVisible={importModalVisible} handleModalVisible={handleImportModalVisible}/>
  </Card>
})

const DeviceTokenListWrapper = inject(stores => {
  return ({
    deviceTokenStore: stores.deviceTokenStore,
  })
})(DeviceTokenList)

export default DeviceTokenListWrapper
