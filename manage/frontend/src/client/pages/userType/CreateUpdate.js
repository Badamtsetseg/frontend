import React, {useState, useEffect} from 'react'
import {Form, Input, message, Modal, Select} from 'antd'
import {inject, observer} from 'mobx-react'

const FormItem = Form.Item
const {Option} = Select

const BusinessRoleCreateUpdateModal = inject('applicationRoleStore', 'businessRoleStore')
(observer(({applicationRoleStore, businessRoleStore, visible, closeModal, updateData}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({}) // needed for form.getFieldValue to work

  useEffect(() => {
    form.resetFields()
  }, [updateData])

  const create = updateData && !updateData.key

  const submitHandle = () => {
    form.validateFields()
      .then((values) => {
        setLoading(true)
        const promise = create ? businessRoleStore.create : businessRoleStore.update
        promise(values)
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

  return (
    <Modal
      title={`Цахим ажлын байр ${create ? 'бүртгэх' : 'засварлах'}`}
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
          label='Цахим ажлын байр'
          name='role'
          rules={
            [{required: true, message: 'Цахим ажлын байр бичнэ үү'}]
          }>
          <Input placeholder='Цахим ажлын байр' readOnly={!create}/>
        </FormItem>
        <FormItem
          label='Нэр'
          name='name'
          rules={
            [{required: true, message: 'Нэр бичнэ үү'}]
          }>
          <Input placeholder='Нэр'/>
        </FormItem>
        <FormItem
          label='Хандах эрх'
          name='applicationRoles'
        >
          <Select
            mode='multiple'
            placeholder='Хандах эрхүүд сонгоно уу'
            style={{width: '100%'}}
          >
            {
              applicationRoleStore && applicationRoleStore.list.map(appRole =>
                <Option key={appRole} value={appRole}>{appRole}</Option>)
            }
          </Select>
        </FormItem>
      </Form>
    </Modal>
  )
}))

export default BusinessRoleCreateUpdateModal
