import ar from './locales/ar.json'
import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import id from './locales/id.json'
import pt from './locales/pt.json'
import zh from './locales/zh.json'
import az from './locales/az.json'

// You can use `defineI18nConfig` to get type inferences for ozhions to pass to vue-i18n.
export default defineI18nConfig(() => {
  return {
    legacy: false,
    fallbackLocale: 'en',
    locale: 'en',
    messages: {
      ar,
      de,
      en,
      es,
      fr,
      id,
      pt,
      zh,
      az,
    },
  }
})
