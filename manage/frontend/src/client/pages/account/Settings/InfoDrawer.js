import React from 'react'
import {inject, observer} from 'mobx-react'
import {Button, Drawer, Form, Input, Modal} from 'antd'

const FormItem = Form.Item
const {confirm} = Modal

const UserSettingsInfo = inject('authStore')
(observer(({authStore, handleEdit, action, onClose, drawerVisible, currentUser}) => {
  const [form] = Form.useForm()

  const submitHandle = values => {
    handleEdit(Object.assign(values, {action}))
    this.backHandle()
  }

  const backHandle = () => {
    form.resetFields()
    onClose()
  }

  const showConfirm = () => {
    const parentMethods = {backHandle}
    if (form.isFieldsTouched()) {
      confirm({
        title: 'Та гарахдаа итгэлтэй байна уу?',
        content: '',
        okText: 'Тийм',
        okType: 'danger',
        cancelText: 'Үгүй',
        onOk() {
          parentMethods.backHandle()
        },
        onCancel() {
        },
      })
    } else {
      parentMethods.backHandle()
    }
  }

  return (
    <Drawer
      title='Хувийн мэдээлэл засварлах'
      width={500}
      placement='right'
      onClose={showConfirm}
      visible={drawerVisible}
    >
      <Form
        form={form}
        onFinish={submitHandle}
        initialValues={currentUser}
        layout='vertical'
      >
        <FormItem
          label='И-мэйл хаяг'
          name='username'
          hasFeedback
          className='mb-0'
        >
          <Input disabled placeholder='И-мэйл хаяг'/>
        </FormItem>
        <FormItem
          label='Цахим ажлын байр'
          name='businessRole'
          hasFeedback
          className='mb-0'
        >
          <Input disabled placeholder='Цахим ажлын байр'/>
        </FormItem>
        <FormItem
          label='Овог'
          name='lastName'
          hasFeedback
          className='mb-0'
        >
          <Input placeholder='Овог'/>
        </FormItem>
        <FormItem
          label='Нэр'
          name='firstName'
          hasFeedback
          className='mb-0'
          rules={[{required: true, message: 'Нэр бичнэ үү!'}]}
        >
          <Input placeholder='Нэр'/>
        </FormItem>
        <FormItem
          label='Холбогдох утас'
          name='mobile'
          className='mb-0'
        >
          <Input placeholder='Холбогдох утас'/>
        </FormItem>
        <FormItem>
          <Button
            type='primary'
            htmlType='submit'
            style={{float: 'right'}}
          >
            Хадгалах
          </Button>
        </FormItem>
      </Form>
    </Drawer>
  )
}))

export default UserSettingsInfo
