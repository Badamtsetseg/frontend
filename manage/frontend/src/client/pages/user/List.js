import React, {useState, useEffect} from 'react'
import {Alert, Button, Card, Col, Divider, Form, Input, message, Modal, Row, Select, Table, Tag, Tooltip} from 'antd'
import {
  CheckCircleTwoTone, CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
  PhoneOutlined,
  PlusOutlined,
  SendOutlined,
} from '@ant-design/icons'
import {inject, observer} from 'mobx-react'
import {Trans} from 'react-i18next'

import PageHeaderWrapper from '../../components/PageHeaderWrapper'
import CreateUpdateModal from './CreateUpdate'
import styles from '../../styles/list.less'

const FormItem = Form.Item
const {Option} = Select
const Confirm = Modal.confirm

const UserList = inject('userStore', 'businessRoleStore')
(observer(({userStore, businessRoleStore}) => {
  const [form] = Form.useForm()
  const [updateModalVisible, setUpdateModalVisible] = useState(false)
  const [updateData, setUpdateData] = useState({})
  const [searchFormValues, setSearchFormValues] = useState({})

  useEffect(() => {
    businessRoleStore.fetchSelect()
    userStore.fetchSources()
    refreshTable()
  }, [])

  const refreshTable = (params) => {
    const payload = Object.assign({active: true}, params)
    userStore.fetchList(payload)
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

  const handleSearchFormReset = () => {
    form.resetFields()
    setSearchFormValues({})
    refreshTable()
  }

  const showDeleteConfirm = id => {
    const parentMethods = {handleDelete: handleDelete}

    Confirm({
      title: 'Анхааруулга',
      content: 'Сонгосон хэрэглэгчийг устгах уу?',
      okText: 'Тийм',
      okType: 'danger',
      cancelText: 'Үгүй',
      onOk() {
        parentMethods.handleDelete(id)
      },
    })
  }

  const handleDelete = id => {
    userStore.deleteOne(id)
      .then(response => {
        if (!response.result) {
          message.error(`Хэрэглэгч устгахад алдаа гарлаа: ${response.message}`)
        }
        refreshTable(searchFormValues)
      })
      .catch(e => {
        message.error(`Хэрэглэгч устгахад алдаа гарлаа: ${e.message}`)
      })
  }

  const handleSearch = () => {
    setSearchFormValues(form.getFieldsValue())
    refreshTable(form.getFieldsValue())
  }

  const renderFilterForm = () => {
    return (
      <Form
        form={form}
        onFinish={handleSearch}
      >
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col lg={4} md={12} sm={24}>
            <FormItem
              label='Эрх'
              name='businessRole'
            >
              <Select style={{width: '100%'}}>
                <Option key='' value=''>Бүгд</Option>
                {
                  businessRoleStore.select &&
                  businessRoleStore.select.map(bRole => <Option key={bRole.key} value={bRole.role}>{bRole.name}</Option>)
                }
              </Select>
            </FormItem>
          </Col>
          <Col lg={5} md={12} sm={24}>
            <FormItem
              label='Бүртгүүлсэн суваг'
              name='source'
            >
              <Select style={{width: '100%'}} allowClear>
                {
                  userStore.sources && userStore.sources.map(source => <Option key={source} value={source}>{source}</Option>)
                }
              </Select>
            </FormItem>
          </Col>
          <Col lg={4} md={12} sm={24}>
            <FormItem
              label='Идэвхтэй'
              name='active'
            >
              <Select style={{width: '100%'}} allowClear>
                <Option value={true}>Тийм</Option>
                <Option value={false}>Үгүй</Option>
              </Select>
            </FormItem>
          </Col>
          <Col lg={4} md={12} sm={24}/>
          <Col lg={4} md={12} sm={24}>
            <FormItem
              label='Хайх'
              name='search'
            >
              <Input/>
            </FormItem>
          </Col>
          <Col lg={3} md={12} sm={24}>
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

  const showModal = (values) => {
    const avatar = values && values.avatar && [values.avatar] || []
    setUpdateData(Object.assign(values || {}, {avatar}))
    setUpdateModalVisible(true)
  }

  const closeModal = (refresh) => {
    setUpdateModalVisible(false)
    setUpdateData({})
    if (refresh)
      handleSearch()
  }

  const resendActivation = id => {
    if (!userStore.sendingActivationEmail) {
      Confirm({
        title: 'Анхааруулга',
        content: 'Баталгаажуулах код дахин илгээх үү?',
        okText: 'Тийм',
        okType: 'confirm',
        cancelText: 'Үгүй',
        onOk() {
          userStore.resendActivationEmail(id)
            .then(response => {
              if (response.result === true) {
                message.success('И-мэйл амжилттай илгээлээ')
              } else {
                message.error(`И-мэйл илгээхэд амжилтгүй боллоо: ${response.message}`)
              }
            })
            .catch(e => {
              message.error(`И-мэйл илгээхэд алдаа гарлаа: ${e.message}`)
            })
        },
      })
    } else {
      message.error('Мэйл илгээж байна, та түр хүлээнэ үү')
    }
  }

  const columns = [
    {
      title: 'Нэвтрэх нэр / и-мэйл',
      dataIndex: 'username',
      render: (text, record) => (
        <>
          {record.username}
          <br/>{record.email}
        </>
      ),
    },
    {
      title: 'Эрх',
      dataIndex: 'businessRole',
    },
    {
      title: 'Овог нэр',
      dataIndex: 'lastName',
      render: (text, record) => (
        <>
          Овог: {record.lastName}
          <br/>Нэр: {record.firstName}
        </>
      ),
    },
    {
      title: 'Холбогдох утас',
      dataIndex: 'mobile',
      render: (text) => (
        <Tag><PhoneOutlined/> {text}</Tag>
      ),
    },
    {
      title: 'Бүртгүүлсэн',
      dataIndex: 'createdDateText',
      render: (text, record) => (
        <>
          <Tag color='blue'>{record.source}</Tag>
          <br/>Бүртгүүлсэн: {text}
          <br/>Идэвхжүүлсэн: {record.activatedDateText}
        </>
      )
    },
    {
      title: 'Идэвхтэй',
      dataIndex: 'active',
      render: (text) => (
        <>
          {text ? <CheckCircleTwoTone/> : <CloseCircleFilled/>}
        </>
      ),
    },
    {
      title: 'Premium',
      dataIndex: 'premium',
      render: (text) => (
        <>
          {text ? <CheckCircleTwoTone/> : <CloseCircleFilled/>}
        </>
      ),
    },
    {
      title: 'Үйлдэл',
      render: (text, record) => (
        <>
          <a key='edit' onClick={() => showModal(record)}>
            <Tooltip title='Засварлах'>
              <EditOutlined/>
            </Tooltip>
          </a>
          <Divider type='vertical'/>
          <a key='delete' onClick={() => showDeleteConfirm(record.key)}>
            <Tooltip title='Устгах'>
              <DeleteOutlined/>
            </Tooltip>
          </a>
          {
            record.active === false &&
            <>
              <Divider type='vertical'/>
              <a key='resend-activation' onClick={() => resendActivation(record.id)}>
                <Tooltip title='Баталгаажуулах мэйл илгээх'>
                  <SendOutlined/>
                </Tooltip>
              </a>
            </>
          }
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
    <PageHeaderWrapper title='Системийн хэрэглэгчид' action={headerActions}>
      <Card bordered={false}>
        <div className={styles.tableListForm}>{renderFilterForm()}</div>
        <Table
          rowKey='key'
          loading={userStore.loading}
          columns={columns}
          dataSource={userStore.data != null ? userStore.data.list : []}
          pagination={userStore.data != null ? userStore.data.pagination : []}
          onChange={handleTableChange}
          title={() => (
            <Alert
              message={
                <p style={{marginBottom: 0}}>
                  Нийт тоо:{' '}
                  <b>{(userStore.data && userStore.data.pagination && userStore.data.pagination.total) || '-'}</b>
                </p>
              }
              type='info'
            />
          )}
        />
      </Card>
      {
        updateModalVisible &&
        <CreateUpdateModal
          visible={updateModalVisible}
          updateData={updateData}
          closeModal={closeModal}
        />
      }
    </PageHeaderWrapper>
  )
}))

export default UserList
