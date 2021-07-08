import React, {useEffect, useState} from 'react'
import {Form, Input, Modal, message, Row, Col, Switch, Upload, Select} from 'antd'
import {observer, inject} from 'mobx-react'
import {PlusOutlined} from '@ant-design/icons'
import Editor from '../../components/RichTextEditor'

import {getCdnUploadUrl} from '../../../common/services/base'
import {normFile} from '../../../common/utils/file'

const FormItem = Form.Item
const TextArea = Input.TextArea
const {Option} = Select

const ArticleEditModal = inject('articleStore', 'authStore', 'userStore')
(observer(({articleStore, visible, closeModal, updateData, authStore, userStore: {select: authors}}) => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({}) // needed for form.getFieldValue to work

  useEffect(() => {
    form.resetFields()
  }, [updateData])

  const submitHandle = () => {
    form.validateFields()
      .then((values) => {
        const {cover, ...fields} = values
        let correctCover = null
        if (cover)
          cover.map(item => {
            if (item.response && item.response.result)
              correctCover = {
                uid: item.uid,
                name: item.name,
                url: item.response.data.toString(),
              }
            else if (item.status === 'done')
              correctCover = item
          })

        if (!correctCover) {
          message.error('Зураг оруулаагүй эсвэл алдаатай байна')
          return
        }

        setLoading(true)
        articleStore.update(Object.assign({
          ...fields,
          cover: correctCover,
          id: updateData && updateData.id,
          type: 'ARTICLE',
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

  const handleEditorChange = (content) => {
    form.setFieldsValue({content})
  }

  const cover = form.getFieldValue('cover') || (updateData && updateData.cover)
  const create = updateData && !updateData.id

  return (
    <Modal
      title={`Нийтлэл ${create ? 'бүртгэх' : 'засварлах'}`}
      width='60%'
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
          label='Гарчиг'
          name='title'
          rules={[{required: true, message: 'Гарчиг бичнэ үү!'}]}
        >
          <Input placeholder='Гарчиг'/>
        </FormItem>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={4} sm={24}>
            <FormItem
              label='Ковер зураг'
              name='cover'
              valuePropName='fileList'
              rules={[{required: true, message: 'Зураг оруулна уу!'}]}
              getValueFromEvent={normFile}
            >
              <Upload
                name='file'
                listType='picture-card'
                headers={{'X-Auth-Token': authStore.values.token}}
                data={{
                  entity: 'bookCover',
                  entityId: Math.random().toString(36).substring(2),
                }}
                action={getCdnUploadUrl()}
                accept='image/*'
              >
                {
                  cover && cover.length === 0 &&
                  <div>
                    <PlusOutlined/>
                    <div style={{marginTop: 8}}>Upload</div>
                  </div>
                }
              </Upload>
            </FormItem>
          </Col>
          <Col md={16} sm={24}>
            <FormItem
              label='Товч мэдээлэл'
              name='shortContent'
              rules={[{required: true, message: 'Товч мэдээлэл бичнэ үү!'}]}
            >
              <TextArea placeholder='Товч мэдээлэл'/>
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem
              label='Hot эсэх'
              name='hot'
              valuePropName='checked'
            >
              <Switch checkedChildren='Тийм' unCheckedChildren='Үгүй'/>
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem
              label='Нийтлэгч'
              name='authorId'
              rules={[{required: true, message: 'Нийтлэгч сонгоно уу!'}]}
            >
              <Select
                showSearch
                optionFilterProp='children'
                allowClear
                placeholder='Сонгох'
                style={{width: '100%'}}
                showAction={['focus', 'click']}
              >
                {
                  authors && authors.map(item =>
                    <Option key={item.key} value={item.key}>
                      {item.username} - {item.firstName}
                    </Option>
                  )
                }
              </Select>
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem
              label='Харуулах эсэх'
              name='visible'
              valuePropName='checked'
            >
              <Switch checkedChildren='Тийм' unCheckedChildren='Үгүй'/>
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem
              label='Төлбөртэй эсэх'
              name='premium'
              valuePropName='checked'
            >
              <Switch checkedChildren='Тийм' unCheckedChildren='Үгүй'/>
            </FormItem>
          </Col>
        </Row>
        <FormItem
          label='Агуулга'
          name='content'
        >
          <Editor onEditorChange={handleEditorChange}/>
        </FormItem>
      </Form>
    </Modal>
  )
}))

export default ArticleEditModal
