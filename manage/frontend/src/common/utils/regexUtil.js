/*
 pattern:
 - L үсэг
 - 0 тоо
 */
export function getRegex(pattern) {
  let regex = '^'
  for(let i = 0; i < pattern.length; i++) {
    switch(pattern.charAt(i)) {
      case 'L': // letter
        regex += '[а-яA-Я]'
        break
      case '#': // multiple digits
        regex += '[0-9]+'
        break
      case '0': // single digit
        regex += '[0-9]'
        break
      case '.': // dot
        regex += '\.'
        break
    }
  }
  return new RegExp(regex)
}
