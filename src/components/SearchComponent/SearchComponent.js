import React, {useRef} from 'react';
import './SearchComponent.css';
import useNightMode from '../../hooks/useNightMode';
import daySearch from '../../assets/searchIconDay.svg';
import nightSearch from '../../assets/searchIconNight.svg';
import useClickOutside from '../../hooks/useClickOutside';
import useSearchLogic from '../../hooks/useSearchLogic';

const SearchComponent = () => {
  const {
    searchTerm,
    handleSearchChange,
    handleSearchSubmit,
    handleSearchOptionClick,
    setSearchOptionsVisible,
    searchOptions,
    searchOptionsVisible,
    isLoading,
  } = useSearchLogic();
  const {isNight} = useNightMode();
  const searchOptionRef = useRef(null);

  useClickOutside(searchOptionRef, () => {
    if (searchOptionsVisible) {
      setSearchOptionsVisible(false);
    }
  });

  return (
    <form
      className="search-container border-default"
      onSubmit={handleSearchSubmit}
    >
      <input
        required
        type="text"
        placeholder="Search item to recycle or dispose"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button type="submit" disabled={isLoading}>
        <img
          className="search-icon"
          src={isNight ? nightSearch : daySearch}
          alt="Search Icon"
        />
      </button>

      {searchOptionsVisible && (
        <ul className="search-options border-default" ref={searchOptionRef}>
          {searchOptions.map(({item, binId}, index) => (
            <li
              key={index}
              onClick={() => handleSearchOptionClick(item, binId)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchComponent;
