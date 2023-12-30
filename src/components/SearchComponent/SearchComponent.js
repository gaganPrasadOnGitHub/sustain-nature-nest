import './SearchComponent.css';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// import { searchWasteItems } from "../../api/searchApi";
import {
  setError,
  setLoading,
  setSearchTerm,
  setSearchResult,
} from '../../utils/redux/searchSlice';
import {setSelectedBinId} from '../../utils/redux/binSlice';
import useSelectedBin from '../../hooks/useSelectedBin';

const SearchComponent = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.search.isLoading);
  const error = useSelector((state) => state.search.error);
  const [searchInput, setSearchInput] = useState('');

  useSelectedBin();

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event?.preventDefault();

    dispatch(setLoading(true));
    try {
      // const result = await searchWasteItems(searchInput);
      const result = {
        validItem: true,
        id: '008',
        reason: 'Apple is manfo',
      };

      dispatch(setSearchResult(result));
      dispatch(setSearchTerm(searchInput));
      dispatch(setSelectedBinId(result?.id));
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError('Failed to fetch results.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form className="search-container">
      <input
        type="text"
        placeholder="Search waste item..."
        value={searchInput}
        onChange={handleSearchChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSearchSubmit();
          }
        }}
        required
      />
      <button onClick={handleSearchSubmit} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default SearchComponent;
