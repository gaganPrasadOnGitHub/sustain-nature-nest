import React from 'react';
import './CategoryCard.css';
import bgBin from '../../../assets/natureNest.svg';
import {useDispatch} from 'react-redux';
import {setSelectedBin, setSelectedBinId} from '../../../utils/redux/binSlice';
import {
  setAiSearchResult,
  setSearchTerm,
} from '../../../utils/redux/searchSlice';
import {
  setFocusScroll,
  setIsCategoryMenuVisible,
} from '../../../utils/redux/appSlice';
import useSelectedLanguage from '../../../hooks/useSelectedLanguage';
import {useTranslation} from 'react-i18next';

const CategoryCard = ({data}) => {
  useSelectedLanguage();
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const handleBinClick = () => {
    dispatch(setSelectedBinId(data.id));
    dispatch(setSelectedBin(data));
    dispatch(setSearchTerm(''));
    dispatch(setAiSearchResult(null));
    dispatch(setFocusScroll(false));
    dispatch(setIsCategoryMenuVisible(false));
    window.scrollTo(0, 0);
  };

  return (
    <div className="category-card" onClick={handleBinClick}>
      <img
        className="category-card-image"
        src={data?.imageUrl || bgBin}
        alt="background"
      />

      <p className="category-card-title">{t(`wasteBins.${data.id}.name`)}</p>
    </div>
  );
};

export default CategoryCard;
