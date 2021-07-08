import React, {useEffect} from 'react'
import {Modal, Form, Input, InputNumber, Select, Switch, Upload, message} from 'antd'
import {observer, inject} from 'mobx-react'
import {getCdnUploadUrl} from '../../../../common/services/base'
import {normFile} from '../../../../common/utils/file'
import moment from 'moment'
import {UploadOutlined} from '@ant-design/icons'

const FormItem = Form.Item
const {Option} = Select
const {TextArea} = Input
const {confirm} = Modal

const ReferenceDataModal = observer(({
  editData,
  visible,
  closeModal,
  title,
  authStore,
  referenceTypeStore,
  referenceTypeStore: {selectData: typeList},
  referenceDataStore,
  referenceDataStore: {loading},
  refreshTable
}) => {

  const [form] = Form.useForm()

  useEffect(() => {
    referenceTypeStore.fetchSelect()
    form.resetFields()
  }, [editData])

  const handleCreate = (payload, form) => {
    referenceDataStore.create(payload).then((response) => {
      if (response && response.result) {
        form.resetFields()
        closeModal()
        if (refreshTable)
          refreshTable()
      }
    })

  }

  const handleUpdate = (payload, form) => {
    referenceDataStore.update(payload).then((response) => {
      if (response && response.result) {
        message.success('Мэдээлэл амжилттай шинэчиллээ')
        form.resetFields()
        closeModal()
        if (refreshTable)
          refreshTable()
      }
    })
  }

  const createUpdate = (payload, form) => {
    const newPayload = Object.assign({...editData, ...payload})
    if (newPayload?.id) {
      handleUpdate(newPayload, form)
    } else {
      handleCreate(newPayload, form)
    }
  }

  const submitHandle = () => {
    form.validateFields()
      .then(fieldsValue => {
        const {icon, date, ...rest} = fieldsValue

        let payload = {}
        let correctIcon = {}
        if (icon && icon.length !== 0) {
          icon.map(item => {
            if (item.response && item.response.result) {
              correctIcon = {
                uid: item.uid,
                name: item.name,
                url: item.response.data.toString()
              }
            } else {
              correctIcon = item
            }
          })
          payload = Object.assign({icon: correctIcon})
        }

        let formatedDate = date && moment(date).format(apiFormat)

        payload = Object.assign(payload, {date: formatedDate, ...rest})
        createUpdate(payload, form)
      })
      .catch(errorInfo => {
        console.error('naba ! --> ~ file: createUpdateModal.js ~ line 60 ~ submitHandle ~ errorInfo', errorInfo)
      })
  }

  const backHandle = () => {
    form.resetFields()
    closeModal()
  }

  const showBackConfirm = () => {
    if (form.isFieldsTouched()) {
      confirm({
        title: 'Та гарахдаа итгэлтэй байна уу?',
        content: '',
        okText: 'Тийм',
        okType: 'danger',
        cancelText: 'Үгүй',
        onOk() {
          backHandle()
        },
        onCancel() {
        },
      })
    } else {
      backHandle()
    }
  }

  const beforeUpload = (file, files) => {
    const isPDF = file.type === 'application/pdf'
    if (!isPDF) {
      files.splice(0, 1)
      message.error('Зөвхөн PDF файл оруулна уу!')
    }
    return isPDF
  }

  const makeOptionReferenceType = item => (
    <Option key={item.key || item.id} value={item.code}>
      {`${item.name} - ${item.code}`}
    </Option>
  )

  const formLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 24},
      md: {span: 6},
      lg: {span: 6},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 24},
      md: {span: 18},
      lg: {span: 18},
    },
  }

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: {span: 24, offset: 6},
      sm: {span: 24, offset: 6},
      md: {span: 18, offset: 6},
      lg: {span: 18, offset: 6},
    },
  }

  const {icon, ...initialValues} = editData

  return (
    <Modal
      title={`Лавлах сан ${title}`}
      width={900}
      visible={visible}
      onOk={() => submitHandle()}
      onCancel={showBackConfirm}
      okText='Хадгалах'
      cancelText='Болих'
      confirmLoading={loading}
      forceRender
    >
      <Form  {...formLayout}
        form={form}
        initialValues={initialValues}
      >
        <FormItem
          label='Лавлах сангийн төрөл'
          name='typeCode'
          rules={[{required: true, message: 'Лавлах сангийн төрөл сонгоно уу'}]}
          className='mb10'
        >
          <Select
            showSearch
            optionFilterProp='children'
            allowClear
            // onChange={handleChangeType}
            placeholder='Сонгох'
            style={{width: '100%'}}
          >
            {typeList?.map(makeOptionReferenceType)}
          </Select>
        </FormItem>
        <FormItem
          label='Лавлах сангийн нэр'
          name='name'
          rules={[{required: true, message: 'Лавлах сангийн нэр бичнэ үү!'}]}
          className='mb10'
        >
          <Input placeholder='Лавлах сангийн нэр' />
        </FormItem>

        <FormItem
          label='Тайлбар'
          name='description'
          className='mb10'
        >
          <TextArea placeholder='Тайлбар' />
        </FormItem>
        <FormItem
          label='Эрэмбэ'
          name='order'
          rules={[{required: true, message: 'Эрэмбэ оруулна уу!'}]}
          className='mb10'
        >
          <InputNumber min={1} step={1} placeholder='Дугаар' />
        </FormItem>
        <FormItem
          label='Ашиглах эсэх'
          name='active'
          valuePropName='checked'
          className='mb10'
        >
          <Switch checkedChildren='Тийм' unCheckedChildren='Үгүй' />
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
                  data={{entity: 'referenceIcon', entityId: Math.random().toString(36).substring(2)}}
                  action={getCdnUploadUrl()}
                  // beforeUpload={beforeUpload}
                >
                  {getFieldValue('icon') && getFieldValue('icon').length > 0 ? null :
                    <UploadOutlined />
                  }
                </Upload>
              </FormItem>
            </>
          }}
        </FormItem>
      </Form>
    </Modal >
  )
})

const ReferenceDataModalWrapper = inject(stores => {
  return ({
    authStore: stores.authStore,
    referenceTypeStore: stores.referenceTypeStore,
    referenceDataStore: stores.referenceDataStore,
  })
})(ReferenceDataModal)
export default (ReferenceDataModalWrapper)