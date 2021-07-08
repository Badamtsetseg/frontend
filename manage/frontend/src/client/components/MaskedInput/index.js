import React, {Component} from 'react'
import {Input} from 'antd'

import {getRegex} from '../../../common/utils/regexUtil'

class MaskedInput extends Component {
  onChange = e => {
    const {pattern} = this.props
    const {value} = e.target
    //const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
    const regex = getRegex(pattern)
    if (regex.test(value)) {
      // this.props.onChange(value) // TODO callback
    }
  }

  onBlur = () => {
    const {value, onBlur, onChange} = this.props
    if (value) {
      onChange(value)
    }
    if (onBlur) {
      onBlur()
    }
  }

  render() {
    const {placeholder} = this.props
    return (
      <Input
        {...this.props}
        title={placeholder}
        onChange={this.onChange}
        onBlur={this.onBlur}
        placeholder={placeholder}
        maxLength={25}
      />
    )
  }
}

export default MaskedInput
