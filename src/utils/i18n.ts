import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'
import { translationPT, translationEN } from '../locales'

export type Language = 'en' | 'pt' | string

/**
 * Initialize the i18n library on the project.
 * Without this, useTranslation hook won't work.
 * @param language - the initial language ('en' for english, 'pt' for portuguese
 * and 'es' for spanish). Default: 'pt'
 */

const localLanguage = localStorage.getItem('i18nextLng') || 'pt'

const startI18n = (language: Language = localLanguage): void => {
  const resources = {
    pt: {
      translation: translationPT
    },
    en: {
      translation: translationEN
    }
  }

  i18n
    .use(detector)
    .use(initReactI18next)
    .init({
      resources,
      lng: language,
      fallbackLng: language,
      returnObjects: true,
      interpolation: {
        escapeValue: false
      }
    })
}

export default startI18n
