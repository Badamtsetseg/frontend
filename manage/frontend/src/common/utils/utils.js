import moment from 'moment'
import {stringify} from 'qs'

export function getUrl(params) {
  return `${window.location.protocol}//${window.location.host}${window.location.pathname}?${stringify(params)}`
}

export function objectToCommaSeparatedString(obj) {
  Object.keys(obj).map((key) => obj[key]).join(',')
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val
}

export function getTimeDistance(type) {
  const now = new Date()
  const oneDay = 1000 * 60 * 60 * 24

  if (type === 'today') {
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    return [moment(now), moment(now.getTime() + (oneDay - 1000))]
  }

  if (type === 'week') {
    let day = now.getDay()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)

    if (day === 0) {
      day = 6
    } else {
      day -= 1
    }

    const beginTime = now.getTime() - day * oneDay

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))]
  }

  if (type === 'month') {
    const year = now.getFullYear()
    const month = now.getMonth()
    const nextDate = moment(now).add(1, 'months')
    const nextYear = nextDate.year()
    const nextMonth = nextDate.month()

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)
    ]
  }

  if (type === 'lastmonth') {
    const year = now.getFullYear()
    const month = now.getMonth()
    const nextDate = moment(now)
    const nextYear = nextDate.year()
    const nextMonth = nextDate.month()

    return [
      moment(`${year}-${fixedZero(month)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)
    ]
  }

  if (type === 'all') {
    return [moment('2019-01-01 00:00:00'), moment(now).add(1, 'days')]
  }

  const year = now.getFullYear()
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)]
}

export function checkRegistry(rule, control, callback, isVisibleLegalEntity) {
  if (control) {
    const value = control.trim().toUpperCase()
    if (value.length === 10 && !isVisibleLegalEntity) {
      const regNumLetterScope = 'ЧАБВДГЕЖЗРИЙКЛМНОПСТУФЦХЩЫЬЭЯЮШ'
      const regNumNumberScope = '24010203050406070817091011121314151618192021232226272829313025'
      let checkInt = 0
      let k
      let s1 = 0
      let j
      let s = 0
      const a = '5678987'
      if (regNumLetterScope.indexOf(value[0]) !== -1 && regNumLetterScope.indexOf(value[1]) !== -1) {
        for (let numIndex = 2; numIndex < 10; numIndex += 1) {
          if ('1234567890'.indexOf(value[numIndex]) !== -1) {
            numIndex = 10
            const day = value[6].toString() + value[7].toString()
            const dayInt = parseInt(day, 10)
            if (dayInt < 32 && dayInt > 0) {
              checkInt = 1
            } else {
              return callback('Регистр-н дугаар буруу байна!')
            }
          }
        }
        if (checkInt === 1) {
          for (let ii = 0; ii < 7; ii += 1) {
            s += parseInt(value[ii + 2].toString(), 10) * parseInt(a[ii].toString(), 10)
          }
          for (let ii = 0; ii < 2; ii += 1) {
            j = regNumLetterScope.indexOf(value[ii])
            if (ii === 0) {
              s1 =
                parseInt(regNumNumberScope.substr(j * 2, 1), 10) +
                2 * parseInt(regNumNumberScope.substr(j * 2 + 1, 1), 10)
            } else {
              s1 =
                s1 +
                3 * parseInt(regNumNumberScope.substr(j * 2, 1), 10) +
                4 * parseInt(regNumNumberScope.substr(j * 2 + 1, 1), 10)
            }
          }
          k = s1 % 11 + s % 11
          if (k === 10) {
            k = 1
          }
          if (k > 10) {
            k -= 11
          }
          if (parseInt(value[9].toString(), 10) !== k) {
            return callback('Регистр-н дугаар буруу байна!')
          }
          return callback()
        }
        return callback('Регистр-н дугаар буруу байна!')
      }
      return callback('Регистр-н дугаар буруу байна!')
    }
    if (value.length === 0) {
      return callback()
    }
    return callback('Регистр-н дугаарын орон буруу байна!')
  }
  return callback()
}
