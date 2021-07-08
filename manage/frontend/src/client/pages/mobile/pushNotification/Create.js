import React from 'react'
import {inject, observer} from 'mobx-react'
import {Button, Card, DatePicker, Form, Input, message, Select} from 'antd'

const FormItem = Form.Item
const {TextArea} = Input
const {Option} = Select

const PushNotificationCreate = inject('pushNotificationStore')
(observer(({pushNotificationStore, pushNotificationStore: {loading}, history}) => {
  const [form] = Form.useForm()

  const handleCreate = values => {
    pushNotificationStore.create(values)
      .then(response => {
        if (response.result === true) {
          message.success('Push notification амжилттай бүртгэлээ')
        } else {
          message.error(`Push notification бүртгэхэд алдаа гарлаа: ${response.message}`)
        }
        history.push('/mobile/push-notification')
      })
      .catch(e => {
        message.error(`Push notification бүртгэхэд алдаа гарлаа: ${e.message}`)
      })
  }

  const formItemLayout = {labelCol: {span: 6}, wrapperCol: {span: 12}}

  return <Card title='Push notification бүртгэх' bordered={false}>
    <Form
      form={form}
      onFinish={handleCreate}
    >
      <FormItem
        label='Төрөл'
        name='type'
        {...formItemLayout}
        rules={[
          {required: true, message: 'Төрөл сонгоно уу'},
        ]}
      >
        <Select placeholder='Төрөл сонгох'>
          {
            pushNotificationStore.types && pushNotificationStore.types.map(item => (
              <Option key={item.value} value={item.value}>{item.label}</Option>
            ))
          }
        </Select>
      </FormItem>
      <FormItem
        label='Гарчиг'
        name='title'
        {...formItemLayout}
        rules={[
          {required: true, message: 'Гарчиг бичнэ үү'},
        ]}
      >
        <Input placeholder='Гарчиг'/>
      </FormItem>
      <FormItem
        label='Агуулга'
        name='body'
        {...formItemLayout}
        rules={[
          {required: true, message: 'Агуулга бичнэ үү'},
        ]}>
        <TextArea placeholder='Агуулга'/>
      </FormItem>
      <FormItem
        label='Илгээх төрөл'
        name='sendType'
        {...formItemLayout}
        rules={[
          {required: true, message: 'Илгээх төрөл сонгоно уу'},
        ]}
      >
        <Select placeholder='Илгээх төрөл сонгох'>
          {
            pushNotificationStore.sendTypes && pushNotificationStore.sendTypes.map(item => (
              <Option key={item.value} value={item.value}>{item.label}</Option>
            ))
          }
        </Select>
      </FormItem>
      {
        form.getFieldValue('sendType') === 'CRON' &&
        <FormItem
          label='Илгээх огноо'
          name='scheduledDate'
          {...formItemLayout}
        >
          <DatePicker placeholder='Сонгох' format='YYYY-MM-DD HH:mm:ss'/>
        </FormItem>
      }
      <FormItem
        label='Хүлээн авагчийн төрөл'
        name='receiverType'
        {...formItemLayout}
        rules={[
          {required: true, message: 'Хүлээн авагчийн төрөл сонгоно уу'},
        ]}
      >
        <Select placeholder='Хүлээн авагчийн төрөл сонгох'>
          {
            pushNotificationStore.receiverTypes && pushNotificationStore.receiverTypes.map(item => (
              <Option key={item.value} value={item.value}>{item.label}</Option>
            ))
          }
        </Select>
      </FormItem>
      <FormItem
        label='Хүлээн авагч'
        name='receiver'
        {...formItemLayout}
      >
        <Input placeholder='Хүлээн авагч'/>
      </FormItem>
      <FormItem
        label='Priority'
        name='priority'
        {...formItemLayout}
        rules={[
          {required: true, message: 'Priority сонгоно уу'},
        ]}
      >
        <Select placeholder='Priority сонгох'>
          {
            pushNotificationStore.priorities && pushNotificationStore.priorities.map(item => (
              <Option key={item.value} value={item.value}>{item.label}</Option>
            ))
          }
        </Select>
      </FormItem>
      <FormItem {...formItemLayout}>
        <Button
          type='primary'
          loading={loading}
          htmlType='submit'
          style={{float: 'right'}}
        >
          Бүртгэх
        </Button>
      </FormItem>
    </Form>
  </Card>
}))

export default PushNotificationCreate
