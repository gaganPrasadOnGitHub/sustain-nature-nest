import React from 'react';
import {useTranslation} from 'react-i18next';
import useSelectedLanguage from '../../hooks/useSelectedLanguage';
import ReadMoreLink from '../WasteBinCard/BinDescriptionPanel/ReadMoreLink';
import useSelectedBin from '../../hooks/useSelectedBin';
import ScrollAnimation from './ScrollAnimation/Scrollanimation';

const Note = () => {
  const {t} = useTranslation();
  const {selectedBinId} = useSelectedBin();
  useSelectedLanguage();
  const disclaimer = t('common.disclaimer', {
    value: t(`wasteBins.${selectedBinId}.name`).toLowerCase(),
  });
  return (
    <div>
      <ScrollAnimation>
        <p className="detail-info">
          <span className="text-subheading">{t('common.note')}</span>
          {disclaimer} <ReadMoreLink />
        </p>
      </ScrollAnimation>
    </div>
  );
};

export default Note;
