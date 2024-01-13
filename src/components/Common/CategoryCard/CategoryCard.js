import React from 'react';
import './CategoryCard.css';
import bgBin from '../../../assets/natureNest.svg';
import {useDispatch} from 'react-redux';
import {setSelectedBin, setSelectedBinId} from '../../../utils/redux/binSlice';
import {
  setAiSearchResult,
  setSearchTerm,
} from '../../../utils/redux/searchSlice';
import {setMenuVisibility} from '../../../utils/redux/appSlice';

const CategoryCard = ({data}) => {
  const dispatch = useDispatch();

  const handleBinClick = () => {
    dispatch(setSelectedBinId(data.id));
    dispatch(setSelectedBin(data));
    dispatch(setAiSearchResult(null));
    dispatch(setSearchTerm(''));
    dispatch(setMenuVisibility(false));
    document.body.classList.remove('no-scroll');
    window.scrollTo(0, 0);
  };

  return (
    <div className="category-card" onClick={handleBinClick}>
      <img
        className="category-card-image"
        src={data?.imageUrl || bgBin}
        alt="background"
      />

      <p className="category-card-title">{data?.name}</p>
    </div>
  );
};

export default CategoryCard;
