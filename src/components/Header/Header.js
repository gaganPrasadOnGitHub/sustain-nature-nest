import './Header.css';
import React from 'react';
import NavMenu from './NavMenu/NavMenu';
import {useTranslation} from 'react-i18next';
import NightMode from './NightMode/NightMode';
import useDynamicFontSize from '../../hooks/useDynamicFontSize';
import useSelectedLanguage from '../../hooks/useSelectedLanguage';
import LanguageSelector from './LanguageSelector/LanguageSelector';

const Header = () => {
  useSelectedLanguage();
  const {t} = useTranslation();
  const fontSize = useDynamicFontSize();

  return (
    <div className="header">
      <div className="flex-space-between">
        <NavMenu />
        <div className="flex-default">
          <NightMode />
          <LanguageSelector />
        </div>
      </div>

      <div className="text-center">
        <h1 className={`scroll-title ${fontSize}`}>
          {t('common.knowYourWaste')}
        </h1>
        <p className="text-title">{t('common.sustainNatureNest')}</p>
      </div>
    </div>
  );
};

export default Header;
