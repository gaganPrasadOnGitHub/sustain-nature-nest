import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import wasteData from '../../../data/bin.json';
import compostBin from '../../assets/compostBin.png';
import ReadMoreLink from './ReadMoreLink';

const BinDescriptionPanel = ({selectedBin, descriptionRef}) => {
  const guidelineItems = [
    {key: 'recommendedBinType', label: 'Suggested Bin'},
    {key: 'handling', label: 'Handling'},
    {key: 'separation', label: 'Separation'},
    {key: 'whatNotToDo', label: 'What not to do'},
  ];

  const defaultAnimationSettings = {
    animateOnce: true,
    offset: 50,
    animateIn: 'animate__fadeInUp',
    animatePreScroll: false,
  };

  const guideLines = selectedBin?.guideLines || {};

  return (
    <section id="description-section">
      <div className="row g-32">
        <div className="column">
          <ScrollAnimation {...defaultAnimationSettings}>
            <img
              ref={descriptionRef}
              className="recommendedBin"
              src={compostBin}
              alt="recommendedBin"
            />
          </ScrollAnimation>

          {/* description */}
          <div className="card-details-importance">
            <div className="card-detail">
              <ScrollAnimation {...defaultAnimationSettings}>
                <p className="text-heading">
                  What is {selectedBin?.name?.toLowerCase()}
                </p>
              </ScrollAnimation>
              <ScrollAnimation {...defaultAnimationSettings}>
                <div className="detail-info">{selectedBin?.description}</div>
              </ScrollAnimation>
              <ScrollAnimation {...defaultAnimationSettings}>
                <div className="detail-info">
                  <span className="text-subheading">Other names</span>
                  <ul>
                    {selectedBin?.otherNames?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-32">
        <div className="column">
          {/* Guideline */}

          <div className="">
            <p className="text-heading">Guidelines</p>
            {guidelineItems?.map(
              ({key, label}) =>
                guideLines[key] && (
                  <ScrollAnimation {...defaultAnimationSettings}>
                    <p className="detail-info">
                      <span className="text-subheading">{label}</span>
                      {guideLines[key]}
                    </p>
                  </ScrollAnimation>
                )
            )}
          </div>
        </div>
        <div className="column">
          <div className="card-detail">
            <ScrollAnimation {...defaultAnimationSettings}>
              <p className="text-heading">Why it's important</p>
            </ScrollAnimation>
            {selectedBin?.whyItIsImportant &&
              Object.entries(selectedBin.whyItIsImportant).map(
                ([key, value], index) => (
                  <ScrollAnimation key={index} {...defaultAnimationSettings}>
                    <div className="detail-info">{value}</div>
                  </ScrollAnimation>
                )
              )}
          </div>
        </div>
        <div className="column">
          <ScrollAnimation {...defaultAnimationSettings}>
            <p className="detail-info">
              <span className="text-subheading">Note</span>
              {wasteData.disclaimer} <ReadMoreLink />
            </p>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default BinDescriptionPanel;
