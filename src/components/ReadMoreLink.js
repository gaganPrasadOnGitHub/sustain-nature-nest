import React from 'react';
import {useTranslation} from 'react-i18next';
import useSelectedLanguage from '../hooks/useSelectedLanguage';
import useSelectedBin from '../hooks/useSelectedBin';

const ReadMoreLink = () => {
  const {t} = useTranslation();
  useSelectedLanguage();
  const {selectedBinId} = useSelectedBin();

  const translatedBinName = t(`wasteBins.${selectedBinId}.name`);
  const translatedManagementSolutions = t('common.managementSolutions');

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    translatedBinName
  )}+${encodeURIComponent(translatedManagementSolutions)}`;

  return (
    <p className="text-link text-right mr-16">
      <a href={googleSearchUrl} target="_blank" rel="noopener noreferrer">
        {t('common.readMore')}
      </a>
    </p>
  );
};

export default ReadMoreLink;
