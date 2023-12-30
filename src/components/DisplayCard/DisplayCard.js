import React, {useEffect} from 'react';
import './DisplayCard.css';
import bin from '../../assets/dry.png';
import aiIcon from '../../assets/ai.svg';
import burnableIcon from '../../assets/burnable.svg';
import nonBurnableIcon from '../../assets/nonBurnable.svg';
import compostableIcon from '../../assets/compostable.svg';
import recyclableIcon from '../../assets/recyclable.svg';
import nonRecyclableIcon from '../../assets/nonRecyclable.svg';
import cautionIcon from '../../assets/caution.svg';
import toxicIcon from '../../assets/toxic.svg';
import radioActiveBin from '../../assets/radioActiveBin.png';
import flammableIcon from '../../assets/flammable.svg';
import radioactiveIcon from '../../assets/radioactive.svg';
import bioHazardousIcon from '../../assets/bioHazardous.svg';
import protectiveGearIcon from '../../assets/useProtectiveGear.png';
import washHandIcon from '../../assets/washHand.svg';
import sanitizeIcon from '../../assets/sanitize.svg';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import useSelectedLanguage from '../../hooks/useSelectedLanguage';
import useSlider from '../../hooks/useSlider';
import Loading from '../Loading/Loading';
import {setSelectedBin} from '../../utils/redux/binSlice';
import useSelectedBin from '../../hooks/useSelectedBin';
import wasteData from '../../data/bin.json';
import useRandomBinSelection from '../../hooks/useRandomBinSelection';
import Slider from '../Slider/Slider';

const DisplayCard = () => {
  const {t} = useTranslation();
  useSelectedLanguage();

  const dispatch = useDispatch();
  const {selectedBinId} = useSelectedBin();
  // const sliderRef = useSlider();
  const selectedBin = useSelector((state) => state.bin.selectedBin);
  const searchResult = useSelector((state) => state.search.searchResult);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  useRandomBinSelection();

  useEffect(() => {
    const currentBin = wasteData?.wasteBins.find(
      (item) => item?.id === selectedBinId
    );
    dispatch(setSelectedBin(currentBin));
  }, [dispatch, selectedBin, selectedBinId]);

  console.log('selectedBin', selectedBin);
  console.log('selectedBinId', selectedBinId);

  if (!selectedBin) {
    <div className="loading-container">
      <Loading />
    </div>;
  }

  return (
    <div className="display-card">
      {/* Slider */}
      <Slider items={selectedBin?.content || []} searchTerm={searchTerm} />
      {/* <div className="slider" ref={sliderRef}>
        {searchTerm && <div className="slider-item">{searchTerm}</div>}
        {selectedBin?.content?.map((item, index) => (
          <div key={index} className="slider-item">
            {item}
          </div>
        ))}
      </div> */}

      {/* Bin Name */}
      <p className="text-title text-center my-16">
        {selectedBin?.parentBinName
          ? t(`wasteBins.${selectedBin?.id}.parentBinName`) + ' - '
          : ''}
        {t(`wasteBins.${selectedBin?.id}.name`)}
      </p>

      {/* display graphic info */}
      <div className="graphic-info">
        {/* waste image */}
        <img
          className="bin-image"
          src={selectedBin?.imageUrl || bin}
          alt="bin"
        />
        {/* badges */}
        {/* warning */}
        {selectedBin?.toxic && (
          <div id="toxic" className="card-badge">
            <img className="badge-icon" src={toxicIcon} alt="toxic" />
            <small>Toxic</small>
          </div>
        )}
        {selectedBin?.flammable && (
          <div id="flammable" className="card-badge">
            <img className="badge-icon" src={flammableIcon} alt="flammable" />
            <small>Flammable</small>
          </div>
        )}
        {selectedBin?.radioactive && !selectedBin?.bioHazardous && (
          <div id="radioactive" className="card-badge">
            <img
              className="badge-icon"
              src={radioactiveIcon}
              alt="radioactive"
            />
            <small>Radioactive</small>
          </div>
        )}
        {(selectedBin?.bioHazardous || selectedBin?.radioactive) && (
          <div id="special-handling" className="card-badge">
            <img
              className="badge-icon"
              src={
                selectedBin?.bioHazardous ? bioHazardousIcon : radioactiveIcon
              }
              alt="bioHazardous"
            />
            <small>
              {selectedBin?.bioHazardous ? 'Bio Hazardous' : 'Radioactive'}
            </small>
          </div>
        )}
        {selectedBin?.caution && (
          <div id="caution" className="card-badge">
            <img className="badge-icon" src={cautionIcon} alt="caution" />
            <small>Handel with care</small>
          </div>
        )}

        {/* safety */}
        {selectedBin?.protectiveGearNeeded && (
          <div id="safetyGear" className="card-badge">
            <img
              className="badge-icon"
              src={protectiveGearIcon}
              alt="protectiveGearNeeded"
            />
            <small>Use safety gear</small>
          </div>
        )}
        {selectedBin?.washHandRequired && (
          <div id="washHand" className="card-badge">
            <img
              className="badge-icon"
              src={washHandIcon}
              alt="washHandRequired"
            />
            <small>Wash hands</small>
          </div>
        )}
        {selectedBin?.disinfectionRequired && (
          <div id="sanitize" className="card-badge">
            <img
              className="badge-icon"
              src={sanitizeIcon}
              alt="disinfectionRequired"
            />
            <small>Sanitize </small>
          </div>
        )}
        {/* solution */}

        <div id="recyclable" className="card-badge">
          <img
            className="badge-icon"
            src={
              selectedBin?.compostable
                ? compostableIcon
                : selectedBin?.recyclable
                  ? recyclableIcon
                  : nonRecyclableIcon
            }
            alt="Recyclability"
          />
          <small>
            {selectedBin?.compostable
              ? 'Compostable'
              : selectedBin?.recyclable
                ? 'Recyclable'
                : 'Non recyclable'}
          </small>
        </div>
        <div id="burnable" className="card-badge">
          <img
            className="badge-icon"
            src={selectedBin?.burnable ? burnableIcon : nonBurnableIcon}
            alt="Burnability"
          />
          <small>
            {selectedBin?.burnable ? 'Controlled Burnable' : 'Non Burnable'}
          </small>
        </div>
      </div>

      {/* ai result */}
      {searchResult?.reason && (
        <>
          <div className="ai-result">
            <img src={aiIcon} alt="ai" />
            <p>{searchResult.reason}</p>
            {/* solution */}
          </div>
        </>
      )}

      {/* Guideline */}
      <div className="guidelines">
        <p className="text-heading">guidelines</p>
        <div className="flex-default">
          <div className="group">
            <img
              className="recommendedBin"
              src={radioActiveBin}
              alt="recommendedBin"
            />
          </div>
          <div className="group">
            <p className="detail-info">
              <span className="text-subheading">Bin type:</span>{' '}
              {selectedBin?.guideLines?.recommendedBinType}
            </p>
            <p className="detail-info">
              <span className="text-subheading">Handling: </span>
              {selectedBin?.guideLines?.handling}
            </p>
            <p className="detail-info">
              <span className="text-subheading">Separation: </span>
              {selectedBin?.guideLines?.separation}
            </p>
          </div>
        </div>
      </div>

      {/* description */}
      <div className="card-details-importance">
        <div className="card-detail">
          <p className="text-heading">
            What is {selectedBin?.name?.toLowerCase()}
          </p>
          <div className="detail-info">{selectedBin?.description}</div>
        </div>
      </div>
      <div className="card-detail">
        <p className="text-heading">How to Handle</p>

        {selectedBin?.howToHandle &&
          Object.entries(selectedBin.howToHandle).map(([key, value], index) => (
            <div className="detail-info" key={index}>
              {value}
            </div>
          ))}
      </div>
      <div className="card-detail">
        <p className="text-heading">Why it's important</p>
        {selectedBin?.whyItIsImportant &&
          Object.entries(selectedBin.whyItIsImportant).map(
            ([key, value], index) => (
              <div className="detail-info" key={index}>
                {value}
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default DisplayCard;
