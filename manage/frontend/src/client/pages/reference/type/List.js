import React, {useEffect, useState} from 'react'
import {Trans} from 'react-i18next'
import {Alert, Button, Card, Col, Divider, Form, Input, message, Popconfirm, Row, Table, Tag, Tooltip} from 'antd'
import {inject, observer} from 'mobx-react'

import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import CreateDrawer from './CreateUpdate'
import {checkAuth} from '../../../../common/utils/auth'
import DynamicIcon from '../../../components/DynamicIcon'

const FormItem = Form.Item

const ReferenceType = observer((
  {
    referenceTypeStore,
    referenceTypeStore: {data, loading, searchFormValues},
  }) => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [editData, setEditData] = useState({})

  const [form] = Form.useForm()

  const {list, pagination} = data

  useEffect(() => {
    refreshTable()
  }, [])

  const refreshTable = (params) => {
    referenceTypeStore.fetchList(params)
  }

  const handleTableChange = (pagination) => {
    const params = {
      ...searchFormValues,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    }

    referenceTypeStore.setSearchFormValues(params)
    refreshTable(params)
  }

  const handleFormReset = () => {
    form.resetFields()
    referenceTypeStore.setSearchFormValues({})
    refreshTable()
  }

  const handleSearch = () => {
    referenceTypeStore.setSearchFormValues(form.getFieldsValue())
    refreshTable(form.getFieldsValue())
  }

  const showDrawer = (action, values) => {
    switch (action) {
      case 'CREATE':
        setEditData({})
        break
      case 'UPDATE':
        setEditData(values)
        break
      default:
        return ''
    }
    setDrawerVisible(true)
  }

  const handleCreate = (fields, form) => {
    referenceTypeStore.create(fields).then(response => {
      if (response.result === true && response.data) {
        message.success('Төрөл амжилттай бүртгэлээ')
        form.resetFields()
        setDrawerVisible(false)
        refreshTable()
      } else {
        message.error(`Төрөл бүртгэхэд алдаа гарлаа: ${response.message}`)
      }
    }).catch(e => {
      console.log(e)
      message.error(`Төрөл бүртгэхэд алдаа гарлаа: ${e.message}`)
    })
  }

  const handleUpdate = (fields, form) => {
    referenceTypeStore.update(Object.assign({id: editData.id}, fields))
      .then(response => {
        if (response.result === true && response.data) {
          message.success('Төрөл амжилттай хадгаллаа')
          form.resetFields()
          setDrawerVisible(false)
          setEditData({})
          refreshTable()
        } else {
          message.error(`Төрөл засварлахад алдаа гарлаа: ${response.message}`)
        }
      })
      .catch(e => {
        console.log(e)
        message.error(`Төрөл засварлахад алдаа гарлаа: ${e.message}`)
      })
  }

  const handleDelete = record => {
    referenceTypeStore.deleteOne({id: record.id})
      .then(response => {
        if (response.result === true && response.data) {
          message.success('Төрөл амжилттай устгалаа')
          handleFormReset()
        } else {
          message.error(`Төрөл устгахад алдаа гарлаа: ${response.message}`)
        }
      })
      .catch(e => {
        console.log(e)
        message.error(`Төрөл устгахад алдаа гарлаа: ${e.message}`)
      })
  }

  const columns = [
    //   {
    //   title: 'Лого',
    //   dataIndex: 'icon',
    //   width: '250px',
    //   render: (text) => text && <img src={text} height={50} alt='icon' />
    // },
    {
      title: 'Нэр',
      dataIndex: 'name',
      width: '250px',
    }, {
      title: 'Код',
      dataIndex: 'code',
      width: '250px',
    }, {
      title: 'Тайлбар',
      dataIndex: 'description',
    }, {
      title: 'Идэвхтэй эсэх',
      dataIndex: 'active',
      width: '150px',
      render: text => text ? <Tag color='green'>Тийм</Tag> : <Tag color='purple'>Үгүй</Tag>,
    }, {
      title: 'Үйлдэл',
      width: '200px',
      render: (text, record) => (
        //
        <>
          <Tooltip placement='top' title='Засах'>
            <Button
              icon={<DynamicIcon type='EditTwoTone'/>}
              onClick={() => showDrawer('UPDATE', record)}
              style={{color: 'green'}}
              type='dashed'
              shape='circle'
            />
          </Tooltip>
          <Divider type='vertical'/>
          <Tooltip placement='top' title='Устгах'>
            <Popconfirm title='Устгах уу ?' onConfirm={() => handleDelete(record)}>
              <Button icon={<DynamicIcon type='DeleteTwoTone'/>} style={{color: 'red'}} type='dashed' shape='circle'/>
            </Popconfirm>
          </Tooltip>
        </>
      ),
    }]

  const headerActions = (
    checkAuth('ROLE_REFERENCE_TYPE_MANAGE') ? (
      <Button icon={<DynamicIcon type='PlusOutlined'/>} type='primary' onClick={() => showDrawer('CREATE')}>
        Бүртгэх
      </Button>
    ) : '')

  return (
    <PageHeaderWrapper title='Лавлах сангийн төрлийн жагсаалт' action={headerActions}>
      <Card>
        <Row gutter={16}>
          <Col span={24}>
            <Form form={form} onFinish={handleSearch} layout='inline'>
              <FormItem
                label='Нэр'
                name='name'
                className='mb10'
              >
                <Input placeholder='Нэр'/>
              </FormItem>
              <FormItem>
                <Button type='primary' htmlType='submit'>
                  &nbsp;<Trans>common.action.search</Trans>
                </Button>
                <Button style={{marginLeft: 8}} onClick={handleFormReset}>
                  &nbsp;<Trans>common.action.clear</Trans>
                </Button>
              </FormItem>
            </Form>
          </Col>
          <Col span={24}>
            <Table
              rowKey='key'
              size='small'
              loading={loading}
              columns={columns}
              dataSource={list || []}
              pagination={pagination && {...pagination, showQuickJumper: true, showSizeChanger: true} || []}
              onChange={handleTableChange}
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
            />
          </Col>
          <CreateDrawer
            drawerVisible={drawerVisible}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            onClose={() => setDrawerVisible(false)}
            editData={editData}
          />
        </Row>
      </Card>
    </PageHeaderWrapper>
  )
})

const ReferenceDataWrapper = inject((stores) => {
  return {
    authStore: stores.authStore,
    referenceTypeStore: stores.referenceTypeStore,
  }
})(ReferenceType)
export default (ReferenceDataWrapper)
