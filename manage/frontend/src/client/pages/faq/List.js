import React, {useEffect, useState} from 'react'
import {Alert, Button, Card, Col, Divider, Form, Input, message, Modal, Row, Select, Table} from 'antd'
import {inject, observer} from 'mobx-react'
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons'
import {Trans} from 'react-i18next'

import UpdateModal from './CreateUpdate'
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
import styles from '../../styles/list.less'

const FormItem = Form.Item
const Confirm = Modal.confirm
const {Option} = Select

const FaqList = inject('faqStore')
(observer(({faqStore, faqStore: {data, loading}}) => {
  const [form] = Form.useForm()
  const [updateModalVisible, setUpdateModalVisible] = useState(false)
  const [updateData, setUpdateData] = useState(null)
  const [searchFormValues, setSearchFormValues] = useState({})

  useEffect(() => {
    refreshTable()
  }, [])

  const {list, pagination} = data
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    ...pagination,
  }

  const refreshTable = (params) => {
    setSearchFormValues(params)
    faqStore.fetchList(params)
  }

  const handleSearch = () => {
    const payload = form.getFieldsValue()
    setSearchFormValues(form.getFieldsValue())
    refreshTable(payload)
  }

  const handleSearchFormReset = () => {
    form.resetFields()
    setSearchFormValues(form.getFieldsValue())
    refreshTable()
  }

  const handleTableChange = (pagination, filtersArg, sorter) => {
    const params = {
      ...searchFormValues,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    }
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`
    }
    refreshTable(params)
  }

  const showModal = (isCreate, values) => {
    if (isCreate) {
      setUpdateData({visible: true})
      setUpdateModalVisible(true)
    } else {
      setUpdateData(values)
      setUpdateModalVisible(true)
    }
  }

  const closeModal = (refresh) => {
    setUpdateModalVisible(false)
    setUpdateData({})
    if (refresh)
      handleSearch()
  }

  const handleDelete = id => {
    faqStore.deleteOne({id})
      .then(response => {
        if (!response.result)
          message.error(`Устгахад алдаа гарлаа: ${response.message}`)
        else {
          message.success('Амжилттай устгалаа')
          refreshTable()
        }
      })
      .catch(e => {
        message.error(`Устгахад алдаа гарлаа: ${e.message}`)
      })
  }

  const showDeleteConfirm = clickedId => {
    const parentMethods = {handleDelete: handleDelete}

    Confirm({
      title: 'Анхааруулга',
      content: 'Асуулт, хариулт устгах уу?',
      okText: 'Тийм',
      okType: 'danger',
      cancelText: 'Үгүй',
      onOk() {
        parentMethods.handleDelete(clickedId)
      },
    })
  }

  const renderUpdateModal = () => {
    return (
      <UpdateModal
        updateData={updateData}
        visible={updateModalVisible}
        closeModal={closeModal}
      />
    )
  }

  const renderFilterForm = () => {
    return (
      <Form form={form} onFinish={handleSearch}>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col lg={6} md={12} sm={24}>
            <FormItem
              label='Асуулт'
              name='question'
            >
              <Input placeholder='Асуулт'/>
            </FormItem>
          </Col>
          <Col lg={6} md={12} sm={24}>
            <FormItem
              label='Хариулт'
              name='answer'
            >
              <Input placeholder='Хариулт'/>
            </FormItem>
          </Col>
          <Col lg={6} md={12} sm={24}>
            <FormItem
              label='Харуулах эсэх'
              name='visible'
            >
              <Select
                showSearch
                optionFilterProp='children'
                allowClear
                placeholder='Сонгох'
                style={{width: '100%'}}
                showAction={['focus', 'click']}
              >
                <Option key={null} value={null}>Бүгд</Option>
                <Option key='TRUE' value={true}>Тийм</Option>
                <Option key='FALSE' value={false}>Үгүй</Option>
              </Select>
            </FormItem>
          </Col>
          <Col lg={6} md={12} sm={24}>
            <span className={styles.submitButtons}>
              <Button type='primary' htmlType='submit'>
                <Trans>common.action.search</Trans>
              </Button>
              <Button style={{marginLeft: 8}} onClick={handleSearchFormReset}>
                <Trans>common.action.clear</Trans>
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }

  const columns = [
    {
      title: 'Эрэмбэ',
      dataIndex: 'order',
      width: '30px',
    },
    {
      title: 'Асуулт',
      dataIndex: 'question',
    },
    {
      title: 'Хариулт',
      dataIndex: 'answer',
    },
    {
      title: 'Харуулах эсэх',
      dataIndex: 'visible',
      render: text => <span>{text ? 'Тийм' : 'Үгүй'}</span>,
      align: 'center',
      width: '100px',
    },
    {
      title: 'Үйлдэл',
      render: (text, record) => (
        <>
          <a
            key='edit'
            onClick={() => showModal(false, record)}
          >
            <EditOutlined/>
          </a>
          <Divider type='vertical'/>
          <a
            key='delete'
            onClick={() => showDeleteConfirm(record.id)}
          >
            <DeleteOutlined/>
          </a>
        </>
      ),
      width: '100px',
    },
  ]

  const headerActions = (
    <Button
      icon={<PlusOutlined/>}
      type='primary'
      onClick={() => showModal(true)}
    >
      Бүртгэх
    </Button>
  )

  return (
    <PageHeaderWrapper title='Түгээмэл асуулт, хариултын жагсаалт' action={headerActions}>
      <Card bordered={false}>
        <div className={styles.tableListForm}>{renderFilterForm()}</div>
        <Table
          rowKey='key'
          loading={loading}
          columns={columns}
          dataSource={list}
          pagination={paginationProps}
          onChange={handleTableChange}
          title={() => (
            <Alert
              message={
                <p style={{marginBottom: 0}}>
                  Нийт тоо:{' '}
                  <b>{(pagination && pagination.total) || '-'}</b>
                </p>
              }
              type='info'
            />
          )}
        />
      </Card>
      {renderUpdateModal()}
    </PageHeaderWrapper>
  )
}))

export default FaqList
