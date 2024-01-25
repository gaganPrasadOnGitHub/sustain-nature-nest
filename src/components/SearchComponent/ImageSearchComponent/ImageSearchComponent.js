import React, {useState, useCallback, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './ImageSearchComponent.css';
import {setIsImageSearchMenuVisible} from '../../../utils/redux/appSlice';
import closeDay from '../../../assets/closeDay.svg';
import closeNight from '../../../assets/closeNight.svg';
import daySearch from '../../../assets/searchIconDay.svg';
import nightSearch from '../../../assets/searchIconNight.svg';
import imageSearchDay from '../../../assets/imageSearchDay.svg';
import imageSearchNight from '../../../assets/imageSearchNight.svg';
import useNightMode from '../../../hooks/useNightMode';
import useOutsideOrScrollHide from '../../../hooks/useOutsideOrScrollHide';
import {useImageSearch} from '../../../hooks/useImageSearch';
import {setError} from '../../../utils/redux/searchSlice';
import {useTranslation} from 'react-i18next';
import useSelectedLanguage from '../../../hooks/useSelectedLanguage';

const ImageSearchComponent = () => {
  const {t} = useTranslation();
  useSelectedLanguage();
  const dispatch = useDispatch();
  const {
    selectedImage,
    imageUrl,
    setImageUrl,
    handleImageChange,
    setSelectedImage,
    handleImageUrlChange,
    handleImageSearch,
  } = useImageSearch();
  const isImageSearchMenuVisible = useSelector(
    (state) => state.appData.isImageSearchMenuVisible
  );
  const isLoading = useSelector((state) => state.search.isLoading);

  const errorMessage = useSelector((state) => state.search.error);

  const imageSearchMenuRef = useRef(null);
  const {isNight} = useNightMode();
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreview('');
    }
  }, [selectedImage]);

  useOutsideOrScrollHide(imageSearchMenuRef, () => {
    if (isImageSearchMenuVisible) {
      dispatch(setIsImageSearchMenuVisible(false));
    }
  });

  const togglePopup = useCallback(
    (event) => {
      event.stopPropagation();
      dispatch(setIsImageSearchMenuVisible(!isImageSearchMenuVisible));
    },
    [isImageSearchMenuVisible, dispatch]
  );

  const handleReset = useCallback(() => {
    setImageUrl('');
    setImagePreview('');
    dispatch(setError(''));
    setSelectedImage(null);
  }, [setSelectedImage, setImageUrl, dispatch]);

  return (
    <div ref={imageSearchMenuRef} className="flex-default">
      <img
        src={isNight ? imageSearchNight : imageSearchDay}
        alt="ImageSearchIcon"
        className="image-search-icon"
        onClick={togglePopup}
      />

      {isImageSearchMenuVisible && (
        <div className="popup image-search-popup">
          <div className="flex-space-between">
            <p className="text-subheading">{t('common.imageSearch')}</p>
            <img
              src={isNight ? closeNight : closeDay}
              alt="Close"
              className="close-popup"
              onClick={togglePopup}
            />
          </div>

          <div className="image-preview-wrapper">
            <img
              src={
                imageUrl ||
                imagePreview ||
                (isNight ? imageSearchNight : imageSearchDay)
              }
              alt="Preview"
              className={`${
                selectedImage || imageUrl ? 'uploaded-image' : 'mock-image'
              }`}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="image-upload-input"
              disabled={isLoading}
            />
            <label
              htmlFor="image-upload-input"
              className={`cursor-pointer ${isLoading ? 'disabled' : ''}`}
            >
              {selectedImage
                ? t('common.changeImage')
                : t('common.uploadImage')}
            </label>
          </div>

          <div className="or-break">
            <hr /> {t('common.or')} <hr />
          </div>
          <input
            type="text"
            className="url-input"
            placeholder={t('common.pasteImageLink')}
            value={imageUrl}
            onChange={handleImageUrlChange}
            disabled={isLoading}
          />

          {errorMessage && (
            <small className="error-message">{errorMessage}</small>
          )}
          <div className="flex-space-between gap-16">
            <button
              id="image-reset-button"
              onClick={handleReset}
              disabled={(!selectedImage && !imageUrl) || isLoading}
            >
              {t('common.reset')}
            </button>
            <button
              id="image-search-button"
              onClick={handleImageSearch}
              disabled={
                (!selectedImage && !imageUrl) || errorMessage || isLoading
              }
            >
              {isLoading ? t('common.searching') : t('common.search')}
              {isLoading ? (
                <p className="searching"></p>
              ) : (
                <img
                  src={isNight ? nightSearch : daySearch}
                  alt="Search Icon"
                  className="search-icon"
                />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSearchComponent;
