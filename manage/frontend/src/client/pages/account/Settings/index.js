import React, {useState, useEffect} from 'react'
import {Avatar, Card, List, message} from 'antd'
import {inject, observer} from 'mobx-react'
import PasswordDrawer from './PasswordDrawer'
import InfoDrawer from './InfoDrawer'

import PasswordImage from '../../../assets/common/settings-password.svg'
import ProfileImage from '../../../assets/common/settings-user.svg'

const Settings = inject('accountStore', 'authStore')
(observer(({accountStore, accountStore: {profile, loading}, authStore, history}) => {

  const [confirmDirty, setConfirmDirty] = useState(false)
  const [passwordDrawerVisible, setPasswordDrawerVisible] = useState(false)
  const [infoDrawerVisible, setInfoDrawerVisible] = useState(false)
  const [action, setAction] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    refreshPage()
  }, [])

  const refreshPage = () => {
    accountStore.getProfile()
  }

  const handleUpdate = ({action, ...values}) => {

    if (action === 'changePassword') {
      accountStore.changePassword(values)
        .then(response => {
          if (response.result) {
            message.success('Нууц үг амжилттай солигдлоо')
            authStore.reset()
            history.push('/auth/login')
          } else {
            message.error(`Нууц үг солиход алдаа гарлаа: ${response.message}`)
          }
        })
        .catch(e => {
          message.error(`Нууц үг солиход алдаа гарлаа: ${e.message}`)
        })
    }
    if (action === 'changeInfo') {
      accountStore.updateProfile(values)
        .then(response => {
          if (response.result) {
            message.success('Хувийн мэдээлэл амжилттай солигдлоо')
            refreshPage()
            hideSettings()
          } else {
            message.error(`Хувийн мэдээлэл солиход алдаа гарлаа: ${response.message}`)
          }
        })
        .catch(e => {
          message.error(`Хувийн мэдээлэл солиход алдаа гарлаа: ${e.message}`)
        })
    }
  }

  const showSettings = (action, title) => {
    setPasswordDrawerVisible(action === 'changePassword')
    setInfoDrawerVisible(action === 'changeInfo')
    setAction(action)
    setTitle(title)
  }

  const hideSettings = () => {
    setPasswordDrawerVisible(false)
    setInfoDrawerVisible(false)
  }

  const renderPasswordDrawer = () => {
    return (
      <PasswordDrawer
        drawerVisible={passwordDrawerVisible}
        action={action}
        handleEdit={handleUpdate}
        onClose={hideSettings}
      />
    )
  }

  const renderInfoDrawer = () => {
    return (
      <InfoDrawer
        drawerVisible={infoDrawerVisible}
        currentUser={profile}
        action={action}
        handleEdit={handleUpdate}
        onClose={hideSettings}
      />
    )
  }

  const renderIcon = (icon) => {
    switch (icon) {
      case 'safety':
        return PasswordImage
      default:
        return ProfileImage
    }
  }

  const data = [
    {
      title: 'Нууц үг солих',
      action: 'changePassword',
      icon: 'safety',
    },
    {
      title: 'Хувийн мэдээлэл засварлах',
      action: 'changeInfo',
      icon: 'user',
    },
  ]

  return (
    <Card bordered={loading} title='Тохиргоо'>
      <List
        itemLayout='horizontal'
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar shape='square' src={renderIcon(item.icon)} style={{backgroundColor: '#f0f2f5'}}/>}
              title={<a onClick={() => showSettings(item.action, item.title)}>{item.title}</a>}
              description=''
            />
          </List.Item>
        )}
      />
      {renderInfoDrawer()}
      {renderPasswordDrawer()}
    </Card>
  )
}))

export default Settings
