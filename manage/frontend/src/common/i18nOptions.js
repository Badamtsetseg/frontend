// import en from '../common/locales/en.json'
// import mn from '../common/locales/mn.json'
import {getContextPath} from '../config/context-path'

const i18nOptions = {
  // debug: false,
  load: 'languageOnly', // 2 character locale (en, mn) instead of 5 (en-US)
  lng: 'mn',
  fallbackLng: 'mn',
  ns: ['translations'],
  defaultNS: 'translations',
  caches: ['localStorage'],
  order: ['localStorage'],
  backend: {
    loadPath: `${getContextPath()}/locales/{{lng}}/{{ns}}.json`,
  }
}

export const i18nOptionsServer = {
  debug: false,
  fallbackLng: 'mn',
  detection: Object.assign(i18nOptions, {
    preload: ['mn', 'en'],
  }),
  // resources: {
  //   en: en,
  //   mn: mn
  // }
}

export const i18nOptionsClient = Object.assign(i18nOptions, {
  wait: process && !process.release
})
