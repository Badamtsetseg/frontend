import {useState, useEffect} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {Button, Menu, Avatar, Image, Dropdown, Divider} from 'antd'
import {CaretDownOutlined, SettingOutlined, KeyOutlined, AppstoreAddOutlined, QuestionCircleOutlined, LogoutOutlined} from '@ant-design/icons'
import classNames from 'classnames'

import styles from './publicTopMenu.module.less'

const PublicTopMenu = ({mode, isMobile}) => {
  const [active, setActive] = useState('home')
  const router = useRouter()

  const menu = [
    {
      key: 'home',
      link: '/home',
      title: 'Нүүр'
    }, {
      key: 'news',
      link: '/news',
      title: 'Мэдээ, мэдээлэл'
    }, 
    {
      key: 'clear',
      link: '/clear',
      title: 'Ил тод байдал'
    }, 
    {
      key: 'pricing',
      link: '/pricing',
      title: 'Үнэ тариф'
    }, 
    {
      key: 'services',
      link: '/services',
      title: 'Үйлчилгээ'
    },  
    {
      key: 'legal',
      link: '/legal',
      title: 'Хууль эрх зүй'
    }, 
    {
      key: 'e-office',
      link: '/e-office',
      title: 'Е-ОФФИСЕ',
      publicLink: 'http://login.igovernment.mn/?continue=http%3A%2F%2Fmofa.igovernment.mn%2Fhome%2F'
    }, 
  ]

  useEffect(() => {
    setActive(router.pathname.split('/')[1])
  }, [router])
  
  return (
    <div className={classNames(styles.menuWrapper, isMobile && styles.mobile)}>
      <Menu
        theme='dark' 
        mode={mode}
        selectedKeys={[active]}
      >
        {menu.map((item) => (
          <Menu.Item key={item.key}>
            <Link key={item.key} href={item.publicLink || item.link}>
              {item.publicLink ? 
                (
                  <a target='_blank'>{item.title}</a>
                )
                :
                item.title
              }
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  )
}

export default PublicTopMenu
