import React, {useEffect} from 'react'
import {Button, Drawer, Form, Icon, Input, Switch, Upload} from 'antd'
import {inject, observer} from 'mobx-react'

import {UploadOutlined} from '@ant-design/icons'
import {getCdnUploadUrl} from '../../../../common/services/base'
import {normFile} from '../../../../common/utils/file'

const FormItem = Form.Item
const {TextArea} = Input

const ReferenceType = observer(({
  drawerVisible,
  handleUpdate,
  handleCreate,
  editData,
  onClose,
  authStore,
  referenceTypeStore: {loading}
}) => {

  const [form] = Form.useForm()
  const isCreate = !editData?.id

  useEffect(() => {
    form.resetFields()
  }, [editData])

  const submitHandle = () => {
    form.validateFields()
      .then(fieldsValue => {
        const {icon, ...rest} = fieldsValue
        let typeIcon

        if (icon && icon.length !== 0) {
          icon.map(item => {
            if (item.response && item.response.result) {
              typeIcon = item.response.data.toString()
            } else {
              typeIcon = item.url
            }
          })
        }
        createUpdate(Object.assign(fieldsValue, {icon: typeIcon}))
      })
      .catch(errorInfo => {
        console.error('naba ! --> ~ file: createUpdateModal.js ~ line 60 ~ submitHandle ~ errorInfo', errorInfo)
      })
  }

  const createUpdate = (payload) => {
    const newPayload = Object.assign({...editData, ...payload})
    if (newPayload?.id) {
      handleUpdate(newPayload, form)
    } else {
      handleCreate(newPayload, form)
    }
  }

  const backHandle = () => {
    form.resetFields()
    onClose()
  }

  const beforeUpload = (file, contentImage) => {
    const isImg = file.type.startsWith('image/')
    if (!isImg) {
      contentImage.splice(0, 1)
      message.error('Зөвхөн зураг оруулна уу!')
    }
    return isImg
  }

  const validateCode = (_rule, control, callback) => {
    const regex = /^[\d+A-Z_]*|$/
    if (control) {
      const result = control.match(regex)
      if (control && (control == result[0])) {
        callback()
      } else
        callback('Төрлийн код буруу байна!')
    } else
      callback()
  }

  const {icon, ...initialValues} = editData
  return (
    <Drawer
      title={`Лавлах сангийн төрөл ${isCreate ? 'бүртгэх' : 'засварлах'}`}
      width={600}
      placement='right'
      onClose={() => backHandle()}
      visible={drawerVisible}
      forceRender
    >
      <Form
        form={form}
        initialValues={initialValues}
      >
        <FormItem
          label='Нэр'
          name='name'
          rules={[{required: true, message: 'Төрлийн нэр бичнэ үү'}]}
          className='mb10'
        >
          <Input placeholder='Нэр' />
        </FormItem>

        <FormItem
          label='Код'
          name='code'
          rules={[
            {required: true, message: 'Төрлийн нэр бичнэ үү'},
            {validator: (rule, control, callback) => validateCode(rule, control, callback)}
          ]}
          extra='Зөвхөн латин том үсэг болон доогуур зураас тооноос бүрдэнэ'
          className='mb10'
        >
          <Input disabled={!isCreate} placeholder='Код' />
        </FormItem>

        <FormItem
          label='Тайлбар'
          name='description'
          className='mb10'
        >
          <TextArea placeholder='Тайлбар' />
        </FormItem>

        <FormItem
          noStyle
          shouldUpdate={(prevValues, curValues) => prevValues.icon !== curValues.icon}
        >
          {({getFieldValue}) => {
            return <>
              <FormItem
                label='Зураг'
                name='icon'
                valuePropName='fileList'
                getValueFromEvent={normFile}
                initialValue={icon && [icon] || []}
                className='mb10'
              >
                <Upload
                  name='file'
                  accept='image/*'
                  listType='picture-card'
                  headers={{'X-Auth-Token': authStore.values.token}}
                  data={{entity: 'referenceTypeIcon', entityId: Math.random().toString(36).substring(2)}}
                  action={getCdnUploadUrl()}
                  beforeUpload={beforeUpload}
                >
                  {getFieldValue('icon') && getFieldValue('icon').length > 0 ? null :
                    <UploadOutlined />
                  }
                </Upload>
              </FormItem>
            </>
          }}
        </FormItem>

        <FormItem
          label='Идэвхтэй эсэх'
          name='active'
          valuePropName='checked'
          className='mb10'
        >
          <Switch checkedChildren='Тийм' unCheckedChildren='Үгүй' />
        </FormItem>
        <FormItem>
          <Button type='primary' onClick={() => submitHandle()} style={{float: 'right'}}>
            Хадгалах
          </Button>
        </FormItem>
      </Form>
    </Drawer>
  )
})

const ModalWrapper = inject(stores => ({
  // ...stores
  authStore: stores.authStore,
  referenceTypeStore: stores.referenceTypeStore,
}))(ReferenceType)

export default ModalWrapper