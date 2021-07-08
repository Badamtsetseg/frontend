import React, {useEffect, useState} from 'react'
import {Form, Input, Modal, message, Switch, Row, Col} from 'antd'
import {observer, inject} from 'mobx-react'

const FormItem = Form.Item

const FaqEditModal = inject('faqStore')
(observer(({faqStore, visible, closeModal, updateData}) => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({}) // needed for form.getFieldValue to work

  useEffect(() => {
    form.resetFields()
  }, [updateData])

  const submitHandle = () => {
    form.validateFields()
      .then((values) => {
        setLoading(true)
        faqStore.update(Object.assign({
          ...values,
          id: updateData && updateData.id,
        }))
          .then(response => {
            setLoading(false)
            if (response.result) {
              message.success(`Амжилттай ${create ? 'бүртгэлээ' : 'хадгаллаа'}`)
              backHandle(true)
            } else
              message.error(`${create ? 'Бүртгэхэд' : 'Хадгалахад'} алдаа гарлаа: ${response.message}`)
          })
          .catch(e => {
            setLoading(false)
            message.error(`${create ? 'Бүртгэхэд' : 'Хадгалахад'} алдаа гарлаа: ${e.message}`)
          })
      })
      .catch((errorInfo) => {
      })

  }

  const backHandle = (refresh) => {
    form.resetFields()
    closeModal(refresh)
  }

  const create = updateData && !updateData.id

  return (
    <Modal
      title={`Асуулт, хариулт ${create ? 'бүртгэх' : 'засварлах'}`}
      width='50%'
      visible={visible}
      onOk={submitHandle}
      onCancel={backHandle}
      okText={create ? 'Бүртгэх' : 'Хадгалах'}
      cancelText='Буцах'
      confirmLoading={loading}
    >
      <Form
        form={form}
        initialValues={updateData}
        onFinish={submitHandle}
        layout='vertical'
        onValuesChange={(values) => setFormValues(values)}
      >
        <FormItem
          label='Асуулт'
          name='question'
          rules={[{required: true, message: 'Асуулт бичнэ үү!'}]}
        >
          <Input placeholder='Асуулт'/>
        </FormItem>
        <FormItem
          label='Хуриулт'
          name='answer'
          rules={[{required: true, message: 'Хариулт бичнэ үү!'}]}
        >
          <Input placeholder='Хариулт'/>
        </FormItem>
        <Row>
          <Col md={12} sm={24}>
            <FormItem
              label='Харуулах эсэх'
              name='visible'
              valuePropName='checked'
            >
              <Switch checkedChildren='Тийм' unCheckedChildren='Үгүй'/>
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem
              label='Эрэмбэ'
              name='order'
              rules={[{required: true, message: 'Эрэмбэ оруулна уу!'}]}
            >
              <Input placeholder='Эрэмбэ' type='number'/>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}))

export default FaqEditModal
