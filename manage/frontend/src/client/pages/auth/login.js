import React, {useEffect, useState} from 'react'
import {observe} from 'mobx'
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router-dom'
import {Button, Card, Checkbox, Divider, Form, Input, message} from 'antd'

import styles from './index.less'

let firstMount = true

const Login = observer((
  {
    authStore,
    history,
  }) => {

  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    firstMount = true
    let observerDisposer = observe(authStore.values, change => {
      /*console.log(
        change.type,
        change.name,
        'from',
        change.oldValue,
        'to',
        change.object[change.name]
      )*/
      if (change.name === 'status') {
        const loginResult = change.object[change.name]
        if (loginResult === true && firstMount) {
          firstMount = false
          // redirect
          history.push('/dashboard')
        }
      }
    })

    /*
    if (authStore.values.status === true) {
      // logged in
      history.push('/')
    }
    */

    return function cleanup() {
      if (observerDisposer) {
        observerDisposer()
      }
    }
  }, [])

  const handleSubmit = values => {
    setSubmitting(true)
    authStore.login(values.username, values.password)
      .then(response => {
        if (response && !response.result) {
          if (response.message)
            message.error(response.message)
        }
        setSubmitting(false)
      })
      .catch((e) => {
        message.error(e.message)
        setSubmitting(false)
      })
  }

  return (
    <div className={styles.main}>
      <Card>
        <h2>Системд нэвтрэх</h2>
        <p>Хэрэглэгч та и-мэйл хаяг болон нууц үгээ ашиглан системд нэвтэрнэ үү.</p>
        <Divider/>
        <Form
          // name='login'
          onFinish={handleSubmit}
          // onFinishFailed={this.handleSubmitFailed}
        >
          <Form.Item name='username' rules={[
            {
              required: true,
              message: 'И-мэйл хаяг оруулна уу',
            },
          ]}>
            <Input size='large' placeholder='И-мэйл хаяг'/>
          </Form.Item>
          <Form.Item name='password' rules={[
            {
              required: true,
              message: 'Нууц үгээ оруулна уу',
            },
          ]}>
            <Input size='large' type='password' placeholder='Нууц үг'/>
          </Form.Item>
          <Form.Item name='rememberMe' valuePropName='checked' initialValue={false}>
            <Checkbox>Намайг сана</Checkbox>
            <Link to='/auth/forgot' style={{float: 'right'}}>Нууц үгээ мартсан?</Link>
          </Form.Item>
          <Button size='large' loading={submitting} type='primary' htmlType='submit' block>
            Нэвтрэх
          </Button>
        </Form>
      </Card>
    </div>
  )
})

const LoginWrapper = inject(stores => {
  return ({
    authStore: stores.authStore,
  })
})(Login)

export default LoginWrapper
