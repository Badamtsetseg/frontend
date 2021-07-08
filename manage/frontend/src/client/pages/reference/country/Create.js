import React, {useState} from 'react'
import {Form, Input, Modal, message, Switch} from 'antd'
import {observer, inject} from 'mobx-react'

const FormItem = Form.Item

const CountryCreateModal = inject('countryStore')
(observer(({countryStore, visible, closeModal}) => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const submitHandle = () => {
    form.validateFields()
      .then((values) => {
        setLoading(true)
        countryStore.create(values)
          .then(response => {
            setLoading(false)
            if (response.result) {
              message.success('Амжилттай бүртгэлээ')
              form.resetFields()
              closeModal(true)
            } else
              message.error(`Бүртгэхэд алдаа гарлаа: ${response.message}`)
          })
          .catch(e => {
            setLoading(false)
            message.error(`Бүртгэхэд алдаа гарлаа: ${e.message}`)
          })
      })
      .catch((errorInfo) => {
      })

  }

  const backHandle = () => {
    form.resetFields()
    closeModal()
  }

  return (
    <Modal
      title='Улс бүртгэх'
      width='30%'
      visible={visible}
      onOk={submitHandle}
      onCancel={backHandle}
      okText='Бүртгэх'
      cancelText='Буцах'
      confirmLoading={loading}
    >
      <Form
        form={form}
        onFinish={submitHandle}
        layout='vertical'
        initialValues={{university: false, scholarship: false}}
      >
        <FormItem
          label='Улсын код'
          name='code'
          extra='Латин том үсэг болон -'
          rules={
            [
              {required: true, message: 'Улсын код бичнэ үү!'},
              ({}) => ({
                validator(_, value) {
                  if (value) {
                    const letters = 'ABCDEFGHIJKLMNOPQRSTUVYXWZ-'
                    for (let i = 0; i < value.length; i += 1)
                      if (letters.indexOf(value.charAt(i)) === -1)
                        return Promise.reject(new Error('Латин том үсэг болон - оруулна уу'))
                  }
                  return Promise.resolve()
                },
              }),
            ]
          }
        >
          <Input placeholder='Улсын код'/>
        </FormItem>
        <FormItem
          label='Нэр'
          name='name'
          rules={[{required: true, message: 'Нэр бичнэ үү!'}]}
        >
          <Input placeholder='Нэр'/>
        </FormItem>
        <FormItem
          label='Их сургуульд ашиглагдах эсэх'
          name='university'
          valuePropName='checked'
        >
          <Switch checkedChildren='Тийм' unCheckedChildren='Үгүй'/>
        </FormItem>
        <FormItem
          label='Тэтгэлэгт ашиглагдах эсэх'
          name='scholarship'
          valuePropName='checked'
        >
          <Switch checkedChildren='Тийм' unCheckedChildren='Үгүй'/>
        </FormItem>
        <FormItem
          label='Эрэмбэ'
          name='order'
          rules={[{required: true, message: 'Эрэмбэ оруулна уу!'}]}
        >
          <Input type='number' placeholder='Эрэмбэ'/>
        </FormItem>
      </Form>
    </Modal>
  )
}))

export default CountryCreateModal
