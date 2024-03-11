import React, {useEffect, useState} from 'react';
import ReadMoreLink from './ReadMoreLink';
import {useTranslation} from 'react-i18next';
import useSelectedLanguage from '../../../hooks/useSelectedLanguage';
import ScrollAnimation from '../../Common/ScrollAnimation/Scrollanimation';
import {validateImageUrl} from '../../../utils/helpers/validateImageUrl';
import useNightMode from '../../../hooks/useNightMode';
import imageSearchDay from '../../../assets/imageSearchDay.svg';
import imageSearchNight from '../../../assets/imageSearchNight.svg';
import useIsMobileView from '../../../hooks/useIsMobileView';
import ToggleArrow from '../../Common/ToggleArrow';
import Note from '../../Common/Note';

const BinDescriptionPanel = ({selectedBin, selectedBinId, descriptionRef}) => {
  const {t} = useTranslation();
  useSelectedLanguage();
  const {isNight} = useNightMode();
  const isMobileView = useIsMobileView();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [visibility, setVisibility] = useState({
    showImportance: true,
    showDescription: true,
    showHandel: true,
  });

  const guidelineItems = [
    {key: 'handling', label: t('common.handling')},
    {key: 'separation', label: t('common.separation')},
    {key: 'whatNotToDo', label: t('common.whatNotToDo')},
  ];

  const disclaimer = t('common.disclaimer', {
    value: t(`wasteBins.${selectedBinId}.name`).toLowerCase(),
  });

  useEffect(() => {
    setVisibility({
      showImportance: !isMobileView,
      showDescription: !isMobileView,
      showHandel: !isMobileView,
    });
  }, [isMobileView]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const toggleVisibility = (section) => {
    if (isMobileView) {
      setVisibility((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    }
  };

  return (
    <section id="description-panel" ref={descriptionRef} className="pt-100">
      {/* what section */}
      <div id="what-section" className="row">
        {/* description */}
        <div>
          <ScrollAnimation>
            <p
              className="flex text-heading mobile-pointer"
              onClick={() => toggleVisibility('showDescription')}
            >
              {t('common.whatIsWaste', {
                value: t(`wasteBins.${selectedBinId}.name`),
              })}
              {isMobileView && (
                <ToggleArrow isActive={visibility.showDescription} />
              )}
            </p>
          </ScrollAnimation>
          {visibility.showDescription && (
            <ScrollAnimation>
              <div className="detail-info">
                {/* description info */}
                {t(`wasteBins.${selectedBinId}.description`)}

                {/* other names */}
                {selectedBin?.otherNames?.length > 0 && (
                  <>
                    <p className="text-subheading my-16">
                      {t('common.alsoKnownAs')}
                    </p>
                    <ul>
                      {selectedBin.otherNames.map((nameKey, index) => (
                        <li key={index}>
                          {t(
                            `wasteBins.${selectedBinId}.otherNames.${nameKey}`
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </ScrollAnimation>
          )}
        </div>

        {/* example list */}
        {visibility.showDescription && (
          <div>
            <ScrollAnimation>
              <div className="detail-info">
                <p className="text-subheading mb-16">
                  {t('common.itemsInsideWaste', {
                    value: t(`wasteBins.${selectedBin.id}.name`),
                  })}
                </p>

                <ul className="items-list">
                  {selectedBin?.wasteItems?.map((itemKey, index) => (
                    <li key={index}>
                      {t(`wasteBins.${selectedBin.id}.wasteItems.${itemKey}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        )}
      </div>

      {/* how  section */}
      <div id="how-section" className="row">
        <div>
          <ScrollAnimation>
            <p
              className="flex text-heading mobile-pointer"
              onClick={() => toggleVisibility('showHandel')}
            >
              {t('common.howToHandle', {
                value: t(`wasteBins.${selectedBin.id}.name`).toLowerCase(),
              })}
              {isMobileView && <ToggleArrow isActive={visibility.showHandel} />}
            </p>
          </ScrollAnimation>
          {visibility.showHandel &&
            guidelineItems.map(({key, label}) => {
              if (selectedBin?.guideLines && selectedBin?.guideLines[key]) {
                return (
                  <div className="detail-info" key={key}>
                    <ScrollAnimation>
                      <span className="text-subheading">{label}</span>
                      {t(`wasteBins.${selectedBin.id}.guideLines.${key}`)}
                    </ScrollAnimation>
                  </div>
                );
              }
              return null;
            })}
        </div>

        {visibility.showHandel && (
          <div>
            {/* Bin Image */}
            <ScrollAnimation>
              <div className="flex-default">
                {!imageLoaded && <p className="searching"></p>}
                <img
                  className={`recommendedBin ${imageLoaded ? '' : 'hide'}`}
                  src={
                    validateImageUrl(selectedBin.binImage)
                      ? selectedBin.binImage
                      : isNight
                        ? imageSearchNight
                        : imageSearchDay
                  }
                  alt="recommendedBin"
                  onLoad={handleImageLoad}
                />
              </div>
            </ScrollAnimation>
            <ScrollAnimation>
              <div className="detail-info">
                <span className="text-subheading">
                  {t('common.suggestedBin')}
                </span>
                {t(`wasteBins.${selectedBinId}.guideLines.recommendedBinType`)}
              </div>
            </ScrollAnimation>
            <ScrollAnimation>
              <p className="detail-info">
                <span className="text-subheading">
                  {t('common.safetyPrecautions')}
                </span>
                {t(`wasteBins.${selectedBinId}.guideLines.safetyPrecautions`)}
              </p>
            </ScrollAnimation>
          </div>
        )}
      </div>

      {/* why section */}
      <div id="why-section" className="row">
        <div className="card-detail">
          <ScrollAnimation>
            <p
              className="text-heading mobile-pointer flex"
              onClick={() => toggleVisibility('showImportance')}
            >
              {t('common.whyItsImportant')}
              {isMobileView && (
                <ToggleArrow isActive={visibility.showImportance} />
              )}
            </p>
          </ScrollAnimation>
          {visibility.showImportance &&
            selectedBin?.whyItIsImportant &&
            Object?.entries(selectedBin?.whyItIsImportant)?.map(
              ([key], index) => (
                <div key={index} className="detail-info">
                  <ScrollAnimation>
                    {t(`wasteBins.${selectedBinId}.whyItIsImportant.${key}`)}
                  </ScrollAnimation>
                </div>
              )
            )}
        </div>
        {!isMobileView && <Note />}
      </div>
    </section>
  );
};

export default BinDescriptionPanel;
