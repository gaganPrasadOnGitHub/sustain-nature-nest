import React from 'react';
import {useTranslation} from 'react-i18next';
import useSelectedLanguage from '../../../hooks/useSelectedLanguage';
import useSelectedBin from '../../../hooks/useSelectedBin';

const ReadMoreLink = () => {
  const {t} = useTranslation();
  useSelectedLanguage();
  const {selectedBinId} = useSelectedBin();
  const readMoreSearch = t('common.readMoreSearch', {
    value: t(`wasteBins.${selectedBinId}.name`).toLowerCase(),
  });

  const googleSearchUrl = `https://www.google.com/search?q=+${encodeURIComponent(
    readMoreSearch
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
