import React, {useEffect, useState} from 'react'
import {Alert, Button, Card, Col, Divider, Form, Input, message, Modal, Row, Select, Table, Tag} from 'antd'
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons'
import {inject, observer} from 'mobx-react'
import {Trans} from 'react-i18next'

import PageHeaderWrapper from '../../components/PageHeaderWrapper'
import CreateUpdateModal from './CreateUpdate'
import styles from '../../styles/list.less'

const FormItem = Form.Item
const {Option} = Select
const Confirm = Modal.confirm

const BusinessRoleList = inject('applicationRoleStore', 'businessRoleStore')
(observer(({applicationRoleStore, businessRoleStore, businessRoleStore: {data, loading}}) => {
  const [form] = Form.useForm()
  const [updateModalVisible, setUpdateModalVisible] = useState(false)
  const [updateData, setUpdateData] = useState({})
  const [searchFormValues, setSearchFormValues] = useState({})

  useEffect(() => {
    applicationRoleStore.fetchRoles()
    refreshTable()
  }, [])

  const refreshTable = (params) => {
    businessRoleStore.fetchSelect()
    businessRoleStore.fetchList(params)
  }

  const handleSearch = () => {
    setSearchFormValues(form.getFieldsValue())
    refreshTable(form.getFieldsValue())
  }

  const handleSearchFormReset = () => {
    form.resetFields()
    setSearchFormValues({})
    refreshTable()
  }

  const handleTableChange = (pagination, filtersArg, sorter) => {
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...searchFormValues,
    }
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`
    }
    refreshTable(params)
  }

  const showModal = (values) => {
    setUpdateData(values)
    setUpdateModalVisible(true)
  }

  const closeModal = (refresh) => {
    setUpdateModalVisible(false)
    setUpdateData({})
    if (refresh)
      handleSearch()
  }

  const showDeleteConfirm = clickedId => {
    const parentMethods = {handleDelete: handleDelete}

    Confirm({
      title: 'Анхааруулга',
      content: 'Цахим ажлын байрыг устгах уу? Тухайн төрөлд хамаарах хэрэглэгчид системд нэвтрэх боломжгүй болно',
      okText: 'Тийм',
      okType: 'danger',
      cancelText: 'Үгүй',
      onOk() {
        parentMethods.handleDelete(clickedId)
      },
    })
  }

  const handleDelete = id => {
    businessRoleStore.deleteOne({id})
      .then(response => {
        if (!response.result)
          message.error(`Цахим ажлын байр устгахад алдаа гарлаа: ${response.message}`)
        refreshTable(searchFormValues)
      })
      .catch(e => {
        message.error(`Цахим ажлын байр устгахад алдаа гарлаа: ${e.message}`)
      })
  }

  const renderFilterForm = () => {
    return (
      <Form
        form={form}
        onFinish={handleSearch}
      >
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col lg={8} md={12} sm={24}>
            <FormItem
              label='Цахим ажлын байр'
              name='role'
            >
              <Input placeholder='Цахим ажлын байр'/>
            </FormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <FormItem
              label='Хандах эрхүүд'
              name='applicationRoles'
            >
              <Select style={{width: '100%'}}>
                <Option key='' value=''>Бүгд</Option>
                {
                  applicationRoleStore && applicationRoleStore.list.map(appRole =>
                    <Option key={appRole} value={appRole}>{appRole}</Option>)
                }
              </Select>
            </FormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
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

  const renderUpdateModal = () => {
    return (
      <CreateUpdateModal
        visible={updateModalVisible}
        updateData={updateData}
        closeModal={closeModal}
      />
    )
  }

  const columns = [
    {
      title: 'Нэр',
      dataIndex: 'name',
    },
    {
      title: 'Цахим ажлын байр',
      dataIndex: 'role',
    },
    {
      title: 'Хандах эрхүүд',
      dataIndex: 'applicationRoles',
      render: (text, record) => (
        <span>
          {
            record.applicationRoles != null
              ? record.applicationRoles.map(appRole =>
                <Tag color='blue' key={`${record.role}_${appRole}`}>{appRole}</Tag>,
              ) : ''
          }
        </span>
      ),
    },
    {
      title: 'Зөвшөөрөгдсөн эрхүүд',
      dataIndex: 'accessibleBusinessRoles',
      render: (text, record) => (
        <span>
          {
            record.accessibleRoleNames ?
              record.accessibleRoleNames.map((appRole, index) => (
                <Tag color='blue' key={`${appRole}${index}`}>{appRole}</Tag>
              ))
              : null
          }
        </span>
      ),
    },
    {
      title: 'Үйлдэл',
      render: (text, record) => (
        <>
          <a key='edit' onClick={() => showModal(record)}>
            <EditOutlined/>
          </a>
          <Divider type='vertical'/>
          <a key='delete' onClick={() => showDeleteConfirm(record.key)}>
            <DeleteOutlined/>
          </a>
        </>
      ),
    },
  ]

  const headerActions = (
    <Button icon={<PlusOutlined/>} type='primary' onClick={() => showModal({})}>
      Бүртгэх
    </Button>
  )

  return (
    <PageHeaderWrapper title='Цахим ажлын байр' action={headerActions}>
      <Card bordered={false}>
        <div className={styles.tableListForm}>{renderFilterForm()}</div>
        <Table
          rowKey='key'
          loading={loading}
          columns={columns}
          dataSource={businessRoleStore.data && businessRoleStore.data.list || []}
          pagination={businessRoleStore.data && businessRoleStore.data.pagination || {}}
          onChange={handleTableChange}
          title={() => (
            <Alert
              message={
                <p style={{marginBottom: 0}}>
                  Нийт тоо:{' '}
                  <b>{(businessRoleStore.data && businessRoleStore.data.pagination && businessRoleStore.data.pagination.total) || '-'}</b>
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

export default BusinessRoleList
