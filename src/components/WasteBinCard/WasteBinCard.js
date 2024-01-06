import React, {useRef} from 'react';
import './WasteBinCard.css';
import useSelectedLanguage from '../../hooks/useSelectedLanguage';
import Loading from '../Loading/Loading';
import useSelectedBin from '../../hooks/useSelectedBin';
import useRandomBinSelection from '../../hooks/useRandomBinSelection';
import BinItemsCarousel from '../BinItemsCarousel/BinItemsCarousel';
import BinAttributesPanel from '../BinAttributesPanel/BinAttributesPanel';
import AiResult from '../AiResult/AiResult';
import BinDescriptionPanel from '../BinDescriptionPanel/BinDescriptionPanel';
import BinNameHeader from '../BinNameHeader/BinNameHeader';
import {useSelector} from 'react-redux';

const WasteBinCard = () => {
  const {selectedBin, handleUpdateSelectedBin} = useSelectedBin();
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const descriptionRef = useRef(null);

  const scrollToDescription = () => {
    descriptionRef.current.scrollIntoView({behavior: 'smooth'});
  };

  useSelectedLanguage();
  useRandomBinSelection();

  if (!selectedBin) {
    return (
      <div className="loading-container flex-default">
        <Loading />
      </div>
    );
  }

  return (
    <div className="wasteBinCard">
      {/* Bin Name */}
      <BinNameHeader
        selectedBin={selectedBin}
        onParentClick={(parentBinId) => handleUpdateSelectedBin(parentBinId)}
        onTitleClick={scrollToDescription}
      />

      {/* Slider */}
      <BinItemsCarousel selectedBin={selectedBin} searchTerm={searchTerm} />

      {/* display graphic info */}
      <BinAttributesPanel selectedBin={selectedBin} />

      {/* ai result */}
      <AiResult />

      {/* Description */}
      <BinDescriptionPanel
        selectedBin={selectedBin}
        descriptionRef={descriptionRef}
      />
    </div>
  );
};

export default WasteBinCard;
