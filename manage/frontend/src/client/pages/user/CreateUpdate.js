import React, {useState} from 'react'
import {Col, Form, Input, message, Modal, Row, Select, Switch, Upload} from 'antd'
import {IdcardOutlined, MailOutlined, PhoneOutlined, PlusOutlined, UserOutlined} from '@ant-design/icons'
import {inject, observer} from 'mobx-react'
import {getCdnUploadUrl} from '../../../common/services/base'
import {normFile} from '../../../common/utils/file'

import checkRegnum from '../../../common/utils/checkRegnum'

const FormItem = Form.Item
const {Option} = Select
const {confirm} = Modal

const UserCreateUpdateModal = inject('userStore', 'businessRoleStore', 'authStore')
(observer(({userStore, authStore, businessRoleStore, visible, closeModal, updateData}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({}) // needed for form.getFieldValue to work

  const create = updateData && !updateData.key

  const checkConfirmPassword = (value) => {
    const password = form.getFieldValue('password')
    if (value !== password)
      return Promise.reject(new Error('Нууц үгээ адилхан бичнэ үү'))
    else
      return Promise.resolve()
  }

  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        const {avatar, ...fields} = values
        let correctAvatar = null
        if (avatar) {
          avatar.map(item => {
            if (item.response && item.response.result) {
              correctAvatar = {
                uid: item.uid,
                name: item.name,
                url: item.response.data.toString(),
              }
            } else if (item.status === 'done') {
              correctAvatar = item
            }
          })
        }

        // if (!correctAvatar) {
        //   message.error('Зураг оруулаагүй эсвэл алдаатай байна')
        //   return
        // }

        const payload = Object.assign(
          {avatar: correctAvatar, ...fields},
          {id: updateData && updateData.id},
        )
        setLoading(true)
        const promise = create ? userStore.create : userStore.update
        promise(payload)
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

  const avatar = form.getFieldValue('avatar') || (updateData && updateData.avatar) || []

  return <Modal
    title={`Хэрэглэгчийн мэдээлэл ${create ? 'бүртгэх' : 'засварлах'}`}
    visible={visible}
    onOk={handleSubmit}
    okText={create ? 'Бүртгэх' : 'Хадгалах'}
    cancelText='Буцах'
    onCancel={showConfirm}
    confirmLoading={loading}
    width='40%'
  >
    <Form
      form={form}
      initialValues={updateData}
      onFinish={handleSubmit}
      layout='vertical'
      onValuesChange={(values) => setFormValues(values)}
    >
      <Row gutter={25}>
        <Col span={24}>
          <FormItem
            label='Цахим ажлын байр'
            name='businessRole'
            rules={[{required: true, message: 'Цахим ажлын байр сонгоно уу'}]}
          >
            <Select placeholder='Сонгох' style={{width: '100%'}}>
              {
                businessRoleStore && businessRoleStore.select && businessRoleStore.select.map(bRole =>
                  <Option key={bRole.key} value={bRole.role}>{bRole.name}</Option>)
              }
            </Select>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label='Нэвтрэх нэр'
            name='username'
            rules={[
              {required: true, message: 'Нэвтрэх нэр бичнэ үү'},
            ]}
          >
            <Input placeholder='Нэвтрэх нэр' addonAfter={<UserOutlined/>}/>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label='И-мэйл хаяг'
            name='email'
            rules={[
              {type: 'email', message: 'И-мэйл хаягаа зөв бичнэ үү'},
              {required: true, message: 'И-мэйл хаяг бичнэ үү'},
            ]}
          >
            <Input placeholder='И-мэйл хаяг' addonAfter={<MailOutlined/>}/>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label='Овог'
            name='lastName'
          >
            <Input placeholder='Овог' addonAfter={<UserOutlined/>}/>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label='Нэр'
            name='firstName'
            rules={[{required: true, message: 'Нэрээ бичнэ үү'}]}
          >
            <Input placeholder='Нэр' addonAfter={<UserOutlined/>}/>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label='Регистр'
            name='regnum'
            rules={[
              {validator: (_, value) => checkRegnum(value, 'CITIZEN')},
            ]}
          >
            <Input placeholder='Регистр' addonAfter={<IdcardOutlined/>}/>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label='Холбогдох утас'
            name='mobile'
          >
            <Input placeholder='99000000' addonAfter={<PhoneOutlined/>}/>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label='Нууц үг'
            name='password'
            rules={[
              create && {required: true, message: 'Нууц үг бичнэ үү'},
            ]}
          >
            <Input.Password placeholder='Нууц үг'/>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label='Нууц үг дахин бичих'
            name='confirmPassword'
            rules={[
              create && {required: true, message: 'Нууц үг бичнэ үү'},
              {validator: (_, value) => checkConfirmPassword(value)},
            ]}
          >
            <Input.Password placeholder='Нууц үг дахин бичих'/>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label='Профайл зураг'
            name='avatar'
            valuePropName='fileList'
            // rules={[{required: true, message: 'Зураг оруулна уу!'}]}
            getValueFromEvent={normFile}
          >
            <Upload
              name='file'
              listType='picture-card'
              headers={{'X-Auth-Token': authStore.values.token}}
              data={{
                entity: 'avatar',
                entityId: Math.random().toString(36).substring(2),
              }}
              action={getCdnUploadUrl()}
              accept='image/*'
            >
              {
                avatar && avatar.length === 0 &&
                <div>
                  <PlusOutlined/>
                  <div style={{marginTop: 8}}>Upload</div>
                </div>
              }
            </Upload>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label='Идэвхитэй эсэх'
            name='active'
            valuePropName='checked'
          >
            <Switch checkedChildren='Тийм' unCheckedChildren='Үгүй'/>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
}))

export default UserCreateUpdateModal
