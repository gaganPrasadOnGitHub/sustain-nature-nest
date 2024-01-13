import React from 'react';
import {useTranslation} from 'react-i18next';
import useSelectedLanguage from '../../../hooks/useSelectedLanguage';
import useSelectedBin from '../../../hooks/useSelectedBin';

const ReadMoreLink = () => {
  const {t} = useTranslation();
  useSelectedLanguage();
  const {selectedBinId} = useSelectedBin();

  const translatedLocal = t('common.local');
  const translatedBinName = t(`wasteBins.${selectedBinId}.name`);
  const translatedManagementStation = t('common.managementStation');

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    translatedLocal
  )}+${encodeURIComponent(translatedBinName)}+${encodeURIComponent(
    translatedManagementStation
  )}`;

  return (
    <span className="readMore">
      <a href={googleSearchUrl} target="_blank" rel="noopener noreferrer">
        {' '}
        {t('common.readMore')}
      </a>
    </span>
  );
};

export default ReadMoreLink;
