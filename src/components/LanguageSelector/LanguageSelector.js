import React, {useRef, useState} from 'react';
import './LanguageSelector.css';
import languageDay from '../../assets/langDay.svg';
import languageNight from '../../assets/langNight.svg';
import {useDispatch, useSelector} from 'react-redux';
import useClickOutside from '../../hooks/useClickOutside';
import {useTranslation} from 'react-i18next';
import {setLanguage} from '../../utils/redux/appSlice';
import useNightMode from '../../hooks/useNightMode';

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const {isNight} = useNightMode();
  const {i18n} = useTranslation();
  const selectedLanguage = useSelector((state) => state.appData.language);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const languageOptionsRef = useRef(null);

  const languages = [
    {code: 'en', name: 'English'},
    {code: 'es', name: 'Español'},
    {code: 'ru', name: 'Русский'},
    {code: 'fr', name: 'Français'},
    {code: 'de', name: 'Deutsch'},
    {code: 'ja', name: '日本語'},
    {code: 'tr', name: 'Türkçe'},
    {code: 'zh', name: '中文'},
    {code: 'it', name: 'Italiano'},
    {code: 'pt', name: 'Português'},
    {code: 'vi', name: 'Tiếng Việt'},
    {code: 'ar', name: 'العربية'},
    {code: 'ko', name: '한국어'},
    {code: 'id', name: 'Bahasa Indonesia'},
    {code: 'hi', name: 'हिन्दी'},
    {code: 'ur', name: 'اردو'},
  ];

  const handleLanguageChange = (newLanguage) => {
    dispatch(setLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);
    setIsOptionsVisible(false);
  };

  const toggleOptionsVisibility = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  useClickOutside(languageOptionsRef, () => {
    setIsOptionsVisible(false);
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
      {isOptionsVisible && (
        <div className="language_options">
          {languages.map((item) => (
            <button
              key={item.code}
              onClick={() => handleLanguageChange(item.code)}
              className={`nav-item language-item ${
                selectedLanguage === item.code ? 'active' : ''
              }`}
              aria-label={`Change language to ${item.name}`}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default LanguageSelector;
