import React, {Component} from 'react'
import {Editor} from '@tinymce/tinymce-react'

class RichTextViewer extends Component {
  // TODO хэрэв plugin нэмсэн бол JS файлаа татаж аваад \src\client\assets\tinymce folder дотор хуулах шаардлагатай

  render() {
    const {value, init} = this.props

    // used this plugin https://www.npmjs.com/package/@wiris/mathtype-tinymce5
    // let tiny_mce_wiris_url = 'https://starter.astvision.mn/static/tinymce/plugin-math.min.js'
    // if (process.env.NODE_ENV === 'development') {
    //   tiny_mce_wiris_url = 'http://localhost:3000/static/tinymce/plugin-math.min.js'
    // }

    const defaultInit = {
      plugins: ['autoresize'],
      // external_plugins: {
      //   'tiny_mce_wiris': tiny_mce_wiris_url
      // },
      menubar: false,
      statusbar: false,
      toolbar: false,
      max_height: 800
    }

    return (
      <Editor
        apiKey='2576zajtql8smg94vmlcenzxxfazm3p932utnmmhuaagzj61'
        init={init || defaultInit}
        value={value != null ? value : ''}
        disabled={true}
      />
    )
  }
}

export default RichTextViewer
