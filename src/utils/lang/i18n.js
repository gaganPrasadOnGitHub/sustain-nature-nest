import i18n from 'i18next';
import English from './en.json';
import Spanish from './es.json';
import Russian from './ru.json';
import French from './fr.json';
import Dutch from './de.json';
import Japanese from './ja.json';
import Turkish from './tr.json';
import Chinese from './zh.json';
import Italian from './it.json';
import Portuguese from './pt.json';
import Vietnamese from './vi.json';
import Arabic from './ar.json';
import Korean from './ko.json';
import Indonesian from './id.json';
import Hindi from './hi.json';
import Urdu from './ur.json';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: English},
    es: {translation: Spanish},
    ru: {translation: Russian},
    fr: {translation: French},
    de: {translation: Dutch},
    ja: {translation: Japanese},
    tr: {translation: Turkish},
    zh: {translation: Chinese},
    it: {translation: Italian},
    pt: {translation: Portuguese},
    vi: {translation: Vietnamese},
    ar: {translation: Arabic},
    ko: {translation: Korean},
    id: {translation: Indonesian},
    hi: {translation: Hindi},
    ur: {translation: Urdu},
  },
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;
