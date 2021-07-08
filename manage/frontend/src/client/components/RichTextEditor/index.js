import React, {Component} from 'react'
import {inject} from 'mobx-react'
import {Editor} from '@tinymce/tinymce-react'

import {getCdnUploadUrl} from '../../../common/services/base'

@inject('authStore')
class RichTextEditor extends Component {
  // TODO хэрэв plugin нэмсэн бол JS файлаа татаж аваад \src\client\assets\tinymce folder дотор хуулах шаардлагатай

  render() {
    const {onEditorChange, value, init, disabled, authStore} = this.props

    // used this plugin https://www.npmjs.com/package/@wiris/mathtype-tinymce5
    // let tiny_mce_wiris_url = 'https://starter.astvision.mn/static/tinymce/plugin-math.min.js'
    // if (process.env.NODE_ENV === 'development') {
    //   tiny_mce_wiris_url = 'http://localhost:3000/static/tinymce/plugin-math.min.js'
    // }

    const defaultInit = {
      // plugins: 'table link image autoresize fullscreen',
      plugins: [
        'autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen autoresize',
        'media table paste code help wordcount emoticons'
      ],
      // external_plugins: {
      //   'tiny_mce_wiris': tiny_mce_wiris_url
      // },
      toolbar:
        'undo redo | formatselect | bold italic underline\
             | alignleft aligncenter alignright alignjustify\
             | bullist numlist outdent indent\
             | forecolor backcolor\
             | emoticons fullscreen | removeformat | help',
      // font_formats:
      //   'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde;\
      //   Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier;\
      //   Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Mongolian Baiti=Mongolian Baiti;\
      //   Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times;\
      //   Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
      //selector: 'textarea',

      // convert_urls: false,
      images_upload_handler: function (blobInfo, success, failure) {
        let xhr, formData

        xhr = new XMLHttpRequest()
        // xhr.withCredentials = true
        xhr.open('POST', getCdnUploadUrl())
        xhr.setRequestHeader('X-Auth-Token', authStore.values.token) // manually set header

        xhr.onload = function () {
          let json
          if (xhr.status !== 200) {
            failure('HTTP Error: ' + xhr.status)
            return
          }

          json = JSON.parse(xhr.response)

          if (!json) {
            failure('Invalid JSON: ' + xhr.response)
            return
          }

          success(json.data) // cdn ees irsen file url iig uguh ystoi
        }
      
        formData = new FormData()
        formData.append('file', blobInfo.blob(), blobInfo.filename())
        formData.append('entity', 'interviewContentImages')
        formData.append('entityId', Math.random().toString(36).substring(2))

        xhr.send(formData)
      }
    }

    return (
      <Editor
        apiKey='2576zajtql8smg94vmlcenzxxfazm3p932utnmmhuaagzj61'
        init={init || defaultInit}
        value={value != null ? value : ''}
        onEditorChange={onEditorChange}
        disabled={disabled}
      />
    )
  }
}

export default RichTextEditor
