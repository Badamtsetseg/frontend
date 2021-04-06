import Link from 'next/link'
import Image from 'next/image'
import {List} from 'antd'
import styles from './systems.module.less'

const HomeSystems = () => {

  const data = [
    {
      title: 'Малын удам зүйн үнэлгээний цахим хуудас',
      link: 'www.muz.gov.mn',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/Untitled.jpg',
    },
    {
      title: 'Органик хүнс, хөдөө аж ахуй',
      link: 'organicmongol.com',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/organic_post-02_%281910110001%29_%281%29.jpg',
    },
    {
      title: 'Жижиг, дунд үйлдвэрлэл эрхлэгчдийн мэдээллийн сан',
      link: 'www.sme.gov.mn',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/1-02.png',
    },
    {
      title: 'Хөдөө аж ахуйн нэмүү өртгийн сүлжээ мэдээллийн индэр',
      link: 'www.vcmongolia.mn',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/1-02.png',
    },
    {
      title: 'Хөдөө аж ахуйн үндэсний портал',
      link: 'www.agrinfo.gov.mn',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/agrinfo.jpg',
    },
    {
      title: 'Малчин лавлах мэдээллийн төв',
      link: 'www.109.mce.mn',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/download1.png',
    },
    {
      title: 'Стратегийн хүнсний сонгон шалгаруулалт',
      link: 'www.eximp.mofa.gov.mn',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/ZG_logo_mongol.jpg',
    },
    {
      title: 'Засгийн газрын иргэд олон нийттэй харилцах төв',
      link: 'www.11-11.mn',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/1-051.png',
    },
    {
      title: 'Статистик мэдээллийн нэгдсэн сан',
      link: 'www.1212.mn',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/1-021.png',
    },
    {
      title: 'Эрх зүйн мэдээллийн нэгдсэн систем',
      link: 'www.legalinfo.mn',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/1-06.png',
    },
    {
      title: 'Төрийн худалдан авах ажиллагааны цахим систем',
      link: 'www.tender.gov.mn',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/1-031.png',
    },
    {
      title: 'Хөрөнгө орлогын цахим мэдүүлэг',
      link: 'www.meduuleg.iaac.mn',
      icon: 'https://mofa.gov.mn/exp/images/uploads/contact/1-041.png',
    },
  ]

  return (
    <div className={styles.wrapper}>
      <div className='container'>
        <div className='title'>
          Мэдээллийн системүүд
        </div>
        <List
          className={styles.list}
          grid={{
            gutter: 10,
            xs: 2,
            sm: 2,
            md: 3,
            lg: 6,
            xl: 6,
            xxl: 6,
          }}
          dataSource={data}
          renderItem={item => (
            <List.Item className={styles.listItem}>
              <Link href={item.link}>
                <a target='_blank'>
                  <div className={styles.inner}>
                    <div className={styles.icon}>
                      <img
                        src={item.icon}
                        alt='logo-main'
                      />
                    </div>
                    <h3>{item.title}</h3>
                    {/* {item.link && <p>{item.link}</p>} */}
                  </div>
                </a>
              </Link>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default HomeSystems
