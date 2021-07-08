import React, {useEffect, useState} from 'react'
import {inject, observer} from 'mobx-react'
import {Button, Card, Divider, Form, Input, message} from 'antd'

import styles from './index.less'

const ResetPassword = observer((
  {
    authStore,
    history,
    match,
  }) => {

  const [form] = Form.useForm()
  const [submitting, setSubmitting] = useState(false)

  const token = match.params && match.params.token
  const username = match.params && match.params.username

  useEffect(() => {
    authStore.checkPasswordResetToken({passwordResetToken: token, username})
      .then(response => {
        if (response && !response.result) {
          message.warn(response.message)
          history.push('/auth/login')
        }
      })
  }, [])

  const handleSubmit = values => {
    setSubmitting(true)
    authStore.setPassword({...values, username})
      .then(response => {
        setSubmitting(false)
        if (response && response.result) {
          history.push('/auth/login')
        } else {
          message.warn(response.message)
        }
      })
      .catch(e => {
        setSubmitting(false)
        message.error(`Нууц үг сэргээхэд алдаа гарлаа: ${e.message}`)
      })
  }

  const checkPassword = (rule, value, callback) => {
    try {
      if (value) {
        if (form.getFieldValue('confirmPassword')) {
          form.validateFields(['confirmPassword'], (errors, values) => {
          })
        }
        callback()
      } else {
        callback('Доод тал нь 6 тэмдэгч бичнэ үү')
      }
    } catch (err) {
      callback(err)
    }
  }

  const checkConfirmPassword = (rule, value, callback) => {
    try {
      if (value !== form.getFieldValue('password')) {
        callback('Нууц үгээ адилхан бичнэ үү')
      } else {
        callback()
      }
    } catch (err) {
      callback(err)
    }
  }

  return (
    <div className={styles.main}>
      <Card>
        <h2>Нууц үг сэргээх</h2>
        <p>Хэрэглэгч та бүртгэлтэй шинэ нууц үгээ оруулна уу.</p>
        <Divider/>
        <Form
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item
            label='Нууц үг'
            name='password'
            hasFeedback
            className='mb-0'
            rules={[
              {required: true, message: 'Нууц үг бичнэ үү'},
              {validator: checkPassword},
            ]}
          >
            <Input.Password placeholder='Нууц үг'/>
          </Form.Item>
          <Form.Item
            label='Нууц үг дахин бичих'
            name='confirmPassword'
            hasFeedback
            className='mb-0'
            rules={[
              {required: true, message: 'Нууц үг дахин бичнэ үү'},
              {validator: checkConfirmPassword},
            ]}
          >
            <Input.Password placeholder='Нууц үг дахин бичих'/>
          </Form.Item>
          <Form.Item>
            <Button size='large' loading={submitting} type='primary' htmlType='submit' block>
              Үргэлжлүүлэх
            </Button>
          </Form.Item>
          <Button size='large' block onClick={() => history.push('/auth/login')}>
            Буцах
          </Button>
        </Form>
      </Card>
    </div>
  )
})

const ResetPasswordWrapper = inject(stores => {
  return ({
    authStore: stores.authStore,
  })
})(ResetPassword)

export default ResetPasswordWrapper
