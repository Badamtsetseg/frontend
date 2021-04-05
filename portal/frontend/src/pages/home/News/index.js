import Link from 'next/link'
import {List, Row, Col, Typography} from 'antd'
import Slider from 'react-slick'

import styles from './news.module.less'

const { Paragraph } = Typography
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoPlay: true,
}

const HomeNews = () => {

  const data = [
    {
      title: 'Цар тахлын эрсдлээс хамтдаа урьдчилан сэргийлье',
      description: 'Улсын онцгой комиссын даргын 3-р сарын 26-ны өдрийн тушаалаар Шуурхай зохицуулалтын ажлын хэсэг байгуулагдаж, зах, худалдааны төв хариуцсан бүлгийн даргаар ХХААХҮ-ийн сайд З.Мэндсайхан томилогдсон.',
      image: 'https://mofa.gov.mn/exp/images/uploads/article/B472E043-0C1D-4C74-8915-7003DF9F1A89.jpeg',
      url: '/home12',
    },
    {
      title: 'Цар тахлын эрсдлээс хамтдаа урьдчилан сэргийлье',
      description: 'Улсын онцгой комиссын даргын 3-р сарын 26-ны өдрийн тушаалаар Шуурхай зохицуулалтын ажлын хэсэг байгуулагдаж, зах, худалдааны төв хариуцсан бүлгийн даргаар ХХААХҮ-ийн сайд З.Мэндсайхан томилогдсон.',
      image: 'https://mofa.gov.mn/exp/images/uploads/article/A04CB986-7775-4FDD-8A17-FBCFC3C799D3.jpeg',
      url: '/home',
    },
    {
      title: 'УРИАЛГА',
      description: 'Улс орныг хамарсан цар тахал гарсан эрсдэлтэй үед шантрахгүй, амралтгүй ажиллаж байгаа нийт үйлдвэрлэгчид, малчид, тариаланчид, худалдаачид та бүхэндээ Монгол Улсын Засгийн газрын нэрийн өмнөөс болон салбар яамныхаа хамт олныг төлөөлөн гүн талархал илэрхийлье.',
      image: 'https://mofa.gov.mn/exp/images/uploads/article/164053330_500401947655774_5529246579501111648_n.jpg',
      url: '/home',
    },
    {
      title: 'Худалдаа, үйлдвэрлэл эрхлэгч, нийлүүлэгчдийн үндэсний чуулган боллоо',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      image: 'https://mofa.gov.mn/exp/images/uploads/article/167123146_500139324347121_2115561222103123462_n.jpg',
      url: '/home',
    },
  ]

  return (
    <div className='container'>
      <br />
      <Row gutter={50}>
        <Col xs={24} sm={24} md={14} lg={14}>
          <div className='title'>
            Онцлох мэдээ
          </div>
          <Slider {...settings}>
            {data.map(item => (
              <div className={styles.sliderItem} key={item.id}>
                <div className={styles.image} style={{backgroundImage: `url(${item.image})`}} />
                <div className={styles.content}>
                  <Paragraph ellipsis={{rows: 2, expandable: false}} className={styles.title}>{item.title}</Paragraph>
                  <Paragraph ellipsis={{rows: 3, expandable: false}} className={styles.description}>{item.description}</Paragraph>
                </div>
              </div>
            ))}
          </Slider>
          <br />    
          <br />
        </Col>
        <Col xs={24} sm={24} md={10} lg={10}>
          <div className='title'>
            Сүүлд нэмэгдсэн
          </div>
          <List
            className={styles.list}
            size='small'
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item className={styles.listItem} key={`news-right-${index}`}>
                <Link href={item.url}>
                  <div className={styles.inner}>
                    <div className={styles.left}>
                      <div className={styles.image} style={{backgroundImage: `url(${item.image})`}} />
                    </div>
                    <div className={styles.right}>
                    <Paragraph ellipsis={{rows: 3, expandable: false}} className={styles.title}>{item.title}</Paragraph>
                    <Paragraph ellipsis={{rows: 2, expandable: false}} className={styles.description}>{item.description}</Paragraph>
                    </div>
                  </div>
                </Link>
              </List.Item>
            )}
          />
          <br />
        </Col>
      </Row>
    </div>
  )
}

export default HomeNews
