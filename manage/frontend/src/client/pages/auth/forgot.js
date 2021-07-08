import React, {useEffect} from 'react'
import {observe} from 'mobx'
import {inject, observer} from 'mobx-react'
import {Button, Card, Divider, Form, Input, message} from 'antd'

import styles from './index.less'

const Forgot = observer((
  {
    authStore,
    history,
  }) => {

  useEffect(() => {
    let observerDisposer = observe(authStore.values, change => {
      /*
      console.log(
        change.type,
        change.name,
        'from',
        change.oldValue,
        'to',
        change.object[change.name]
      )
      */
      if (change.name === 'status') {
        const loginResult = change.object[change.name]
        if (loginResult === true) {
          // redirect
          history.push('/')
        }
      }
    })

    return function cleanup() {
      if (observerDisposer) {
        observerDisposer()
      }
    }
  }, [])

  const handleSubmit = values => {
    authStore.resetPassword(values.username)
      .then(response => {
        if (response) {
          message.info(response.message + '')
          if (response.result) {
            history.push('/auth/login')
          }
        }
      })
  }

  return (
    <div className={styles.main}>
      <Card>
        <h2>Нууц үг сэргээх</h2>
        <p>Хэрэглэгч та бүртгэлтэй имэйл хаягаа оруулан нууц үгээ сэргээнэ үү.</p>
        <Divider/>
        <Form
          onFinish={handleSubmit}
        >
          <Form.Item name='username' rules={[{required: true, message: 'Имэйл хаягаа оруулна уу'}]}>
            <Input size='large' placeholder='Имэйл хаяг'/>
          </Form.Item>
          <Form.Item>
            <Button size='large' loading={authStore.loading} type='primary' htmlType='submit' block>
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

const ForgotWrapper = inject(stores => {
  return ({
    authStore: stores.authStore,
  })
})(Forgot)

export default ForgotWrapper
