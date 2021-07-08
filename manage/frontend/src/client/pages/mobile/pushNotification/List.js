import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {inject, observer} from 'mobx-react'
import {Alert, Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, Tag, Tooltip} from 'antd'
import {EditTwoTone, PlusOutlined} from '@ant-design/icons'
import moment from 'moment'

import styles from './List.less'

const FormItem = Form.Item
const {Option} = Select
const {RangePicker} = DatePicker

const PushNotificationList = inject('pushNotificationStore')
(observer(({pushNotificationStore, pushNotificationStore: {searchFormValues, data, loading}, history}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    refreshTable()
  }, [])

  const refreshTable = (params) => {
    if (params) {
      pushNotificationStore.fetchList(params)
    } else {
      pushNotificationStore.fetchList(searchFormValues)
    }
  }

  const handleTableChange = (pagination, filtersArg, sorter) => {
    const params = Object.assign(
      searchFormValues,
      {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
      })

    if (sorter.field) {
      params.sortOrder = `${sorter.order}`
      params.sortField = `${sorter.field}`
    }

    pushNotificationStore.setSearchFormValues(params)
    refreshTable(params)
  }

  const handleSearchFormReset = () => {
    form.resetFields()
    pushNotificationStore.setSearchFormValues({})
    refreshTable({})
  }

  const handleSearch = values => {
    const {sentDate, ...rest} = values

    let sentDate1 = null
    let sentDate2 = null
    if (sentDate && sentDate.length !== 0) {
      sentDate1 = moment(sentDate[0]).format('YYYY-MM-DD')
      sentDate2 = moment(sentDate[1]).format('YYYY-MM-DD')
    }
    const payload = Object.assign(rest, {sentDate1, sentDate2})
    pushNotificationStore.setSearchFormValues(payload)

    refreshTable(payload)
  }

  const renderFilterForm = () => {
    return (
      <Form
        form={form}
        onFinish={handleSearch}
        layout='vertical'
      >
        <Row gutter={{md: 8, lg: 24, xl: 36}}>
          <Col sm={24} md={6}>
            <FormItem
              label='Илгээсэн огноо'
              name='sentDate'
              initialValue={
                searchFormValues
                && searchFormValues.sentDate1
                && searchFormValues.sentDate2 !== 0
                && [moment(searchFormValues.sentDate1), moment(searchFormValues.sentDate2)]}
            >
              <RangePicker
                format='YYYY-MM-DD'
                placeholder={['Эхлэх огноо', 'Дуусах огноо']}
                // onChange={() => this.handleChangeSearchFields()}
              />
            </FormItem>
          </Col>
          <Col sm={24} md={4}>
            <FormItem
              label='Төрөл'
              name='type'
              initialValue={searchFormValues && searchFormValues.type}
            >
              <Select
                allowClear
                placeholder='Төрөл сонгох'
                style={{width: '100%'}}
                // onChange={() => this.handleChangeSearchFields()}
              >
                {pushNotificationStore.types && pushNotificationStore.types.map(item => (
                  <Option key={item.value} value={item.value}>{item.label}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col sm={24} md={6}>
            <FormItem
              label='Гарчиг'
              name='title'
              initialValue={searchFormValues && searchFormValues.title}
            >
              <Input
                allowClear
                placeholder='Гарчиг'
                // onChange={() => this.handleChangeSearchFields()}
              />
            </FormItem>
          </Col>
          <Col sm={24} md={4}>
            <FormItem
              label='Илгээх төрөл'
              name='sendType'
              initialValue={searchFormValues && searchFormValues.sendType}
            >
              <Select
                allowClear
                placeholder='Илгээх төрөл сонгох'
                style={{width: '100%'}}
                // onChange={() => this.handleChangeSearchFields()}
              >
                {pushNotificationStore.sendTypes && pushNotificationStore.sendTypes.map(item => (
                  <Option key={item.value} value={item.value}>{item.label}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 36}}>
          <Col sm={24} md={6}>
            <FormItem
              label='Хүлээн авагчийн төрөл'
              name='receiverType'
              initialValue={searchFormValues && searchFormValues.receiverType}
            >
              <Select
                allowClear
                placeholder='Хүлээн авагчийн төрөл сонгох'
                style={{width: '100%'}}
                // onChange={() => this.handleChangeSearchFields()}
              >
                {pushNotificationStore.receiverTypes && pushNotificationStore.receiverTypes.map(item => (
                  <Option key={item.value} value={item.value}>{item.label}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col sm={24} md={6}>
            <FormItem
              label='Хүлээн авагч'
              name='receiver'
              initialValue={searchFormValues && searchFormValues.receiver}
            >
              <Input
                allowClear
                placeholder='Хүлээн авагч'
                // onChange={() => this.handleChangeSearchFields()}
              />
            </FormItem>
          </Col>
          <Col sm={24} md={4}>
            <FormItem
              label='Priority'
              name='priority'
              initialValue={searchFormValues && searchFormValues.priority}
            >
              <Select
                allowClear
                placeholder='Priority сонгох'
                style={{width: '100%'}}
                // onChange={() => this.handleChangeSearchFields()}
              >
                {pushNotificationStore.priorities && pushNotificationStore.priorities.map(item => (
                  <Option key={item.value} value={item.value}>{item.label}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col sm={24} md={4}>
            <FormItem
              label='Илгээсэн эсэх'
              name='sendResult'
              initialValue={searchFormValues && searchFormValues.sendResult}
            >
              <Select
                allowClear
                placeholder='Илгээсэн эсэх сонгох'
                style={{width: '100%'}}
                // onChange={() => this.handleChangeSearchFields()}
              >
                <Option key='true' value='true'>Тийм</Option>
                <Option key='false' value='false'>Үгүй</Option>
              </Select>
            </FormItem>
          </Col>
          <Col sm={24} md={4}>
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

  const columns = [
    {
      title: 'Төрөл',
      dataIndex: 'type',
      // sorter: true,
      render: (text, record) =>
        <span>
          <div className={styles.dataItem}>
            <small>Төрөл: <b>{record.type || '-'}</b></small>
            <small>Priority: <b>{record.priority || '-'}</b></small>
          </div>
        </span>,
    },
    {
      title: 'Гарчиг',
      dataIndex: 'title',
      // width: '250px',
    },
    {
      title: 'Илгээх хэлбэр',
      dataIndex: 'sendType',
      // sorter: true,
      render: (text, record) =>
        <span>
          <div className={styles.dataItem}>
            <small>Төрөл: <b>{record.sendType || '-'}</b></small>
            <small>
              Илгээх огноо: <b>{record.scheduledDate && moment(record.scheduledDate).format('YYYY-MM-DD HH:mm:ss') || '-'}</b>
            </small>
          </div>
        </span>,
    },
    {
      title: 'Хүлээн авагч',
      dataIndex: 'receiverType',
      render: (text, record) =>
        <span>
          <div className={styles.dataItem}>
            <small>Төрөл: <b>{record.receiverType || '-'}</b></small>
            <Tooltip title={record.receiver}>
              <small className={styles.shortText}>Username / Token: <b>{record.receiver || '-'}</b></small>
            </Tooltip>
          </div>
        </span>,
    },
    {
      title: 'Төлөв',
      dataIndex: 'sendResult',
      render: (text, record) =>
        <span>
          <div className={styles.dataItem}>
            <small>
              Төлөв:
              {record.sendResult === true &&
              <Tag color='green'>
                Амжилттай
              </Tag>}
              {record.sendResult === false &&
              <Tag color='red'>
                Амжилтгүй
              </Tag>}
            </small>
            <small>
              Илгээсэн огноо: <b>{record.sentDate && moment(record.sentDate).format('YYYY-MM-DD HH:mm:ss') || '-'}</b>
            </small>
          </div>
        </span>,
    },
    {
      title: 'Үр дүн',
      dataIndex: 'resultMessage',
      render: (text, record) =>
        <span>
          <div className={styles.dataItem}>
            <small>Амжилттай тоо: <b>{record.successCount || '-'}</b></small>
            <small>Амжилтгүй тоо: <b>{record.failureCount || '-'}</b></small>
            <Tooltip title={record.resultMessage}>
              <small className={styles.shortText}>Мессеж: <b>{record.resultMessage || '-'}</b></small>
            </Tooltip>
          </div>
        </span>,
    },
    {
      title: 'Үйлдэл',
      dataIndex: 'action',
      render: (text, record) => (
        <>
          {
            record.sendResult === null
            && <Tooltip placement='top' title='Засварлах'>
              <Button
                type='dashed'
                size='small'
                style={{marginLeft: 5}}
                onClick={() => history.push(`/mobile/push-notification/${record.id}`)}
              >
                <EditTwoTone/>
              </Button>
            </Tooltip>
          }
        </>
      ),
      width: '150px',
    },
  ]

  const headerActions = <Link to='/mobile/push-notification/create'>
    <Button icon={<PlusOutlined/>} type='primary'>
      Бүртгэх
    </Button>
  </Link>

  return <Card title='Push notification жагсаалт' bordered={false} extra={headerActions}>
    <div>
      <div className={styles.tableListForm}>{renderFilterForm()}</div>
    </div>
    <Table
      rowKey='key'
      loading={loading}
      dataSource={data && data.list || []}
      columns={columns}
      pagination={
        data && data.pagination
        && {...pushNotificationStore.data.pagination, showSizeChanger: true, showQuickJumper: true} || {}
      }
      onChange={handleTableChange}
      title={() => (
        <Alert
          message={
            <p style={{marginBottom: 0}}>
              Нийт тоо:{' '}<b>{data && data.pagination && data.pagination.total || '-'}</b>
            </p>
          }
          type='info'
        />
      )}
    />
  </Card>
}))

export default PushNotificationList
