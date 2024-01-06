import React from 'react';
import './CategoryCard.css';
import bgBin from '../../assets/natureNest.svg';
import {useDispatch} from 'react-redux';
import {setSelectedBin, setSelectedBinId} from '../../utils/redux/binSlice';
import {Link} from 'react-router-dom';
import {setSearchResult, setSearchTerm} from '../../utils/redux/searchSlice';
import {setMenuVisibility} from '../../utils/redux/appSlice';

const CategoryCard = ({data}) => {
  const dispatch = useDispatch();

  console.log('datra a', data);

  const handleBinClick = () => {
    dispatch(setSelectedBinId(data.id));
    dispatch(setSelectedBin(data));
    dispatch(setSearchResult(null));
    dispatch(setSearchTerm(null));
    dispatch(setMenuVisibility(false));
    window.scrollTo(0, 0);
  };

  return (
    <Link className="category-card" onClick={handleBinClick}>
      <div className="category-image-container">
        <img src={data?.imageUrl || bgBin} alt="background" />
      </div>
      <p className="detail-title">{data?.name}</p>
    </Link>
  );
};

export default CategoryCard;
