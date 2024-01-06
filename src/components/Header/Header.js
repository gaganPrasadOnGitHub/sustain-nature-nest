import React from 'react';
import './Header.css';
import NavMenu from '../NavMenu/NavMenu';
import NightMode from '../NightMode/NightMode';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import {useTranslation} from 'react-i18next';
import useSelectedLanguage from '../../hooks/useSelectedLanguage';

const Header = () => {
  const {t} = useTranslation();
  useSelectedLanguage();

  return (
    <div className="header">
      <div className="flex-space-between">
        {/*  TODO: FIX NavMenu component UI */}
        <NavMenu />
        <div className="flex-space-between">
          <NightMode />
          <LanguageSelector />
        </div>
      </div>
      <div className="text-title text-center">{t('common.natureNest')}</div>
    </div>
  );
};

export default Header;
