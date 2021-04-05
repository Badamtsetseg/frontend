import Link from 'next/link'
import Image from 'next/image'
import {List, Typography} from 'antd'
import styles from './branch.module.less'

const { Paragraph } = Typography

const HomeBranch = () => {

  const data = [
    {
      title: 'Мал аж ахуй',
      description: 'Хөдөө аж ахуйн салбарын 2020-2021 оны өвөлжилт хаваржилтийн бэлтгэл хангах зарим арга хэмжээ',
      icon: '/images/icons/branch-01.svg',
      url: '/home',
    },
    {
      title: 'Газар тариалан',
      description: 'Газар тариалангийн салбарын үйлдвэрлэлийг үнэ цэнийн сүлжээгээр хөгжүүлж, бүтээмжийг нэмэгдүүлэн өрсөлдөх чадварыг сайжруулахад чиглэгдэнэ',
      icon: '/images/icons/branch-02.svg',
      url: '/home',
    },
    {
      title: 'Хүнсний үйлдвэр',
      description: 'Хүн амын хэрэгцээг эрүүл баталгаатай хүнсээр хангах, шинжлэх ухааны өндөр түвшний технологи нэвтрүүлж, олон улсын зах зээлд “Монгол брэнд” хүнсний бүтээгдэхүүн гаргах, хүн амын хэрэгцээнд нийлүүлж байгаа махны 50 хувь, сүүний 60 хувийг үйлдвэрлэлийн аргаар боловсруулах.',
      icon: '/images/icons/branch-03.svg',
      url: '/home',
    },
    {
      title: 'Хөнгөн үйлдвэр',
      description: 'Эдийн засгийн бүтцийн шинэчлэлтийг эхлүүлж, өрсөлдөх чадварыг нэмэгдүүлэн, импортыг орлох болон экспортод чиглэсэн хүнд, хөнгөн үйлдвэрлэлийг хөгжүүлэх үе - Хөдөө аж ахуйн бүтээгдэхүүний боловсруулалтын түвшнийг нэмэгдүүлж, малын гаралтай бүтээгдэхүүний экспорт нэмэгдсэн байна.',
      icon: '/images/icons/branch-04.svg',
      url: '/home',
    },
    {
      title: 'Жижиг, дунд үйлдвэр',
      description: 'Жижиг, дунд үйлдвэр, хоршооны бодлогын хэрэгжилтийг зохицуулахдаа дараах хууль, эрх зүйн орчины хүрээнд үйл ажиллагаагаа явуулдаг. ',
      icon: '/images/icons/branch-05.svg',
      url: '/home',
    },
    {
      title: 'Бүтээгдэхүүн',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      icon: '/images/icons/branch-06.svg',
      url: '/home',
    },
  ]

  return (
    <div className='container'>
      <div className='title'>
        Манай байгууллагын хариуцдаг дараах<br />салбаруудаас шууд сонгож мэдээлэл авч болно.
      </div>
      <List
        className={styles.list}
        grid={{
          gutter: 10,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={data}
        renderItem={item => (
          <List.Item className={styles.listItem}>
            <Link href={item.url}>
              <div className={styles.inner}>
                <div className={styles.left}>
                  <div className={styles.icon}>
                    <Image
                      src={item.icon}
                      alt='logo-main'
                      width={200}
                      height={200}
                    />
                  </div>
                </div>
                <div className={styles.right}>
                  <h3>{item.title}</h3>
                  <Paragraph ellipsis={{rows: 3, expandable: false}} className={styles.description}>{item.description}</Paragraph>
                </div>
              </div>
            </Link>
          </List.Item>
        )}
      />
    </div>
  )
}

export default HomeBranch
