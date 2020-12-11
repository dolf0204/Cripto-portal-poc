import VueI18n from "vue-i18n";
import { Vue } from "@/biss-core-wrapper";
import i18nEn from "@/i18n/en.json";
import i18nDe from "@/i18n/de.json";
import i18nPl from "@/i18n/pl.json";
import i18nFr from "@/i18n/fr.json";

const { VUE_APP_I18N_LOCALE } = process.env;

const messages = {
    en: i18nEn,
    de: i18nDe,
    pl: i18nPl,
    fr: i18nFr,
};

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: VUE_APP_I18N_LOCALE,
    fallbackLocale: VUE_APP_I18N_LOCALE,
    messages,
});

export default i18n;
export {
    messages,
};
