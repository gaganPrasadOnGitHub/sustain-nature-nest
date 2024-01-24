import i18n from 'i18next';
import Arabic from './ar.json';
import Bengali from './bn.json';
import Bulgarian from './bg.json';
import Chinese from './zh.json';
import Dutch from './nl.json';
import English from './en.json';
import French from './fr.json';
import German from './de.json';
import Hindi from './hi.json';
import Indonesian from './id.json';
import Italian from './it.json';
import Japanese from './ja.json';
import Kannada from './kn.json';
import Korean from './ko.json';
import Portuguese from './pt.json';
import Russian from './ru.json';
import Spanish from './es.json';
import Turkish from './tr.json';
import Ukrainian from './uk.json';
import Vietnamese from './vi.json';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    ar: {translation: Arabic},
    bn: {translation: Bengali},
    bg: {translation: Bulgarian},
    zh: {translation: Chinese},
    nl: {translation: Dutch},
    en: {translation: English},
    fr: {translation: French},
    de: {translation: German},
    hi: {translation: Hindi},
    id: {translation: Indonesian},
    it: {translation: Italian},
    ja: {translation: Japanese},
    kn: {translation: Kannada},
    ko: {translation: Korean},
    pt: {translation: Portuguese},
    ru: {translation: Russian},
    es: {translation: Spanish},
    tr: {translation: Turkish},
    uk: {translation: Ukrainian},
    vi: {translation: Vietnamese},
  },
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;
