import {NextSeo} from 'next-seo'
import Link from 'next/link'
import {List, Typography, Tag} from 'antd'
import {HomeOutlined} from '@ant-design/icons'

import styles from '../news.module.less'

import NewsWrapper from '../index'

const { Paragraph } = Typography

const NewsLatestList = () => {
  
  const data = {
    pagination: {
      currentPage: 0,
      pageSize: 8,
      total: 69,
      sortDirection: 'DESC',
      current: 0
    },
    list: [
      {
        id: '607032a0284fac5817ebab6f',
        createdDate: '2021-04-10T08:56:17.954',
        modifiedDate: '2021-04-10T08:56:17.954',
        createdUser: null,
        modifiedUser: null,
        type: 'COVID',
        covidType: '602e43f332fbad1456ce6e31',
        title: 'Гамшгаас хамгаалах бүх нийтийн бэлэн байдлын зэрэгт шилжүүлсэнтэй холбогдуулан халдварын голомт бүхий аймаг, нийслэлд хавьтал тогтоох, тандалт судалгааг эрчимжүүлнэ.',
        description: 'Гамшгаас хамгаалах бүх нийтийн бэлэн байдлын зэрэгт шинжсэнтэй холбогдуулан авах зарим арга хэмжээний  тухай',
        content: '<p>Улаанбаатар хотыг дөрөвдүгээр сарын 10-25-нд Гамшгаас хамгаалах бүх нийтийн бэлэн байдлын зэрэгт шилжүүлэх хугацаанд хийх зохицуулалтын талаар Улсын Онцгой комиссоос доорх тогтоолыг гаргажээ.</p>\n<p>Уг тогтоолд:<br /><br />&nbsp;&bull; Иргэдийн эрүүл мэндийг дэмжих, хөдөлгөөнийг дутагдлаас сэргийлэх зорилгоор оршин суугаа газрын гадаад талбай, цэцэрлэгт хүрээлэн, тоглоомын талбайд алхах зугаалах зэргийг зөвшөөрнө. Гэхдээ хүнд хоорондын зайг сайтар баримтлах<br />&nbsp;&bull; Оршуулга, буяны үйл ажиллагаанд оролцох хүний тоог заах<br />&nbsp;&bull; Хязгаарлахгүй үйл ажиллагаа явуулах иргэн, ААН-д тодорхой маршрутын дагуу зорчих эрх бүхий QR код олгох<br />&nbsp;&bull; 18 градусаас дээш агууламжтай архи, согтууруулах ундааны зүйлс худалдаалах болон түүгээр үйлчлэхийг хориглох, гэр бүлийн хүчирхийллээс урьдчилан сэргийлэх, бууруулах арга хэмжээ тусгажээ.</p>\n<p><img src="https://cdn.e-mongolia.mn/files/interviewContentImages/r6c0gb14gtg/607031b54927ae4ab91863c3.jpg" alt="" width="650" height="839" /></p>\n<p><img src="https://cdn.e-mongolia.mn/files/interviewContentImages/foi40fm8qo8/607031c84927ae4ab91863c5.jpg" alt="" width="647" height="835" /></p>\n<p><img src="https://cdn.e-mongolia.mn/files/interviewContentImages/lnhm1l3hre/6070324c08a7dd155846d944.jpg" alt="" width="649" height="838" /></p>\n<p><img src="https://cdn.e-mongolia.mn/files/interviewContentImages/6uhk5fqg3al/6070326108a7dd155846d946.jpg" alt="" width="653" height="842" /></p>\n<p><img src="https://cdn.e-mongolia.mn/files/interviewContentImages/j5iafr1zpso/6070327008a7dd155846d948.jpg" alt="" width="644" height="839" /></p>',
        coverImg: {
          uid: 'rc-upload-1617964516631-3',
          name: 'ЗГ зураг.jpg',
          url: 'https://cdn.e-mongolia.mn/files/articleCoverImg/2zawl2nt3ua/607031a408a7dd155846d942.jpg',
          status: 'done'
        },
        icon: null,
        source: 'Улсын онцгой комиссын тогтоол',
        important: false,
        typeName: 'Ковид',
        covidTypeName: 'Мэдээ',
        createdDateText: '2021/04/10 08:56',
        key: '607032a0284fac5817ebab6f'
      },
      {
        id: '606ec2ca2f80af4c3f5d01a1',
        createdDate: '2021-04-08T16:46:02.842',
        modifiedDate: '2021-04-08T16:46:02.842',
        createdUser: null,
        modifiedUser: null,
        type: 'COVID',
        covidType: '602e43f332fbad1456ce6e31',
        title: 'Батлагдсан тохиолдлын ойрын хавьтлын тусгаарлах байранд тусгаарлагдах зардлыг төр хариуцна',
        description: 'Батлагдсан тохиолдлын ойрын хавьтлын тусгаарлах байранд тусгаарлагдах зардлыг төр хариуцна',
        content: '<p>Улсын онцгой комиссын даргын 2021 оны 04 дүгээр сарын 02-ны өдрийн 31 дүгээр тушаалаар &ldquo;Тусгаарлан ажиглах үйл ажиллагааг зохицуулах түр журам&rdquo;-д нэмэлт өөрчлөлт орсон. Энэхүү өөрчлөлтөөр тус журмын 2.1.2-т коронавируст халдвар/КОВИД-19/-ын батлагдсан тохиолдлын ойрын хавьтлыг өөрийн хүсэлтээр тусгаарлан ажиглах байрны төлбөрийг төлүүлж 7 хоног тусгаарлахаар зааж өгсөн. Энэ талаар УОК-ын Шуурхай штабаас иргэдэд мэдээлэл хүргэсэн юм.</p>\n<p>Тэгвэл журмын энэхүү заалт нь &ldquo;Эрүүл мэндийн тухай&rdquo; хуулийн 24.6.4-т заасан &ldquo;Нийгмийн эрүүл мэндийн үйл ажиллагаа, арга хэмжээ болон гамшиг, нийтийг хамарсан халдварт өвчний дэгдэлтийн үеийн эрүүл мэндийн тусламж үйлчилгээг төр хариуцна&rdquo; гэсэн заалттай зөрчилдсөн тул дахин өөрчлөхөөр болжээ.</p>\n<p>Ингэхдээ коронавируст халдвар/КОВИД-19/-ын батлагдсан тохиолдлын ойрын хавьтлыг тандалтын багийн санал, эсвэл тухайн хүний хүсэлтийг харггалзан долоо хоног тусгаарлах байранд тусгаарлана гэж өөрчлөхөөр болсон байна.</p>\n<p>Өөрөөр хэлбэл, коронавируст халдвар/КОВИД-19/-ын батлагдсан тохиолдлын ойрын хавьтал болсон хүн тусгаарлах байранд тусгаарлагдахад ямар нэгэн төлбөр төлөхгүй, зардлыг төр хариуцна.</p>\n<p>&ldquo;Эрүүл мэндийн тухай&rdquo; хуульд тохируулан энэхүү залруулгыг хийж байна гэж&nbsp;<strong><em>УОК-ын Шуурхай штабаас мэдээллээ.</em></strong></p>',
        coverImg: null,
        icon: null,
        source: null,
        important: false,
        typeName: 'Ковид',
        covidTypeName: 'Мэдээ',
        createdDateText: '2021/04/08 16:46',
        key: '606ec2ca2f80af4c3f5d01a1'
      },
      {
        id: '606ae5a898d87f1ba6ad65db',
        createdDate: '2021-04-05T18:25:44.989',
        modifiedDate: '2021-04-05T18:25:44.989',
        createdUser: null,
        modifiedUser: null,
        type: 'COVID',
        covidType: '602e43f332fbad1456ce6e31',
        title: 'Зайлшгүй шалтгаанаар орон нутгийг зорих иргэдийг шинжилгээнд хамруулах цэгийн байршил',
        description: 'Зайлшгүй шалтгаанаар орон нутгийг зорих иргэдийг шинжилгээнд хамруулах цэгийн байршил',
        content: '<p>Хөдөө орон нутагт зайлшгүй /хүнс, шатахуун, малын өвс, тэжээл тээвэр, уул уурхай, газар тариалан, буяны ажил, эрүүл мэнд/ шалтгаанаар зорчих иргэдийг PCR шинжилгээнд хамруулах явуулын цэгийн байршлыг танилцуулж байна.Үүнд:</p>\n<p>-СХД-ийн 32 дугаар хороо &ldquo;Авто худалдааны төв&rdquo;,</p>\n<p>-&ldquo;Буянт-Ухаа&rdquo; спортын ордон,</p>\n<p>-БЗД-ийн 8 дугаар хороо &ldquo;Баянзүрх&rdquo; авто оношилгооны төв,</p>\n<p>Дээрх дурдсан шалтгаанаар хөдөө орон нутагт зорчих иргэд нь иргэний үнэмлэх, тухайн аймгийн Онцгой комиссын шийдвэр зэрэг баримт бичгийг бүрдүүлнэ&nbsp;<strong><em>гэж УОК-ын Шуурхай штабаас мэдээллээ.</em></strong></p>',
        coverImg: {
          uid: 'rc-upload-1617618243683-5',
          name: '168475934_230579368805476_5301001406543184869_n-6zg4w10yeqyv4fc2iuwv09k9jkuy720nts6fvyoue68.jpg',
          url: 'https://cdn.e-mongolia.mn/files/articleCoverImg/l5usc6m8o1/606ae54ac337b51bdaeef15d.jpg',
          status: 'done'
        },
        icon: null,
        source: null,
        important: false,
        typeName: 'Ковид',
        covidTypeName: 'Мэдээ',
        createdDateText: '2021/04/05 18:25',
        key: '606ae5a898d87f1ba6ad65db'
      },
      {
        id: '606ae57898d87f1ba6ad65da',
        createdDate: '2021-04-05T18:24:56.724',
        modifiedDate: '2021-04-05T18:24:56.724',
        createdUser: null,
        modifiedUser: null,
        type: 'COVID',
        covidType: '602e43f332fbad1456ce6e31',
        title: 'Ирэх амралтын өдрүүдэд их дэлгүүр, зах, худалдааны төв, үсчин, гоо сайхны газрууд ажиллахгүй',
        description: 'Ирэх амралтын өдрүүдэд их дэлгүүр, зах, худалдааны төв, үсчин, гоо сайхны газрууд ажиллахгүй',
        content: '<p>Монгол Улсын Засгийн газар, Улсын онцгой комиссоос дөрөв, тавдугаар сарыг дархлаажуулалтын сар болгон зарласан.</p>\n<p>Түүнчлэн Монгол Улсын Ерөнхий сайд Л.Оюун-Эрдэнэ &ldquo;Ковидгүй зуны төлөө&rdquo; уриалгыг гарган, ард иргэдээ дархлаажуулалтад идэвхтэй хамрагдахыг уриалаад байгаа билээ.</p>\n<p>Гэсэн хэдий ч дархлаажуулалт хамрагдах иргэдийн идэвх сул байгаа юм. Тиймээс Засгийн газар, УОК-ын тогтоол, УОК-ын даргын тушаалыг үндэслэн нийслэлийн Засаг дарга &ldquo;Цагийн хуваарьт өөрчлөлт оруулах тухай&rdquo; захирамж гаргалаа.</p>\n<p>Тодруулбал, коронавирусийн халдварын эсрэг дархлаажуулалтад худалдаа, үйлчилгээ эрхлэгчид болон иргэдийг өргөнөөр хамруулах зорилгоор их дэлгүүр, зах, худалдааны төв, үсчин, гоо сайхны газруудын&nbsp; долоо хоногийн амралтын өдрийг дөрөвдүгээр сарын 10-ны бямба, 11-ний ням гарагт шилжүүлэх зохион байгуулалтын арга хэмжээ авч ажиллахыг дээр дурдсан үйл ажиллагаа эрхлэгч иргэд, аж ахуйн нэгж, байгууллагын удирдлагуудад даалгалаа.</p>\n<p>Өөрөөр хэлбэл, их дэлгүүр, зах, худалдааны төв, үсчин, гоо сайхны газрууд долоо хоногийн амралтын өдрүүдээ хагас, бүтэн сайн өдрүүдэд шилжүүлж, ирэх амралтын өдрүүдэд ажиллахгүй, амрах юм.</p>\n<p>Мөн иргэдийг өөрийгөө болон хайртай хүмүүсээ хамгаалж, коронавирусийн эсрэг дархлаажуулалтад идэвхтэй хамрагдахыг уриалж байна гэж&nbsp;<strong><em>УОК-ын Шуурхай штабаас мэдээллээ.</em></strong></p>',
        coverImg: {
          uid: 'rc-upload-1617618243683-3',
          name: '1db22c806c34ac0b5c9e17686ac6b74a-6zgmr3hn2ia3qgwqaett3wmgu1l9fq4eaoc1gqvf60w.jpg',
          url: 'https://cdn.e-mongolia.mn/files/articleCoverImg/30pkkhn32oe/606ae51cc337b51bdaeef15b.jpg',
          status: 'done'
        },
        icon: null,
        source: null,
        important: false,
        typeName: 'Ковид',
        covidTypeName: 'Мэдээ',
        createdDateText: '2021/04/05 18:24',
        key: '606ae57898d87f1ba6ad65da'
      },
      {
        id: '6069377798d87f1ba6ad6385',
        createdDate: '2021-04-04T11:50:15.303',
        modifiedDate: '2021-04-04T11:50:15.303',
        createdUser: null,
        modifiedUser: null,
        type: 'COVID',
        covidType: '602e43f332fbad1456ce6e31',
        title: 'Халдвар тархах өндөр эрсдэлтэй хороод',
        description: 'Халдвар тархах өндөр эрсдэлтэй хороод',
        content: '<p>Нийслэлийн онцгой комиссын Шуурхай штабын Орон зайн дүн шинжилгээний бүлгээс гуравдугаар сарын 15-30-ны хооронд батлагдсан халдварын 2552 тохиолдлыг мэдээллийн санд бүртгэж, орон зайн дүн шинжилгээний аргачлалаар халдварын эрсдэлийн тархалт, нягтрал, чиг хандлагыг тооцоолсон байна.</p>\n<p>Уг тооцооллоор улаан өнгөөр үзүүлсэн хороодын нутаг дэвсгэрт халдварын төв голомт үүсэж, халдвар тархах өндөр эрсдэлтэй &nbsp;байгаа юм. Үүнд:</p>\n<p>Чингэлтэй дүүргийн 6, 14,</p>\n<p>Сүхбаатар дүүргийн 1, 2, 10, 15, 18</p>\n<p>Баянзүрх дүүргийн&nbsp; 4, 5, 6, 7, 8, 14, 15, 16, 18, 21, 25, 26,</p>\n<p>Хан-Уул дүүргийн 2, 3, 4, 8, 15, 16, 18,19, 21,</p>\n<p>Баянгол дүүргийн 2, 3, 4, 5, 6, 24,</p>\n<p>Сонгинохайрхан дүүргийн 3, 6, 12, 14, 15, 17, 18, 27, 29, 37, 41 дугаар хорооны нутаг дэвсгэр багтаж байна.</p>\n<p class="has-text-align-center">&nbsp;</p>',
        coverImg: {
          uid: 'rc-upload-1617505245213-11',
          name: '168300888_789923601933321_566441820202964204_n_20210403033623-6zfmiy9157c4uo14azredv3mz6s33dd6736c11zixxc.jpg',
          url: 'https://cdn.e-mongolia.mn/files/articleCoverImg/vx8kw19oasg/6069377571b8812fc428a3e0.jpg',
          status: 'done'
        },
        icon: null,
        source: 'НЗДТГ-ЫН ХЭВЛЭЛ МЭДЭЭЛЭЛТЭЙ ХАРИЛЦАХ ХЭЛТЭС',
        important: false,
        typeName: 'Ковид',
        covidTypeName: 'Мэдээ',
        createdDateText: '2021/04/04 11:50',
        key: '6069377798d87f1ba6ad6385'
      },
      {
        id: '6069373e98d87f1ba6ad6384',
        createdDate: '2021-04-04T11:49:18.792',
        modifiedDate: '2021-04-04T11:49:18.792',
        createdUser: null,
        modifiedUser: null,
        type: 'COVID',
        covidType: '602e43f332fbad1456ce6e31',
        title: 'Гадаадын улс орнуудаас 31,967 иргэн эх орондоо иржээ',
        description: 'Гадаадын улс орнуудаас 31,967 иргэн эх орондоо иржээ',
        content: '<p>Улсын Онцгой комиссын шийдвэрийн дагуу 2020 оны 01 дүгээр сараас 2021 оны 04 дүгээр сарын 01-нийг хүртэл хугацаанд нийт 149 удаагийн тусгай үүргийн нислэгээр 25,216, ОХУ, БНХАУ-аас хилийн боомтоор 6751 буюу нийт 31,967 иргэнийг татан авах ажиллагааг зохион байгууллаа.</p>\n<p>Өнгөрөгч гуравдугаар сард 12 удаагийн нислэгээр <strong>1832&nbsp;</strong>иргэнээ татан авчээ.</p>\n<p>Харин энэ сард нийт 12 удаагийнтусгай нислэг үйлдэх бөгөөд БНСУ-аас 156 иргэн эх орондоо ирээд байна <strong><em>гэж УОК-ын Шуурхай штабаас мэдээллээ.</em></strong></p>',
        coverImg: {
          uid: 'rc-upload-1617505245213-9',
          name: '5477669826454469862_800_x_533-6wcxhk7ix4uc3gtcy8nn1agehalltw1awgtza3ebdj4-6z4f7yhs98lh4dwft0txq2iybgtsktuvzerx2qzxxkw.jpg',
          url: 'https://cdn.e-mongolia.mn/files/articleCoverImg/jyfjzo02fc/605162a677b1215467dcbd9a.jpg',
          status: 'done'
        },
        icon: null,
        source: null,
        important: false,
        typeName: 'Ковид',
        covidTypeName: 'Мэдээ',
        createdDateText: '2021/04/04 11:49',
        key: '6069373e98d87f1ba6ad6384'
      },
      {
        id: '606936e798d87f1ba6ad6383',
        createdDate: '2021-04-04T11:47:51.708',
        modifiedDate: '2021-04-04T11:47:51.708',
        createdUser: null,
        modifiedUser: null,
        type: 'COVID',
        covidType: '602e43f332fbad1456ce6e31',
        title: 'Ресторанууд үйлчлүүлэгчдийн захиалсан хоолыг хаягаар хүргэх байдлаар ажиллана',
        description: 'Ресторанууд үйлчлүүлэгчдийн захиалсан хоолыг хаягаар хүргэх байдлаар ажиллана',
        content: '<p>Засгийн газар болон Улсын онцгой комиссын тогтоолыг үндэслэн Нийслэлийн Засаг даргын захирамжилснаар;Төрийн байгууллага, иргэн, хуулийн этгээдийн хязгаарлалт тогтоох үйл ажиллагааны 16 чиглэлийг дараах байдлаар баталжээ.</p>\n<p>1. Бүх төрлийн баяр ёслол, тэмдэглэлт ойн арга хэмжээ, хурал, цуглаан, цайллага, хүлээн авалт</p>\n<p>2. Жагсаал, цуглаан, уралдаан тэмцээн</p>\n<p>3. Аялал зугаалга, хурим найр, цайллага, хүлээн авалт</p>\n<p>4. Соёл урлагийн арга хэмжээ, үзвэр үйлчилгээ</p>\n<p>5. Бүх төрлийн баар</p>\n<p>6. Нийтийн бүжиг, бүжгийн клуб</p>\n<p>7. Өргөтгөсөн болон үзэсгэлэн худалдаа</p>\n<p>8. Цахим болон бүх төрлийн тоглоомын газар</p>\n<p>9. Сургалтын төв (танхимын болон үйлдвэрлэлийн сургалт 5-аас дээш хүнтэй бол)</p>\n<p>10. Алжаал тайлах төв</p>\n<p>11. Чийрэгжүүлэх, бялдаржуулах төв</p>\n<p>12. Саун, бассейн</p>\n<p>13. Дэн буудал</p>\n<p>14. Шашны зан үйл, сүм, хийд, мөргөлийн газрууд</p>\n<p>15. Амралт, сувиллын газар</p>\n<p>16. Олимп, тив, дэлхий, олон улсын тэмцээний бэлтгэлээс бусад биеийн тамир, спортын арга хэмжээ (дотоод орчинд 5-аас дээш хүнтэй бол) үйл ажиллагаа явуулж болохгүй.</p>\n<p>Ресторанууд заалны үйлчилгээ явуулахгүй, согтууруулах ундааны зүйлээр үйлчлэхгүй. Үйлчлүүлэгчдийн захиалсан хоолыг бэлтгэн савлаж, өгч явуулах, хүргэж өгөх байдлаар ажиллах шаардлага тавьж байна. Дээрх чиглэлийн үйл ажиллагаа эрхэлдэг аж ахуйн нэгжүүд Улсын Онцгой комиссын &ldquo;Коронавируст халдвар (Ковид-19)-аас сэргийлэх арга хэмжээг зохион байгуулах түр журам&rdquo;-д заасан тусгай нөхцөл, шаардлагыг чанд мөрдөн, үйл ажиллагаандаа өдөр, цагийн зохицуулалт хийнэ.</p>\n<p>Харин хүнсний дэлгүүрээс бусад зах, худалдааны төвүүд лангуу хоорондын зайг барьж, ажилчдынхаа 50 хүртэлх хувийн ирцээр ажиллана&nbsp;<strong><em>гэж Засгийн газрын хэвлэлийн албанаас мэдээллээ</em></strong></p>',
        coverImg: {
          uid: 'rc-upload-1617505245213-7',
          name: 'images-6zfa97xlpoz272g4fcwad6zu598l1mc2o20fyue1tts.jpg',
          url: 'https://cdn.e-mongolia.mn/files/articleCoverImg/oell16suyno/606936e571b8812fc428a3dd.jpg',
          status: 'done'
        },
        icon: null,
        source: null,
        important: false,
        typeName: 'Ковид',
        covidTypeName: 'Мэдээ',
        createdDateText: '2021/04/04 11:47',
        key: '606936e798d87f1ba6ad6383'
      },
      {
        id: '606936ae98d87f1ba6ad6382',
        createdDate: '2021-04-04T11:46:54.363',
        modifiedDate: '2021-04-04T11:46:54.363',
        createdUser: null,
        modifiedUser: null,
        type: 'COVID',
        covidType: '602e43f332fbad1456ce6e31',
        title: '“Ковидын нэгдсэн лавлах 119 төв”ажиллаж эхэллээ',
        description: '“Ковидын нэгдсэн лавлах 119 төв”ажиллаж эхэллээ',
        content: '<p>УОК-ын шуурхай штабын үйл ажиллагааг бүрэн цахимжуулж, иргэдэд аль болох чирэгдэлгүй байх, мэдээллийг ил тод, хүртээмжтэй хүргэх зорилгоор ковидын холбогдолтой лавлагаа мэдээллийн дугааруудыг нэгтгэж, дуудлагын нэгдсэн системийг нэвтрүүлээд байна. Тухайлбал иргэд ковидтой холбоотой асуудлаар зөвлөгөө, мэдээлэл авах, санал, гомдол, хүсэлтээ илэрхийлэх зэрэг нэгдсэн мэдээллийг 119 тусгай дугаарт залган авах боломжтой.</p>\n<p>Монгол Улсын Шадар сайд, Улсын онцгой комиссын дарга С.Амарсайхан УОК-ын Шуурхай штабт ажиллаж, &ldquo;Ковидын нэгдсэн лавлах 119 төв&rdquo;-ийн ажил, үйлчилгээтэй танилцлаа.</p>\n<figure class="wp-block-image size-large"><img class="wp-image-114232" src="https://nema.gov.mn/wp-content/uploads/2021/04/GJ1A6134-1024x682.jpg" sizes="(max-width: 1024px) 100vw, 1024px" srcset="https://nema.gov.mn/wp-content/uploads/2021/04/GJ1A6134-1024x682.jpg 1024w, https://nema.gov.mn/wp-content/uploads/2021/04/GJ1A6134-300x200.jpg 300w, https://nema.gov.mn/wp-content/uploads/2021/04/GJ1A6134-768x512.jpg 768w, https://nema.gov.mn/wp-content/uploads/2021/04/GJ1A6134.jpg 1400w" alt="" width="1024" height="682" loading="lazy" /></figure>\n<p>Тус төв нь иргэдэд мэдээлэл өгч байгаа тусгай дугааруудыг үндсэн үйл ажиллагаанаас нь салгаж, дуудлагын нэгдсэн лавлахад нэгтгэснээрээ онцлог юм.</p>\n<figure class="wp-block-image size-large"><img class="wp-image-114239" src="https://nema.gov.mn/wp-content/uploads/2021/04/IMG-379ed1e6ec29f7b5ba79fbb328e8abfa-V-1024x682.jpg" sizes="(max-width: 1024px) 100vw, 1024px" srcset="https://nema.gov.mn/wp-content/uploads/2021/04/IMG-379ed1e6ec29f7b5ba79fbb328e8abfa-V-1024x682.jpg 1024w, https://nema.gov.mn/wp-content/uploads/2021/04/IMG-379ed1e6ec29f7b5ba79fbb328e8abfa-V-300x200.jpg 300w, https://nema.gov.mn/wp-content/uploads/2021/04/IMG-379ed1e6ec29f7b5ba79fbb328e8abfa-V-768x512.jpg 768w, https://nema.gov.mn/wp-content/uploads/2021/04/IMG-379ed1e6ec29f7b5ba79fbb328e8abfa-V.jpg 1280w" alt="" width="1024" height="682" loading="lazy" /></figure>\n<p>Ингэснээр иргэдээс ирүүлж байгаа гомдол, саналыг хүлээн авах, цахим эмчилгээ, зөвлөгөө өгөх, вакцинжуулалт, тусгаарлалт, тусгай үүргийн нислэг, халдваргүйтгэлтэй холбоотой мэдээллийг 24 цагийн турш, цаг алдалгүй шуурхай хүргэх боломж бүрдэж байна.</p>\n<figure class="wp-block-image size-large"><img class="wp-image-114241" src="https://nema.gov.mn/wp-content/uploads/2021/04/GJ1A6144-1024x682.jpg" sizes="(max-width: 1024px) 100vw, 1024px" srcset="https://nema.gov.mn/wp-content/uploads/2021/04/GJ1A6144-1024x682.jpg 1024w, https://nema.gov.mn/wp-content/uploads/2021/04/GJ1A6144-300x200.jpg 300w, https://nema.gov.mn/wp-content/uploads/2021/04/GJ1A6144-768x512.jpg 768w, https://nema.gov.mn/wp-content/uploads/2021/04/GJ1A6144.jpg 1400w" alt="" width="1024" height="682" loading="lazy" /></figure>\n<p>Мөн иргэдээс хүлээн авах дуудлага бүрийг бүртгэж, ангилан мэдээллийн санд оруулж байна. Бүртгэлийг системд оруулснаар мэдээлэл, тайланг үнэн зөв гаргах, тайлан мэдээ боловсруулалтыг автоматжуулж өгч байгаагаараа онцлог юм&nbsp;<strong><em>гэж УОК-ын Шуурхай штабаас мэдээллээ.</em></strong></p>\n<figure class="wp-block-image size-large"><img class="wp-image-114233" src="https://nema.gov.mn/wp-content/uploads/2021/04/GJ1A6138-1024x682.jpg" sizes="(max-width: 1024px) 100vw, 1024px" srcset="https://nema.gov.mn/wp-content/uploads/2021/04/GJ1A6138-1024x682.jpg 1024w, https://nema.gov.mn/wp-content/uploads/2021/04/GJ1A6138-300x200.jpg 300w, https://nema.gov.mn/wp-content/uploads/2021/04/GJ1A6138-768x512.jpg 768w, https://nema.gov.mn/wp-content/uploads/2021/04/GJ1A6138.jpg 1400w" alt="" width="1024" height="682" loading="lazy" /></figure>',
        coverImg: {
          uid: 'rc-upload-1617505245213-5',
          name: 'GJ1A6133-6zf8841i5kw76wn3br8wfn56udkud43na7cw82sds1s.jpg',
          url: 'https://cdn.e-mongolia.mn/files/articleCoverImg/cx8a0flot5t/6069369f71b8812fc428a3db.jpg',
          status: 'done'
        },
        icon: null,
        source: null,
        important: false,
        typeName: 'Ковид',
        covidTypeName: 'Мэдээ',
        createdDateText: '2021/04/04 11:46',
        key: '606936ae98d87f1ba6ad6382'
      }
    ]
  }

  return (
    <NewsWrapper>
      <List
        grid={{
          gutter: 15,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={data.list}
        renderItem={item => (
          <List.Item key={item.id}>
            <div className={styles.item}>
              <div className={styles.content}>
                <Tag color='orange' className={styles.type}>{item.covidTypeName}</Tag>
                <Paragraph ellipsis={{rows: 3, expandable: false}} className={styles.title}>{item.title}</Paragraph>
                <Paragraph ellipsis={{rows: 3, expandable: false}} className={styles.description}>{item.description}</Paragraph>
                <span className={styles.date}>{item.createdDateText}</span>
              </div>
              <div className={styles.cover}>
                <div style={{backgroundImage: `url(${item.coverImg?.url})`}} /> 
              </div>
            </div>
          </List.Item>
        )}
      />
      <br />
      <br />
    </NewsWrapper>
  )
}

export default NewsLatestList
