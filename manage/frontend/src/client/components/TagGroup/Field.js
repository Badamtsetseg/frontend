import React, {Component} from 'react'
import {Form} from 'antd'

import TagGroup from './index'

class FieldSet extends Component {

  state = {
    initialValues: [],
    values: [],
  }

  componentWillReceiveProps(props) {
    if (props.initial !== this.state.initialValues) {

      const newkeys = []
      props.initial.map((element, index) => {
        newkeys.push({value: element})
      })
      this.setState({initialValues: props.initial, keys: newkeys})
    }
  }

  checkError = (rule, value, callback) => {
    const {label} = this.props
    if (!value || value.length === 0) {
      callback(label + ' оруулна уу')
    } else {
      callback()
    }
  }

  setList = list => {
    const {form, value} = this.props
    const {values} = this.state

    if (values && list) {
      form.setFields({
        [value]: {
          value: list,
        },
      })
    }
  }

  render() {
    const {label, value, prefixIcon, form, initial, options} = this.props
    return (
      <div>
        <Form.Item name={value} label={label} valuePropName='initialTags' initialValue={initial} rules={
          [{validator: this.checkError}]
        }>
          <TagGroup
            options={options && options.options && options.options.length > 0 ? options.options : []}
            setTagList={this.setList}
            inputWith={400}
            tagColor='geekblue'
            textLenght={100}
          />
        </Form.Item>
      </div>
    )
  }
}

export default FieldSet
