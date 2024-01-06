import React from 'react';
import {useTranslation} from 'react-i18next';

const BinNameHeader = ({selectedBin, onParentClick, onTitleClick}) => {
  const {t} = useTranslation();

  return (
    <div className="mb-16">
      {selectedBin?.parentBinName && (
        <p
          className="text-link"
          onClick={() => onParentClick(selectedBin?.parentBinId)}
        >
          {t(`wasteBins.${selectedBin?.id}.parentBinName`)}
        </p>
      )}
      {selectedBin?.name && (
        <p className="text-title ml-24 bin-name-link" onClick={onTitleClick}>
          {t(`wasteBins.${selectedBin?.id}.name`)}
        </p>
      )}
    </div>
  );
};

export default BinNameHeader;
