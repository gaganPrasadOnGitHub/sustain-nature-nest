import React, {useRef} from 'react';
import './LanguageSelector.css';
import languageDay from '../../../assets/langDay.svg';
import languageNight from '../../../assets/langNight.svg';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  setFocusScroll,
  setIsLanguageMenuVisible,
  setLanguage,
} from '../../../utils/redux/appSlice';
import useNightMode from '../../../hooks/useNightMode';
import useOutsideOrScrollHide from '../../../hooks/useOutsideOrScrollHide';

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const {isNight} = useNightMode();
  const {i18n} = useTranslation();
  const selectedLanguage = useSelector((state) => state.appData.language);
  const isLanguageMenuVisible = useSelector(
    (state) => state.appData.isLanguageMenuVisible
  );
  const languageOptionsRef = useRef(null);

  const languages = [
    {code: 'ar', name: 'العربية'}, // Arabic
    {code: 'bn', name: 'বাংলা'}, // Bengali
    {code: 'bg', name: 'български'}, // bulgarian
    {code: 'zh', name: '中文'}, // chinies
    {code: 'nl', name: 'Nederlands'}, // german
    {code: 'en', name: 'English'}, // english
    {code: 'fr', name: 'Français'}, // french
    {code: 'de', name: 'Deutsch'}, // dutch
    {code: 'hi', name: 'हिन्दी'}, // hindi
    {code: 'id', name: 'Bahasa Indonesia'}, // Indonesia
    {code: 'it', name: 'Italiano'}, // italian
    {code: 'ja', name: '日本語'}, // Japanese
    {code: 'kn', name: 'ಕನ್ನಡ'}, // Kannada
    {code: 'ko', name: '한국어'}, // Korian
    {code: 'pt', name: 'Português'}, // Portugues
    {code: 'ru', name: 'Русский'}, // Russian
    {code: 'es', name: 'Español'}, // Spanish
    {code: 'tr', name: 'Türkçe'}, // Turkish
    {code: 'ur', name: 'اردو'}, // urdu
    {code: 'vi', name: 'Tiếng Việt'}, // vietnamies
  ];

  const handleLanguageChange = (newLanguage) => {
    dispatch(setLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);
    dispatch(setIsLanguageMenuVisible(false));
    dispatch(setFocusScroll(false));
    console.log('newLanguage', newLanguage);
  };

  const toggleOptionsVisibility = () => {
    dispatch(setIsLanguageMenuVisible(!isLanguageMenuVisible));
    dispatch(setFocusScroll(!isLanguageMenuVisible));
  };

  useOutsideOrScrollHide(languageOptionsRef, () => {
    if (isLanguageMenuVisible) {
      dispatch(setIsLanguageMenuVisible(false));
      dispatch(setFocusScroll(false));
    }
  });

  return (
    <>
      <img
        ref={languageOptionsRef}
        className="nav-icon"
        src={isNight ? languageNight : languageDay}
        alt="Select language"
        onClick={toggleOptionsVisibility}
      />
      {isLanguageMenuVisible && (
        <div className="language_options popup">
          {languages.map((item) => (
            <div
              key={item.code}
              onClick={() => handleLanguageChange(item.code)}
              className={`menu-item language-item ${
                selectedLanguage === item.code ? 'active' : ''
              }`}
              aria-label={`Change language to ${item.name}`}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default LanguageSelector;
