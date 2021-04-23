import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {Layout, Button, Drawer} from 'antd'
import {MenuFoldOutlined} from '@ant-design/icons'
import TopMenu from '../TopMenu'

import styles from './publicHeader.module.less'

const PublicHeader = ({isMobile}) => {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }
  
  return (
    <Layout.Header className={styles.headerWrapper} style={isMobile ? {height: 80} : {}}>
      <div className='container'>
        <div className={styles.top}>
          <div className={styles.left}>
            <Link href='/home'>
              <span style={{width: !isMobile ? '280px' : '240px'}}>
                <Image
                  src='/images/logo/main.svg'
                  alt='logo-main'
                  width={!isMobile ? 260 : 220}
                  height={70}
                />
              </span>
            </Link>
            {isMobile ? (
              <>
                <Button ghost onClick={showDrawer}>
                  <MenuFoldOutlined />
                </Button>
                <Drawer
                  placement='left'
                  closable={false}
                  onClose={onClose  }
                  visible={visible}
                  className={styles.drawer}
                >
                  <TopMenu mode='vertical' isMobile={true} />
                </Drawer>
              </>
            ) : null}
          </div>
          {!isMobile && (
            <div className={styles.right}>
              <ul>
                <li>
                  <Link href='https://email.gov.mn'><a target='_blank'>Имэйл шалгах</a></Link>
                </li>
                <li>
                  <Link href='/faq'>Асуулт хариулт</Link>
                </li>
                <li>
                  <Link href='/site-map'>Сайтын бүтэц</Link>
                </li>
                <li>
                  <Link href='/contact'>Холбоо барих</Link>
                </li>
                <li>
                  <Link href='/links'>Вэб холбоос</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        {isMobile ? null : (
          <div className={styles.bottom}>
            <TopMenu mode='horizontal' />
          </div>
        )}
      </div>
    </Layout.Header>
  )
}

export default PublicHeader
