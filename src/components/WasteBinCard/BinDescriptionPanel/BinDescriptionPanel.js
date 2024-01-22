import React from 'react';
import compostBin from '../../../assets/compostBin.png';
import ReadMoreLink from './ReadMoreLink';
import {useTranslation} from 'react-i18next';
import useSelectedLanguage from '../../../hooks/useSelectedLanguage';
import ScrollAnimation from '../../Common/ScrollAnimation/Scrollanimation';

const BinDescriptionPanel = ({selectedBin, selectedBinId, descriptionRef}) => {
  const {t} = useTranslation();
  useSelectedLanguage();

  const guidelineItems = [
    {key: 'handling', label: t('common.handling')},
    {key: 'separation', label: t('common.separation')},
    {key: 'whatNotToDo', label: t('common.whatNotToDo')},
  ];

  return (
    <section id="description-panel" ref={descriptionRef} className="pt-100">
      {/* what section */}
      <div id="what-section" className="row">
        {/* description */}
        <div>
          <ScrollAnimation>
            <p className="text-heading">
              {t('common.whatIsWaste', {
                value: t(`wasteBins.${selectedBinId}.name`),
              })}
            </p>
          </ScrollAnimation>
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
                        {t(`wasteBins.${selectedBinId}.otherNames.${nameKey}`)}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </ScrollAnimation>
        </div>

        {/* example list */}
        <div>
          <ScrollAnimation>
            <div className="detail-info">
              <p className="text-subheading mb-16">
                {t('common.itemsInsideWaste', {
                  value: t(`wasteBins.${selectedBinId}.name`).toLowerCase(),
                })}
              </p>

              <ul className="items-list">
                {selectedBin?.wasteItems?.map((itemKey, index) => (
                  <li key={index}>
                    {t(`wasteBins.${selectedBinId}.wasteItems.${itemKey}`)}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* how  section */}
      <div id="how-section" className="row">
        <div>
          <ScrollAnimation>
            <p className="text-heading">
              {t('common.howToHandle', {
                value: t(`wasteBins.${selectedBinId}.name`).toLowerCase(),
              })}
            </p>
          </ScrollAnimation>
          {guidelineItems.map(({key, label}) => {
            if (selectedBin?.guideLines && selectedBin?.guideLines[key]) {
              return (
                <div className="detail-info" key={key}>
                  <ScrollAnimation>
                    <span className="text-subheading">{label}</span>
                    {t(`wasteBins.${selectedBinId}.guideLines.${key}`)}
                  </ScrollAnimation>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div>
          {/* Bin Image */}
          <ScrollAnimation>
            <img
              className="recommendedBin"
              src={compostBin}
              alt="recommendedBin"
            />
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
      </div>

      {/* why section */}
      <div id="why-section" className="row">
        <div className="card-detail">
          <ScrollAnimation>
            <p className="text-heading">{t('common.whyItsImportant')}</p>
          </ScrollAnimation>
          {selectedBin?.whyItIsImportant &&
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
        <div>
          <ScrollAnimation>
            <p className="detail-info">
              <span className="text-subheading">{t('common.note')}</span>
              {t('common.disclaimer')} <ReadMoreLink />
            </p>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default BinDescriptionPanel;
