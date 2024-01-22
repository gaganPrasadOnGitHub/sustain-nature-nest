import React, {useRef} from 'react';
import './SearchComponent.css';
import useNightMode from '../../hooks/useNightMode';
import daySearch from '../../assets/searchIconDay.svg';
import nightSearch from '../../assets/searchIconNight.svg';
import useSearchLogic from '../../hooks/useSearchLogic';
import {useTranslation} from 'react-i18next';
import useSelectedLanguage from '../../hooks/useSelectedLanguage';
import ImageSearchComponent from './ImageSearchComponent/ImageSearchComponent';
import useOutsideOrScrollHide from '../../hooks/useOutsideOrScrollHide';
import {
  setFocusScroll,
  setIsTextSearchOptionsVisible,
} from '../../utils/redux/appSlice';
import {useDispatch, useSelector} from 'react-redux';

const SearchComponent = () => {
  const dispatch = useDispatch();

  const {t} = useTranslation();
  useSelectedLanguage();
  const {
    isLoading,
    searchTerm,
    searchOptions,
    handleSearchChange,
    handleSearchSubmit,
    handleSearchOptionClick,
  } = useSearchLogic();

  const {isNight} = useNightMode();
  const searchOptionRef = useRef(null);
  const isTextSearchOptionsVisible = useSelector(
    (state) => state.appData.isTextSearchOptionsVisible
  );

  useOutsideOrScrollHide(searchOptionRef, () => {
    dispatch(setIsTextSearchOptionsVisible(false));
    dispatch(setFocusScroll(false));
  });

  return (
    <div className="search-container border-default">
      <input
        className="search-input"
        required
        type="text"
        placeholder={t('common.searchPlaceholder')}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <ImageSearchComponent />
      <button
        className="search-button"
        onClick={handleSearchSubmit}
        disabled={isLoading || !searchTerm.trim().length}
      >
        {isLoading ? (
          <p className="searching"></p>
        ) : (
          <img
            className="search-icon"
            src={isNight ? nightSearch : daySearch}
            alt="Search Icon"
          />
        )}
      </button>

      {isTextSearchOptionsVisible && (
        <ul className="search-options popup" ref={searchOptionRef}>
          {searchOptions.map(({item, binId}, index) => (
            <li
              key={index}
              onClick={() => handleSearchOptionClick(item, binId)}
            >
              {t(`wasteBins.${binId}.wasteItems.${item}`)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
