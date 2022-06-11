import en from './locales/en/translation.json'
import zh from './locales/zh/translation.json'

export const LANG = {
  EN: 'en',
  ZH: 'zh',
}

export const LANG_MAP = {
  [LANG.EN]: 'English',
  [LANG.ZH]: '中文',
}

const resources = {
  [LANG.EN]: {
    translation: en,
  },
  [LANG.ZH]: {
    translation: zh,
  },
}

export default resources
