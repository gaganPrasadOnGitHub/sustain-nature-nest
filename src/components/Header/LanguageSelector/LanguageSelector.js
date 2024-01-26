import React, {useRef} from 'react';
import './LanguageSelector.css';
import languageDay from '../../../assets/langDay.svg';
import languageNight from '../../../assets/langNight.svg';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
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
    {code: 'bg', name: 'български'}, // Bulgarian
    {code: 'zh', name: '中文'}, // Chinese
    {code: 'nl', name: 'Dutch'}, // Dutch
    {code: 'en', name: 'English'}, // English
    {code: 'fr', name: 'Français'}, // French
    {code: 'de', name: 'German'}, // German
    {code: 'hi', name: 'हिन्दी'}, // Hindi
    {code: 'id', name: 'Bahasa Indonesia'}, // Indonesia
    {code: 'it', name: 'Italiano'}, // Italian
    {code: 'ja', name: '日本語'}, // Japanese
    {code: 'kn', name: 'ಕನ್ನಡ'}, // Kannada
    {code: 'ko', name: '한국어'}, // Korean
    {code: 'pt', name: 'Português'}, // Portuguese
    {code: 'ro', name: 'Română'}, // Romanian
    {code: 'ru', name: 'Русский'}, // Russian
    {code: 'es', name: 'Español'}, // Spanish
    {code: 'tr', name: 'Türkçe'}, // Turkish
    {code: 'uk', name: 'Українська'}, // Ukrainian
    {code: 'vi', name: 'Tiếng Việt'}, // Vietnamese
  ];

  useOutsideOrScrollHide(languageOptionsRef, () => {
    if (isLanguageMenuVisible) {
      dispatch(setIsLanguageMenuVisible(false));
    }
  });

  const handleLanguageChange = (newLanguage) => {
    dispatch(setLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);
    dispatch(setIsLanguageMenuVisible(false));
  };

  const toggleOptionsVisibility = (event) => {
    event.stopPropagation();
    dispatch(setIsLanguageMenuVisible(!isLanguageMenuVisible));
  };

  return (
    <div className="flex-default" ref={languageOptionsRef}>
      <img
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
    </div>
  );
};

export default LanguageSelector;
