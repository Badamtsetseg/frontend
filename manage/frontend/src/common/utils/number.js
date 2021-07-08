import numeral from 'numeral'

export function formatMoney(value) {
  if (value) {
    return numeral(value).format('0,0')
  } else {
    return '-'
  }
}

export function formatMoneyWithDecimal(value) {
  if (value) {
    return numeral(value).format('0,0.00')
  } else {
    return '-'
  }
}

export function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
