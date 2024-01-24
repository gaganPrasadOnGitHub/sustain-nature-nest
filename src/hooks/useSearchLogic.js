import {useState, useEffect, useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setError,
  setLoading,
  setSearchTerm,
  setAiSearchResult,
} from '../utils/redux/searchSlice';
import {setSelectedBinId} from '../utils/redux/binSlice';
import wasteManagementData from '../data/bin.json';
import {debounce} from '../utils/debounce';
import {setIsTextSearchOptionsVisible} from '../utils/redux/appSlice';
import {searchWasteItems} from '../api/searchApi';

const useSearchLogic = () => {
  const dispatch = useDispatch();
  const {isLoading, searchTerm} = useSelector((state) => state.search);
  const [searchOptions, setSearchOptions] = useState([]);

  const handleSearchChange = useCallback(
    (event) => {
      dispatch(setSearchTerm(event.target.value));
    },
    [dispatch]
  );

  const updateSearchOptions = useCallback(
    (input) => {
      const uniqueItems = new Set();
      const options = [];

      wasteManagementData.wasteBins.forEach((bin) => {
        bin.wasteItems.forEach((item) => {
          const lowerItem = item.toLowerCase();
          if (
            lowerItem.includes(input.toLowerCase()) &&
            !uniqueItems.has(lowerItem) &&
            !bin.isParent
          ) {
            uniqueItems.add(lowerItem);
            options.push({item, binId: bin.id});
          }
        });
      });

      setSearchOptions(options);
      dispatch(
        setIsTextSearchOptionsVisible(options.length > 0 && input.length >= 2)
      );
    },
    [dispatch]
  );

  const debouncedUpdateSearchOptions = useMemo(
    () => debounce(updateSearchOptions, 300),
    [updateSearchOptions]
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedUpdateSearchOptions(searchTerm);
    }
  }, [searchTerm, debouncedUpdateSearchOptions]);

  const handleSearchSubmit = useCallback(async () => {
    const foundOption = searchOptions.find(
      (option) => option.item.toLowerCase() === searchTerm.toLowerCase()
    );

    if (foundOption) {
      dispatch(setAiSearchResult(null));
      dispatch(setSelectedBinId(foundOption.binId));
      dispatch(setIsTextSearchOptionsVisible(false));
    } else {
      dispatch(setLoading(true));
      try {
        const result = await searchWasteItems(searchTerm);

        dispatch(setAiSearchResult(result));
        dispatch(setSelectedBinId(result?.binId));
        dispatch(setIsTextSearchOptionsVisible(false));

        window.scrollTo(0, 0);
      } catch (error) {
        dispatch(setError('Failed to fetch results.'));
      } finally {
        dispatch(setLoading(false));
      }
    }
  }, [searchOptions, searchTerm, dispatch]);

  const handleSearchOptionClick = useCallback(
    (item, binId) => {
      dispatch(setSearchTerm(item));
      dispatch(setSelectedBinId(binId));
      dispatch(setAiSearchResult(null));

      setTimeout(() => {
        dispatch(setIsTextSearchOptionsVisible(false));
      }, 350);

      window.scrollTo(0, 0);
    },
    [dispatch]
  );

  return {
    isLoading,
    searchTerm,
    searchOptions,
    handleSearchChange,
    handleSearchSubmit,
    handleSearchOptionClick,
  };
};

export default useSearchLogic;
