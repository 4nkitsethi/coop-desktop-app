import { createI18n } from 'vue-i18n'
import en from "./locale/en.json"
import ka from "./locale/ka.json"
import Store from "../store"


const i18n = createI18n({
    locale: Store.state.coop_local_base.apps.locale, // set current locale
    messages: {
      en: en,
      ka: ka
    }
})


export default i18n