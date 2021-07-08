import React, {PureComponent} from 'react'
import {Input, Tag, Tooltip} from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons'

class TagGroup extends PureComponent {

  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
    btnColor: '',
    tagColor: '',
    inputWith: 200,
  }

  componentDidMount() {
    const {initialTags, tagColor, btnColor, inputWith} = this.props

    if (initialTags) {
      this.setState({
        tags: initialTags,
      })
    }
    if (inputWith) {
      this.setState({
        inputWith,
      })
    }
    if (tagColor) {
      this.setState({
        tagColor,
      })
    }
    if (btnColor) {
      this.setState({
        btnColor,
      })
    }
  }

  componentWillUpdate(nextProps) {
    this.setInitialTags(nextProps)
  }

  setInitialTags = (nextProps) => {
    if (nextProps && nextProps.initialTags) {
      this.setState({tags: nextProps.initialTags})
    }
  }

  handleClose = (removedTag) => {
    const {onBlur} = this.props
    if (this.state) {
      const tags = this.state.tags.filter(tag => tag !== removedTag)
      this.setState({tags})
      const {setTagList} = this.props
      if (setTagList)
        setTagList(tags)
    }

    if (onBlur) onBlur()
  }

  showInput = () => {
    this.setState({inputVisible: true}, () => this.input.focus())
  }

  handleInputChange = (e) => {
    this.setState({inputValue: e.target.value})
  }

  handleInputConfirm = () => {
    const {onBlur} = this.props
    const {inputValue} = this.state
    let {tags} = this.state
    if (tags) {
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      this.setState({
        tags,
        inputVisible: false,
        inputValue: '',
      })

      const {setTagList} = this.props
      if (setTagList) {
        setTagList(tags)
      }
    }
    if (onBlur) onBlur()
  }

  saveInputRef = input1 => {
    this.input = input1
  }

  render() {
    const {disable} = this.props
    const {tags, inputVisible, inputValue, tagColor, btnColor, inputWith} = this.state
    return (
      <div>
        {tags.map((tag) => {
          const isLongTag = tag.length > 30
          const tagElem = (
            <Tag
              key={tag}
              color={tagColor}
              closable={!disable}
              onClose={() => this.handleClose(tag)}
            >
              {isLongTag ? `${tag.slice(0, 30)}...` : tag}
            </Tag>
          )
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type='text'
            size='small'
            style={{width: inputWith}}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && !disable && (
          <Tag
            onClick={this.showInput}
            style={{background: '#fff', borderStyle: 'dashed'}}
            color={btnColor}
          >
            <PlusCircleOutlined/> Нэмэх
          </Tag>
        )}
      </div>
    )
  }
}

export default TagGroup
