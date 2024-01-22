import i18n from 'i18next';
import Bulgarian from './bg.json';
import English from './en.json';
import Spanish from './es.json';
import Russian from './ru.json';
import French from './fr.json';
import Dutch from './nl.json';
import German from './de.json';
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
import Bengali from './bn.json';
import Kannada from './kn.json';

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
    ur: {translation: Urdu},
    vi: {translation: Vietnamese},
  },
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;
