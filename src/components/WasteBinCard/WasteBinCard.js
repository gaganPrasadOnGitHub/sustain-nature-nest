import React, {useRef} from 'react';
import './WasteBinCard.css';
import useSelectedLanguage from '../../hooks/useSelectedLanguage';
import Loading from '../Common/Loading/Loading';
import useSelectedBin from '../../hooks/useSelectedBin';
import useRandomBinSelection from '../../hooks/useRandomBinSelection';
import BinAttributesPanel from './BinAttributesPanel/BinAttributesPanel';
import AiResult from '../AiResult/AiResult';
import compostBin from '../../assets/compostBin.png';
import wasteData from '../../data/bin.json';
import ReadMoreLink from './BinDescriptionPanel/ReadMoreLink';

const WasteBinCard = () => {
  const {selectedBin} = useSelectedBin();

  const descriptionRef = useRef(null);

  const scrollToDescription = () => {
    descriptionRef.current.scrollIntoView({behavior: 'smooth'});
  };

  const guidelineItems = [
    // {key: 'recommendedBinType', label: 'Suggested Bin'},
    {key: 'handling', label: 'Handling'},
    {key: 'separation', label: 'Separation'},
    {key: 'whatNotToDo', label: 'What not to do'},
  ];

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
      {/* Title */}
      <p className="text-heading"> {selectedBin?.name}</p>

      {/* Attributes panel graphic info */}
      <BinAttributesPanel selectedBin={selectedBin} />

      {/* what section */}
      <div id="what-section" className="row">
        {/* description */}
        <div>
          <p className="text-heading" onClick={scrollToDescription}>
            what is {selectedBin?.name}
          </p>
          <div className="detail-info">
            {/* description */}
            {selectedBin?.description}

            {/* other names */}
            <span className="text-subheading my-16">Also known as</span>
            <ul>
              {selectedBin?.otherNames?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* example list */}
        <div>
          <div className="detail-info">
            <p className="text-subheading mb-16">
              Items inside {selectedBin?.name?.toLowerCase()}
            </p>

            <ul className="items-list">
              {selectedBin?.content?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* how  section */}
      <div id="how-section" className="row">
        <div>
          <p className="text-heading">How to handle</p>
          {guidelineItems.map(({key, label}) => {
            // Check if the key exists in guideLines before rendering
            if (selectedBin.guideLines && selectedBin.guideLines[key]) {
              return (
                <div className="detail-info" key={key}>
                  <span className="text-subheading">{label}</span>
                  {selectedBin.guideLines[key]}
                </div>
              );
            }
            return null;
          })}
        </div>

        <div>
          {/* Bin Image */}
          <img
            ref={descriptionRef}
            className="recommendedBin"
            src={compostBin}
            alt="recommendedBin"
          />
          <div className="detail-info">
            <span className="text-subheading">Suggested Bin</span>
            {selectedBin?.guideLines?.recommendedBinType}
          </div>
        </div>
      </div>

      {/* why section */}
      <div id="why-section" className="row">
        <div className="card-detail">
          <p className="text-heading">Why it's important</p>
          {selectedBin?.whyItIsImportant &&
            Object?.entries(selectedBin.whyItIsImportant)?.map(
              ([key, value], index) => (
                <div key={index} className="detail-info">
                  {value}
                </div>
              )
            )}
        </div>
        <div>
          <p className="detail-info">
            <span className="text-subheading">Note</span>
            {wasteData.disclaimer}
            <ReadMoreLink />
          </p>
        </div>
      </div>

      {/* ai result */}
      <AiResult />
    </div>
  );
};

export default WasteBinCard;
