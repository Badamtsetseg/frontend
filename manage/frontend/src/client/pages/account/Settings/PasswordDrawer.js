import React from 'react'
import {inject, observer} from 'mobx-react'
import {Button, Drawer, Form, Input, Modal} from 'antd'

const FormItem = Form.Item
const {confirm} = Modal

const PasswordDrawer = inject('authStore')
(observer(({authStore, handleEdit, action, onClose, drawerVisible}) => {
  const [form] = Form.useForm()

  const submitHandle = values => {
    handleEdit(Object.assign(values, {action}))
  }

  const checkPassword = (value) => {
    try {
      if (value) {
        if (form.getFieldValue('confirmPassword')) {
          form.validateFields(['confirmPassword'], (errors, values) => {
          })
        }
        if (value.length < 6)
          return Promise.reject(new Error('Доод тал нь 6 тэмдэгт бичнэ үү'))
        return Promise.resolve()
      }
    } catch (err) {
      return Promise.reject(new Error(err))
    }
  }

  const checkConfirmPassword = (value) => {
    try {
      if (value)
        if (value !== form.getFieldValue('password'))
          return Promise.reject(new Error('Нууц үгээ адилхан бичнэ үү'))
        else
          return Promise.resolve()
    } catch (err) {
      return Promise.reject(new Error(err))
    }
  }

  const backHandle = () => {
    form.resetFields()
    onClose()
  }

  const showConfirm = () => {
    const parentMethods = {backHandle: backHandle}
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
      title='Нууц үг солих'
      width={500}
      placement='right'
      onClose={showConfirm}
      visible={drawerVisible}
    >
      <Form
        form={form}
        onFinish={submitHandle}
        layout='vertical'
      >
        <div>
          <FormItem
            label='Хуучин нууц үг'
            name='oldPassword'
            rules={[
              {required: true, message: 'Нууц үг бичнэ үү'},
            ]}
          >
            <Input.Password placeholder='Хуучин нууц үг' type='password'/>
          </FormItem>
          <FormItem
            label='Нууц үг'
            name='password'
            rules={[
              {required: true, message: 'Нууц үг бичнэ үү'},
              {validator: (_, value) => checkPassword(value)},
            ]}
          >
            <Input.Password placeholder='Нууц үг бичих'/>
          </FormItem>
          <FormItem
            label='Нууц үг дахин бичих'
            name='confirmPassword'
            rules={[
              {required: true, message: 'Нууц үг дахин бичнэ үү'},
              {validator: (_, value) => checkConfirmPassword(value)},
            ]}
          >
            <Input.Password placeholder='Нууц үг дахин бичих'/>
          </FormItem>
        </div>
        <FormItem>
          <Button
            type='primary'
            htmlType='submit'
            style={{float: 'right'}}
            onClick={() => {
              submitHandle(form.getFieldsValue())
            }}
          >
            Хадгалах
          </Button>
        </FormItem>
      </Form>
    </Drawer>
  )
}))

export default PasswordDrawer
