import React from 'react'
import {Button, message, Modal, Upload} from 'antd'

import {CloudUploadOutlined} from '@ant-design/icons'

import {getAuthData} from '../../../../common/utils/auth'
import {getImportUrl} from '../../../../common/services/deviceToken'
import {inject, observer} from 'mobx-react'

const DeviceTokenImportModal = inject()
(observer(({handleModalVisible, modalVisible}) => {

  const onFileUploadChange = (resultData) => {
    if (resultData.fileList && resultData.file.status === 'done' && resultData.file.response.result) {
      message.success('Амжилттай import хийлээ: ' + resultData.file.response.message)
      handleModalVisible(false)
    } else if (resultData.fileList && resultData.file.status === 'error') {
      message.error(`Import амжилтгүй боллоо: ${resultData.file.response && resultData.file.response.message}`)
      handleModalVisible(false)
    }
  }

  return (
    <Modal visible={modalVisible} footer={null} onCancel={() => handleModalVisible(false)}>
      <Upload
        name='file'
        action={getImportUrl()}
        accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        headers={{'X-Auth-Token': getAuthData() && getAuthData().token}}
        data={{'entity': 'trafficPermit'}}
        onChange={onFileUploadChange}
        // showUploadList={false}
      >
        <Button block>
          <CloudUploadOutlined/> Энд дарж файлаа хуулна уу
        </Button>
      </Upload>
    </Modal>
  )
}))

export default DeviceTokenImportModal
