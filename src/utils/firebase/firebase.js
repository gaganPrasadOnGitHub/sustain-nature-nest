import {useState, useEffect, useCallback, useMemo, useRef} from 'react';
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
import useClickOutside from './useClickOutside';
import {searchWasteItems} from '../api/searchApi';

const useSearchLogic = () => {
  const dispatch = useDispatch();
  const {isLoading, searchTerm} = useSelector((state) => state.search);
  const [searchOptions, setSearchOptions] = useState([]);
  const [searchOptionsVisible, setSearchOptionsVisible] = useState(false);
  const searchOptionRef = useRef(null);

  const updateSearchOptions = useCallback((input) => {
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
    setSearchOptionsVisible(options.length > 0 && input.length >= 2);
  }, []);

  const debouncedUpdateSearchOptions = useMemo(
    () => debounce(updateSearchOptions, 300),
    [updateSearchOptions]
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedUpdateSearchOptions(searchTerm);
    }
  }, [searchTerm, debouncedUpdateSearchOptions]);

  const handleSearchChange = useCallback(
    (event) => {
      dispatch(setSearchTerm(event.target.value));
    },
    [dispatch]
  );

  const handleSearchSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const foundOption = searchOptions.find(
        (option) => option.item.toLowerCase() === searchTerm.toLowerCase()
      );

      if (foundOption) {
        dispatch(setAiSearchResult(null));
        dispatch(setSelectedBinId(foundOption.binId));
        setSearchOptionsVisible(false);
      } else {
        dispatch(setLoading(true));
        try {
          // const result = await searchWasteItems(searchTerm);
          const result = await new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                binId: '004',
                message:
                  'Organic waste such as fruit peels and food scraps can be composted to create nutrient-rich soil for gardening.',
                validItem: true,
              });
            }, 5000);
          });

          dispatch(setAiSearchResult(result));
          dispatch(setSelectedBinId(result?.binId));
          setSearchOptionsVisible(false);
          window.scrollTo(0, 0);
        } catch (error) {
          dispatch(setError('Failed to fetch results.'));
        } finally {
          dispatch(setLoading(false));
        }
      }
    },
    [searchOptions, searchTerm, dispatch]
  );

  const handleSearchOptionClick = useCallback(
    (item, binId) => {
      dispatch(setSearchTerm(item));
      dispatch(setSelectedBinId(binId));
      dispatch(setAiSearchResult(null));
      setTimeout(() => {
        setSearchOptionsVisible(false);
      }, 500);
      window.scrollTo(0, 0);
    },
    [dispatch]
  );

  useClickOutside(searchOptionRef, () => setSearchOptionsVisible(false));

  return {
    searchTerm,
    searchOptionRef,
    handleSearchChange,
    handleSearchSubmit,
    handleSearchOptionClick,
    setSearchOptionsVisible,
    searchOptions,
    searchOptionsVisible,
    isLoading,
  };
};

export default useSearchLogic;
