import React, {useRef} from 'react';
import './WasteBinCard.css';
import useSelectedLanguage from '../../hooks/useSelectedLanguage';
import useSelectedBin from '../../hooks/useSelectedBin';
import useRandomBinSelection from '../../hooks/useRandomBinSelection';
import BinAttributesPanel from './BinAttributesPanel/BinAttributesPanel';
import AiResult from '../AiResult/AiResult';
import {useTranslation} from 'react-i18next';
import BinDescriptionPanel from './BinDescriptionPanel/BinDescriptionPanel';

const WasteBinCard = () => {
  const {selectedBin, selectedBinId} = useSelectedBin();
  const {t} = useTranslation();
  useSelectedLanguage();

  const descriptionRef = useRef(null);

  const scrollToDescription = () => {
    if (descriptionRef.current) {
      const topPosition =
        descriptionRef.current.getBoundingClientRect().top +
        window.scrollY -
        300;
      window.scrollTo({top: topPosition, behavior: 'smooth'});
    }
  };

  useRandomBinSelection();

  if (!selectedBin) {
    return (
      <div className="loading-container flex-default">
        <p className="searching"></p>
      </div>
    );
  }

  return (
    <div className="wasteBinCard">
      {/* Title */}
      <p className="text-heading text-link" onClick={scrollToDescription}>
        {' '}
        {t(`wasteBins.${selectedBinId}.name`)}
      </p>

      {/* ai result */}
      <AiResult />

      {/* Attributes panel graphic info */}
      <BinAttributesPanel
        selectedBin={selectedBin}
        scrollToDescription={scrollToDescription}
      />

      {/* description panel text info */}
      <BinDescriptionPanel
        selectedBin={selectedBin}
        selectedBinId={selectedBinId}
        descriptionRef={descriptionRef}
      />
    </div>
  );
};

export default WasteBinCard;
