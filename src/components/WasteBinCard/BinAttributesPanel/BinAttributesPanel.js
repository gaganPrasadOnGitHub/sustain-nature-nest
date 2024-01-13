import React from 'react';
import './BinAttributesPanel.css';
import burnableIcon from '../../../assets/burnable.svg';
import nonBurnableIcon from '../../../assets/nonBurnable.svg';
import compostableIcon from '../../../assets/compostable.svg';
import compostableWasteImage from '../../../assets/compostWaste.png';
import recyclableIcon from '../../../assets/recyclable.svg';
import nonRecyclableIcon from '../../../assets/nonRecyclable.svg';
import cautionIcon from '../../../assets/caution.svg';
import toxicIcon from '../../../assets/toxic.svg';
import flammableIcon from '../../../assets/flammable.svg';
import radioactiveIcon from '../../../assets/radioactive.svg';
import bioHazardousIcon from '../../../assets/bioHazardous.svg';
import protectiveGearIcon from '../../../assets/useProtectiveGear.png';
import washHandIcon from '../../../assets/washHand.svg';
import sanitizeIcon from '../../../assets/sanitize.svg';

const BinAttributesPanel = ({selectedBin}) => {
  const infoAttributes = [
    {
      condition: true,
      id: 'recyclable',
      icon: selectedBin?.compostable
        ? compostableIcon
        : selectedBin?.recyclable
          ? recyclableIcon
          : nonRecyclableIcon,
      label: selectedBin?.compostable
        ? 'Compostable'
        : selectedBin?.recyclable
          ? 'Recyclable'
          : 'Non recyclable',
    },
    {
      condition: true,
      id: 'burnable',
      icon: selectedBin?.burnable ? burnableIcon : nonBurnableIcon,
      label: selectedBin?.burnable ? 'Controlled Burnable' : 'Non Burnable',
    },
  ];
  const warningAttributes = [
    {
      condition: selectedBin?.caution,
      id: 'caution',
      icon: cautionIcon,
      label: 'Handle with caution',
    },
    {
      condition: selectedBin?.toxic,
      id: 'toxic',
      icon: toxicIcon,
      label: 'Toxic',
    },
    {
      condition: selectedBin?.flammable,
      id: 'flammable',
      icon: flammableIcon,
      label: 'Flammable',
    },
    {
      condition: selectedBin?.bioHazardous || selectedBin?.radioactive,
      id: 'special-handling',
      icon: selectedBin?.bioHazardous ? bioHazardousIcon : radioactiveIcon,
      label: selectedBin?.bioHazardous ? 'Bio Hazardous' : 'Radioactive',
    },
  ];

  const precautionAttributes = [
    {
      condition: selectedBin?.safetyGear,
      id: 'safetyGear',
      icon: protectiveGearIcon,
      label: 'Use safety gear',
    },
    {
      condition: selectedBin?.washHand,
      id: 'washHand',
      icon: washHandIcon,
      label: 'Wash hands',
    },
    {
      condition: selectedBin?.sanitize,
      id: 'sanitize',
      icon: sanitizeIcon,
      label: 'Sanitize',
    },
  ];

  return (
    <section id="attributes-section" className="py-100">
      <img
        className="bin-image"
        src={selectedBin?.imageUrl || compostableWasteImage}
        alt={`${selectedBin?.name} bin`}
      />
      <div className="info-top-left absolute flex-row">
        {infoAttributes.map(
          (badge, index) =>
            badge.condition && (
              <div key={index} id={badge.id} className="attribute-badge">
                <img
                  className="badge-icon"
                  src={badge.icon}
                  alt={badge.label}
                />
                <small>{badge.label}</small>
              </div>
            )
        )}
      </div>
      <div className="info-top-right absolute flex-column">
        {precautionAttributes.map(
          (badge, index) =>
            badge.condition && (
              <div key={index} id={badge.id} className="attribute-badge">
                <img
                  className="badge-icon"
                  src={badge.icon}
                  alt={badge.label}
                />
                <small>{badge.label}</small>
              </div>
            )
        )}
      </div>
      <div className="info-bottom-left absolute flex-row">
        {warningAttributes.map(
          (badge, index) =>
            badge.condition && (
              <div key={index} id={badge.id} className="attribute-badge">
                <img
                  className="badge-icon"
                  src={badge.icon}
                  alt={badge.label}
                />
                <small>{badge.label}</small>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default BinAttributesPanel;
