import React from 'react';
import './CategoryCard.css';
import bgBin from '../../assets/natureNest.svg';
import burnable from '../../assets/burnable.svg';
import nonBurnable from '../../assets/nonBurnable.svg';
import recyclable from '../../assets/recyclable.svg';
import nonRecyclable from '../../assets/nonRecyclable.svg';
import {useDispatch} from 'react-redux';
import {setSelectedBin, setSelectedBinId} from '../../utils/redux/binSlice';
import {Link} from 'react-router-dom';
import {setSearchResult, setSearchTerm} from '../../utils/redux/searchSlice';
import {setMenuVisibility} from '../../utils/redux/appSlice';

const CategoryCard = ({data}) => {
  const dispatch = useDispatch();

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
      <p className="detail-title">{data?.name}</p>
      <div className="category-image-container">
        <img src={data?.imageUrl || bgBin} alt="background" />
      </div>
      <div className="category-badges">
        <div className="card-badge">
          <img
            className="badge-icon"
            src={data?.recyclable ? recyclable : nonRecyclable}
            alt="Recyclability"
          />
          <small>{data?.recyclable ? 'Recyclable' : 'Non recyclable'}</small>
        </div>
        <div className="card-badge">
          <img
            className="badge-icon"
            src={data?.burnable ? burnable : nonBurnable}
            alt="Burnability"
          />
          <small>{data?.burnable ? 'Burnable' : 'Non Burnable'}</small>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
