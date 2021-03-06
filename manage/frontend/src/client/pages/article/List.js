import React, {useEffect, useState} from 'react'
import {Alert, Avatar, Button, Card, Col, Divider, Form, Input, message, Modal, Row, Select, Table} from 'antd'
import {inject, observer} from 'mobx-react'
import {
  CheckCircleTwoTone,
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {Trans} from 'react-i18next'

import UpdateModal from './CreateUpdate'

import PageHeaderWrapper from '../../components/PageHeaderWrapper'
import styles from '../../styles/list.less'

const FormItem = Form.Item
const Confirm = Modal.confirm
const {Option} = Select

const NewsList = inject('articleStore', 'userStore')
(observer(({articleStore, userStore, userStore: {select: authors}, articleStore: {data, loading}}) => {
  const [form] = Form.useForm()
  const [updateModalVisible, setUpdateModalVisible] = useState(false)
  const [updateData, setUpdateData] = useState(null)
  const [searchFormValues, setSearchFormValues] = useState({})

  useEffect(() => {
    refreshTable()
    userStore.fetchSelect({businessRole: 'ARTICLE_ADMIN'})
  }, [])

  const {list, pagination} = data
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    ...pagination,
  }

  const refreshTable = (params) => {
    setSearchFormValues(Object.assign({type: 'ARTICLE'}, params))
    articleStore.fetchList(Object.assign({type: 'ARTICLE'}, params))
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
      setUpdateData({cover: []})
      setUpdateModalVisible(true)
    } else {
      const cover = values.cover && [values.cover] || []
      setUpdateData(Object.assign(values || {}, {cover}))
      setUpdateModalVisible(true)
    }
  }

  const closeModal = (refresh) => {
    setUpdateModalVisible(false)
    setUpdateData({cover: []})
    if (refresh)
      handleSearch()
  }

  const handleDelete = id => {
    articleStore.deleteOne({id})
      .then(response => {
        if (!response.result)
          message.error(`???????????????? ?????????? ????????????: ${response.message}`)
        else {
          message.success('?????????????????? ????????????????')
          refreshTable()
        }
      })
      .catch(e => {
        message.error(`???????????????? ?????????? ????????????: ${e.message}`)
      })
  }

  const showDeleteConfirm = clickedId => {
    const parentMethods = {handleDelete: handleDelete}

    Confirm({
      title: '??????????????????????',
      content: '?????????????? ???????????? ?????',
      okText: '????????',
      okType: 'danger',
      cancelText: '????????',
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
              label='????????????'
              name='name'
            >
              <Input placeholder='????????????'/>
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem
              label='????????????????'
              name='authorId'
            >
              <Select
                showSearch
                optionFilterProp='children'
                allowClear
                placeholder='????????????'
                style={{width: '100%'}}
                showAction={['focus', 'click']}
              >
                <Option key={null} value={null}>????????</Option>
                {
                  authors && authors.map(item =>
                    <Option key={item.key} value={item.key}>{item.username} - {item.firstName}</Option>,
                  )
                }
              </Select>
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem
              label='???????????????? ????????'
              name='visible'
            >
              <Select
                showSearch
                optionFilterProp='children'
                allowClear
                placeholder='????????????'
                style={{width: '100%'}}
                showAction={['focus', 'click']}
              >
                <Option key={null} value={null}>????????</Option>
                <Option key='TRUE' value={true}>????????</Option>
                <Option key='FALSE' value={false}>????????</Option>
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
      title: '??????????',
      dataIndex: 'coverUrl',
      render: (text, record) =>
        text ?
          <Avatar size='large' src={text} style={{backgroundColor: record.backgroundColor || '#ffffff'}}/>
          :
          <Avatar size='large' icon={<FileImageOutlined/>}/>,
      width: '80px',
      align: 'center',
    },
    {
      title: '????????????',
      dataIndex: 'title',
    },
    {
      title: '???????? ????????????????',
      dataIndex: 'shortContent',
    },
    {
      title: '????????????????',
      dataIndex: 'authorName',
    },
    {
      title: 'Hot',
      dataIndex: 'hot',
      render: text => (text ? <CheckCircleTwoTone/> : <CloseCircleFilled/>),
      align: 'center',
      width: '80px',
    },
    {
      title: '??????????????????',
      dataIndex: 'premium',
      render: text => (text ? <CheckCircleTwoTone/> : <CloseCircleFilled/>),
      align: 'center',
      width: '95px',
    },
    {
      title: '????????????????',
      dataIndex: 'visible',
      render: text => (text ? <CheckCircleTwoTone/> : <CloseCircleFilled/>),
      width: '95px',
      align: 'center',
    },
    {
      title: '????????????',
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
      ??????????????
    </Button>
  )

  return (
    <PageHeaderWrapper title='???????????????????? ????????????????' action={headerActions}>
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
                  ???????? ??????:{' '}
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

export default NewsList
