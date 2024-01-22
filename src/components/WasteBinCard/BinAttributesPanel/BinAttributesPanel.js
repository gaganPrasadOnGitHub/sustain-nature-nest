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
import {useTranslation} from 'react-i18next';
import useSelectedLanguage from '../../../hooks/useSelectedLanguage';

const BinAttributesPanel = ({selectedBin, scrollToDescription}) => {
  const {t} = useTranslation();
  useSelectedLanguage();

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
        ? t('common.compostable')
        : selectedBin?.recyclable
          ? t('common.recyclable')
          : t('common.nonRecyclable'),
    },
    {
      condition: true,
      id: 'burnable',
      icon: selectedBin?.burnable ? burnableIcon : nonBurnableIcon,
      label: selectedBin?.burnable
        ? t('common.burnable')
        : t('common.nonBurnable'),
    },
    {
      condition: selectedBin?.caution,
      id: 'caution',
      icon: cautionIcon,
      label: t('common.caution'),
    },
    {
      condition: selectedBin?.toxic,
      id: 'toxic',
      icon: toxicIcon,
      label: t('common.toxic'),
    },
    {
      condition: selectedBin?.flammable,
      id: 'flammable',
      icon: flammableIcon,
      label: t('common.flammable'),
    },
    {
      condition: selectedBin?.bioHazardous || selectedBin?.radioactive,
      id: 'special-handling',
      icon: selectedBin?.bioHazardous ? bioHazardousIcon : radioactiveIcon,
      label: selectedBin?.bioHazardous
        ? t('common.biohazardous')
        : t('common.radioactive'),
    },
    {
      condition: selectedBin?.safetyGear,
      id: 'safetyGear',
      icon: protectiveGearIcon,
      label: t('common.useSafetyGear'),
    },
    {
      condition: selectedBin?.washHand,
      id: 'washHand',
      icon: washHandIcon,
      label: t('common.washHand'),
    },
    {
      condition: selectedBin?.sanitize,
      id: 'sanitize',
      icon: sanitizeIcon,
      label: t('common.sanitize'),
    },
  ];

  return (
    <section id="attributes-section" className="py-100">
      <div className="attributes-wrapper">
        <img
          className="bin-image"
          onClick={scrollToDescription}
          src={selectedBin?.imageUrl || compostableWasteImage}
          alt={`${selectedBin?.name} bin`}
        />

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
    </section>
  );
};

export default BinAttributesPanel;
