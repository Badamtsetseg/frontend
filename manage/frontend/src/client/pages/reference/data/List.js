import React, {useEffect, useState} from 'react'
import {Alert, Button, Card, Col, Divider, Form, Input, Popconfirm, Row, Select, Table, Tag, Tooltip} from 'antd'
import {inject, observer} from 'mobx-react'
import {Trans} from 'react-i18next'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import DynamicIcon from '../../../components/DynamicIcon'

import ReferenceDataModal from './referenceDataModal'

const FormItem = Form.Item
const {Option} = Select

const ReferenceData = observer((
  {
    referenceTypeStore,
    referenceDataStore,
    referenceDataStore: {data, loading, searchFormValues},
  }) => {

  const [form] = Form.useForm()
  const {list, pagination} = data
  const [visible, setVisible] = useState(false)
  const [editData, setEditData] = useState({})
  const [title, setTitle] = useState('')

  useEffect(() => {
    refreshTable()
  }, [])

  const refreshTable = (params) => {
    referenceDataStore.fetchList(params)
  }

  const handleTableChange = (pagination) => {
    const params = {
      ...searchFormValues,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    }
    refreshTable(params)
  }

  const handleSearch = () => {
    referenceDataStore.setSearchFormValues(form.getFieldsValue())
    refreshTable(form.getFieldsValue())
  }

  const handleFormReset = () => {
    form.resetFields()
    referenceDataStore.setSearchFormValues({})
    refreshTable()
  }

  const showModal = (action, values) => {
    switch (action) {
      case 'CREATE':
        setEditData({})
        setTitle('бүртгэх')
        setVisible(true)
        break
      case 'UPDATE':
        setEditData(values)
        setTitle('засах')
        setVisible(true)
        break
      default:
        return ''
    }
  }

  const handleDelete = (record) => {
    referenceDataStore.deleteOne({id: record.id}).then((response) => {
      if (response && response.result) {
        refreshTable()
      }
    })
  }

  const renderModal = () => {
    return (
      <ReferenceDataModal
        editData={editData}
        visible={visible}
        closeModal={() => setVisible(false)}
        title={title}
        refreshTable={refreshTable}
      />
    )
  }

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    ...pagination,
  }

  const renderFilterForm = () => {
    const makeOptionReferenceType = item => (
      <Option key={item.key || item.id} value={item.code}>
        {`${item.name} - ${item.code}`}
      </Option>
    )

    return (
      <>
        <Form form={form} onFinish={handleSearch}>
          <Row gutter={25}>
            <Col span={8}>
              <FormItem
                label='Лавлах сангийн нэр'
                name='typeCode'
                className='mb10'
              >
                <Select
                  showSearch
                  optionFilterProp='children'
                  allowClear
                  placeholder='Сонгох'
                  style={{width: '100%'}}
                >
                  {referenceTypeStore?.selectData?.map(makeOptionReferenceType)}
                </Select>
              </FormItem>

            </Col>
            <Col span={8}>
              <FormItem
                label='Лавлах сангийн нэр'
                name='name'
                className='mb10'
              >
                <Input placeholder='Лавлах сангийн нэр'/>
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem>
                <Button type='primary' htmlType='submit'>
                  &nbsp;<Trans>common.action.search</Trans>
                </Button>
                <Button style={{marginLeft: 8}} onClick={handleFormReset}>
                  &nbsp;<Trans>common.action.clear</Trans>
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </>
    )
  }

  const columns = [
    {
      title: 'Лого',
      dataIndex: 'icon',
      render: (text) => text && <img src={text} height={50} alt='icon'/>,
    },
    {
      title: 'Төрөл',
      dataIndex: 'typeName',
    },
    {
      title: 'Төрлийн код',
      dataIndex: 'typeCode',
    },
    {
      title: 'Нэр',
      dataIndex: 'name',
    },
    {
      title: 'Эрэмбэ',
      dataIndex: 'order',
    },
    {
      title: 'Ашиглах эсэх',
      dataIndex: 'active',
      render: text => text ? <Tag color='green'>Тийм</Tag> : <Tag color='purple'>Үгүй</Tag>,
    },
    {
      title: 'Үйлдэл',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <>
            <Tooltip placement='top' title='Засах'>
              <Button
                icon={<DynamicIcon type='EditTwoTone'/>}
                onClick={() => showModal('UPDATE', record)}
                style={{color: 'green'}}
                type='dashed'
                shape='circle'
              />
            </Tooltip>
            <Divider type='vertical'/>
            <Tooltip placement='top' title='Устгах'>
              <Popconfirm title='Устгах уу ?' onConfirm={() => handleDelete(record)}>
                <Button
                  icon={<DynamicIcon type='DeleteOutlined'/>}
                  style={{color: 'red'}}
                  type='dashed'
                  shape='circle'/>
              </Popconfirm>
            </Tooltip>
          </>
        )
      },
    },
  ]

  return (
    <PageHeaderWrapper
      title='Лавлах сангийн жагсаалт'
      action={
        <Button
          icon={<DynamicIcon type='PlusOutlined'/>}
          type='primary'
          ghost
          onClick={() => showModal('CREATE')}>
          Лавлах сан нэмэх</Button>}
    >
      <Card>
        {renderFilterForm()}
        <Table
          title={
            () => <Alert
              message={
                <span style={{marginLeft: 8}}>
                  <Trans>common.title.total</Trans> &nbsp;
                  <span style={{fontWeight: 600}}>
                    <a style={{fontWeight: 600}}>{pagination ? pagination.total : 0}</a>{' '}
                  </span>
                </span>
              }
              type='info'
              showIcon
            />
          }
          loading={loading}
          rowKey='key'
          size='small'
          columns={columns}
          dataSource={list}
          pagination={paginationProps}
          onChange={handleTableChange}
        />

        {renderModal()}
      </Card>
    </PageHeaderWrapper>
  )
})

const ReferenceDataWrapper = inject((stores) => {
  return {
    authStore: stores.authStore,
    referenceTypeStore: stores.referenceTypeStore,
    referenceDataStore: stores.referenceDataStore,
  }
})(ReferenceData)
export default ReferenceDataWrapper
