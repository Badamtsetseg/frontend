import React, {useState} from 'react'
import {Form, Input, Modal, message, Switch} from 'antd'
import {observer, inject} from 'mobx-react'

const FormItem = Form.Item

const CountryEditModal = inject('countryStore')
(observer(({countryStore, visible, closeModal, updateData}) => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const submitHandle = () => {
    form.validateFields()
      .then((values) => {
        setLoading(true)
        countryStore.update(Object.assign(updateData, values))
          .then(response => {
            setLoading(false)
            if (response.result) {
              message.success('Амжилттай хадгаллаа')
              form.resetFields()
              closeModal(true)
            } else
              message.error(`Хадгалахад алдаа гарлаа: ${response.message}`)
          })
          .catch(e => {
            setLoading(false)
            message.error(`Хадгалахад алдаа гарлаа: ${e.message}`)
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
      title='Улс засварлах'
      width='30%'
      visible={visible}
      onOk={submitHandle}
      onCancel={backHandle}
      okText='Хадгалах'
      cancelText='Буцах'
      confirmLoading={loading}
    >
      <Form
        form={form}
        initialValues={updateData}
        layout='vertical'
        onFinish={submitHandle}
      >
        <FormItem
          label='Улсын код'
          name='code'
          rules={[{required: true, message: 'Улсын код бичнэ үү!'}]}
        >
          <Input placeholder='Улсын код' readOnly/>
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

export default CountryEditModal
