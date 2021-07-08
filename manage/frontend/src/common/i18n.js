import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import XHR from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import {i18nOptionsClient} from './i18nOptions'

// for browser use xhr backend to load translations and browser lng detector
if (process && !process.release) {
  i18n
    .use(XHR)
    .use(initReactI18next)
    .use(LanguageDetector)
}

// initialize if not already initialized
if (!i18n.isInitialized) {
  i18n.init(i18nOptionsClient)
}

export default i18n
