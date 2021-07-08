export default function checkRegistry(valueInit, entity) {
  if (valueInit) {
    const value = valueInit.trim().toUpperCase()
    if (value.length === 10 && (entity === undefined || entity === 'CITIZEN')) {
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
              return Promise.reject(new Error('Регистрийн дугаар буруу байна!'))
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
              s1 = parseInt(regNumNumberScope.substr(j * 2, 1), 10) +
                2 * parseInt(regNumNumberScope.substr(j * 2 + 1, 1), 10)
            } else {
              s1 = s1 + 3 * parseInt(regNumNumberScope.substr(j * 2, 1), 10) +
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
            return Promise.reject(new Error('Регистрийн дугаар буруу байна!'))
          }
          return Promise.resolve()
        }
        return Promise.reject(new Error('Регистрийн дугаар буруу байна!'))

      }
      return Promise.reject(new Error('Регистрийн дугаар буруу байна!'))

    }
    if (value.length === 7 && (entity === undefined || entity === 'LEGAL')) { // baiguullgagiin registry
      let check = false
      for (let numIndex = 0; numIndex < 7; numIndex += 1) {
        if ('1234567890'.indexOf(value[numIndex]) !== -1) {
          check = true
        } else {
          return Promise.reject(new Error('Регистрийн дугаар буруу байна!'))
        }
      }
      return check ? Promise.resolve() : Promise.reject(new Error('Регистрийн дугаар буруу байна!'))
    }
    if (value.length === 0) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('Регистрийн дугаарын орон буруу байна!'))
  }
  return Promise.resolve()
};
