import numeral from 'numeral'

export function extractParams(text) {
  const regex = /{([^}]+)}/g
  const params = []

  let curMatch
  while ((curMatch = regex.exec(text))) {
    params.push(curMatch[1])
  }
  return params
}

function getValueFromMap(valueMap, key) {
  if (valueMap && valueMap.hasOwnProperty(key)) {
    return valueMap[key]
  } else {
    return null
  }
}

function getTextValueFromMap(valueMap, key) {
  let _value = getValueFromMap(valueMap, key)
  if (_value === null || _value === 'null') {
    _value = '-'
  }
  return _value
}

export function replaceParams(text, valueMap) {
  let style = null
  let resultText = ''

  if (text.includes('===>')) {
    const textArray = text.split('===>')
    resultText = '' + textArray[0]
    style = '' + textArray[1]
  } else {
    resultText = '' + text
  }

  const params = extractParams(text)
  for (let param of params) {
    if (param.indexOf('.') > 0) {
      const subParams = param.split('.')

      let _value = valueMap
      for (let i = 0; i < subParams.length; i++) {
        if (_value != null) {
          _value = getValueFromMap(_value, subParams[i])
        }

        // console.log(subParams[i] + ' ->' + _value)
        if (i + 1 === subParams.length) {
          resultText = resultText.replace(new RegExp('{' + param + '}', 'gi'), `${_value === null ? '-' : _value}`)
        }
      }
    } else {
      const _value = valueMap ? getTextValueFromMap(valueMap, param) : null
      resultText = resultText.replace(new RegExp('{' + param + '}', 'gi'), _value)
    }
  }

  switch (style) {
    case 'capitalize':
      return resultText.charAt(0).toUpperCase() + resultText.slice(1)
    case 'uppercase':
      return resultText.toUpperCase()
    case 'money':
      return numeral(resultText).format('0,0.00')
    default:
      return resultText
  }
}

export function replaceParamsTable(text, valueMap) {
  let style = null
  let resultText = ''

  if (text.includes('===>')) {
    const textArray = text.split('===>')
    resultText = '' + textArray[0]
    style = '' + textArray[1]
  } else {
    resultText = '' + text
  }

  const params = extractParams(text)
  for (let param of params) {
    if (param.indexOf('.') > 0) {
      const subParams = param.split('.')

      let _value = valueMap
      for (let i = 0; i < subParams.length; i++) {
        if (_value != null) {
          _value = getValueFromMap(_value, subParams[i])
        }

        // console.log(subParams[i] + ' ->' + _value)
        if (i + 1 === subParams.length) {
          resultText = resultText.replace(
            new RegExp('{' + param + '}', 'gi'),
            `${_value === null ? '-' : _value}`
          )
        }
      }
    } else {
      const _value = valueMap ? getTextValueFromMap(valueMap, param) : null
      resultText = resultText.replace(
        new RegExp('{' + param + '}', 'gi'),
        `${_value === null ? '-' : _value}`
      )
    }
  }

  switch (style) {
    case 'capitalize':
      return resultText.charAt(0).toUpperCase() + resultText.slice(1)
    case 'uppercase':
      return resultText.toUpperCase()
    case 'money':
      return numeral(resultText).format('0,0.00')
    default:
      return resultText
  }
}
