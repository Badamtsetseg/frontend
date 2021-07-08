import React, {useEffect, useState} from 'react'
import {Alert, Button, Card, Col, Divider, Form, Input, message, Modal, Row, Table, Tooltip} from 'antd'
import {inject, observer} from 'mobx-react'
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons'
import {Trans} from 'react-i18next'

import CreateModal from './Create'
import UpdateModal from './Update'

import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import styles from '../../../styles/list.less'

const FormItem = Form.Item
const Confirm = Modal.confirm

const CountryList = inject('countryStore')
(observer(({countryStore, countryStore: {data, loading}}) => {
  const [form] = Form.useForm()
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [updateModalVisible, setUpdateModalVisible] = useState(false)
  const [updateData, setUpdateData] = useState({})
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
    setSearchFormValues(params || {})
    countryStore.fetchList(
      Object.assign(
        params || {},
        {sortParams: ['order'].join(), sortDirection: 'ASC'}),
    )
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
    if (isCreate)
      setCreateModalVisible(true)
    else {
      setUpdateData(values)
      setUpdateModalVisible(true)
    }
  }

  const closeModal = (refresh) => {
    setCreateModalVisible(false)
    setUpdateModalVisible(false)
    if (refresh)
      handleSearch()
  }

  const handleDelete = id => {
    countryStore.deleteOne({id})
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
      content: 'Улс устгах уу?',
      okText: 'Тийм',
      okType: 'danger',
      cancelText: 'Үгүй',
      onOk() {
        parentMethods.handleDelete(clickedId)
      },
    })
  }

  const renderCreateModal = () => {
    return (
      <CreateModal
        visible={createModalVisible}
        closeModal={closeModal}
      />
    )
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
              label='Нэр'
              name='name'
            >
              <Input placeholder='Нэр'/>
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
      title: 'Код',
      dataIndex: 'code',
      width: '150px',
    },
    {
      title: 'Улсын нэр',
      dataIndex: 'name',
    },
    {
      title: <Tooltip title='Их сургуульд ашиглагдах эсэх'>Их сургууль</Tooltip>,
      dataIndex: 'university',
      render: (text) => <span>{text ? 'Тийм' : 'Үгүй'}</span>,
      width: '150px',
    },
    {
      title: <Tooltip title='Тэтгэлэгт ашиглагдах эсэх'>Тэтгэлэг</Tooltip>,
      dataIndex: 'scholarship',
      render: (text) => <span>{text ? 'Тийм' : 'Үгүй'}</span>,
      width: '150px',
    },
    {
      title: 'Эрэмбэ',
      dataIndex: 'order',
      width: '80px',
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
    <PageHeaderWrapper title='Улсын жагсаалт' action={headerActions}>
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
      {renderCreateModal()}
      {renderUpdateModal()}
    </PageHeaderWrapper>
  )
}))

export default CountryList
