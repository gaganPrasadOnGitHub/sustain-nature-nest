import React from 'react';
import './Header.css';
import NavMenu from './NavMenu/NavMenu';
import {useTranslation} from 'react-i18next';
import useSelectedLanguage from '../../hooks/useSelectedLanguage';
import useDynamicFontSize from '../../hooks/useDynamicFontSize';
import NightMode from './NightMode/NightMode';
import LanguageSelector from './LanguageSelector/LanguageSelector';

const Header = () => {
  const {t} = useTranslation();
  useSelectedLanguage();
  const fontSize = useDynamicFontSize(); // Use the custom hook

  return (
    <div className="header">
      <div className="flex-space-between">
        <NavMenu />
        <div>
          <NightMode />
          <LanguageSelector />
        </div>
      </div>
      <div className="text-center">
        <h1 className={`scroll-title ${fontSize}`}>Know your waste</h1>
        <p className="text-title">{t('common.sustainNatureNest')}</p>
      </div>
    </div>
  );
};

export default Header;
