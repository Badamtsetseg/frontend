import {NextSeo} from 'next-seo'
import Link from 'next/link'
import {Breadcrumb, Row, Col} from 'antd'
import {HomeOutlined} from '@ant-design/icons'

import styles from './news.module.less'

const NewsList = ({children}) => {

  const menu = [
    {
      title: 'Сүүлд нэмэгдсэн',
      id: '0'
    },
    {
      title: 'Онцлох',
      id: '1'
    },
    {
      title: 'Цаг үе',
      id: '2'
    },
    {
      title: 'Фото мэдээ',
      id: ''
    },
    {
      title: 'Видео мэдээ',
      id: '3'
    },
    {
      title: 'Атар-60',
      id: '4'
    },
    {
      title: 'Хөнгөн-85',
      id: ''
    },
    {
      title: 'Хэвлэлийн мэдээ',
      id: '5'
    },
    {
      title: 'Урилга',
      id: '6'
    },
    {
      title: 'Их уншсан',
      id: '7'
    }
  ]
  return (
    <>
      <NextSeo title='MOFA - Мэдээ, мэдээлэл'/>
      <div className='container'>
        <div className='breadcrumb'>
          <Breadcrumb>
            <Breadcrumb.Item href=''>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href=''>
              <span>Мэдээ, мэдээлэл</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Application</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Row gutter={25}>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className='title'>
              Мэдээ, мэдээлэл
            </div>
            <ul className={styles.menu}>
              {menu.map(item => (
                <li key={item.id}>
                  <Link href='/'>{item.title}</Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col xs={0} sm={24} md={12} lg={18}>
            {children}
          </Col>
        </Row>
      </div>
    </>
  )
}

export default NewsList
