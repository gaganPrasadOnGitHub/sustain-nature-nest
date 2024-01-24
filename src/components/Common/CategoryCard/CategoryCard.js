import React, {useState, useEffect} from 'react';
import './CategoryCard.css';
import {useDispatch} from 'react-redux';
import {setSelectedBin, setSelectedBinId} from '../../../utils/redux/binSlice';
import {
  setAiSearchResult,
  setSearchTerm,
} from '../../../utils/redux/searchSlice';
import {setIsCategoryMenuVisible} from '../../../utils/redux/appSlice';
import useSelectedLanguage from '../../../hooks/useSelectedLanguage';
import {useTranslation} from 'react-i18next';
import {validateImageUrl} from '../../../utils/helpers/validateImageUrl';
import useNightMode from '../../../hooks/useNightMode';
import imageSearchDay from '../../../assets/imageSearchDay.svg';
import imageSearchNight from '../../../assets/imageSearchNight.svg';

const CategoryCard = ({data}) => {
  useSelectedLanguage();
  const {isNight} = useNightMode();
  const [imageLoaded, setImageLoaded] = useState(false);

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const handleBinClick = () => {
    dispatch(setSelectedBinId(data.id));
    dispatch(setSelectedBin(data));
    dispatch(setSearchTerm(''));
    dispatch(setAiSearchResult(null));
    dispatch(setIsCategoryMenuVisible(false));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const img = new Image();
    img.src = validateImageUrl(data?.descriptionImage)
      ? data?.descriptionImage
      : isNight
        ? imageSearchNight
        : imageSearchDay;
    img.onload = () => setImageLoaded(true);
  }, [data?.descriptionImage, isNight]);

  return (
    <div className="category-card" onClick={handleBinClick}>
      <div className="flex-default category-card-image-wrapper">
        {imageLoaded && (
          <img
            className="category-card-image"
            src={
              validateImageUrl(data?.descriptionImage)
                ? data?.descriptionImage
                : isNight
                  ? imageSearchNight
                  : imageSearchDay
            }
            alt="background"
          />
        )}
        {!imageLoaded && <p className="searching"></p>}
      </div>
      <p className="category-card-title">{t(`wasteBins.${data.id}.name`)}</p>
    </div>
  );
};

export default CategoryCard;
