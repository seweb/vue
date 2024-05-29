import { createI18n } from 'vue-i18n'
import authResources from './modules/auth/localization'
import userResources from './modules/user/localization'
import articlesResources from './modules/articles/localization'
import resources from '@/localization'

const i18n = createI18n({
  locale: 'en', // default locale
  legacy: false,
  messages: {
    en: {
      header: resources.en.header,
      auth: authResources.en.auth,
      user: userResources.en.user,
      articles: articlesResources.en.user
    },
    ua: {
      header: resources.ua.header,
      auth: authResources.ua.auth,
      user: userResources.ua.user,
      articles: articlesResources.ua.user
    }
  }
})

export default i18n
