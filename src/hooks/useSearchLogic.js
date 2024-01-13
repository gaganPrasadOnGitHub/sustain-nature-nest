import {useState, useEffect, useCallback} from 'react';
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

const useSearchLogic = () => {
  const dispatch = useDispatch();
  const {isLoading, searchTerm} = useSelector((state) => state.search);
  const [searchOptions, setSearchOptions] = useState([]);
  const [searchOptionsVisible, setSearchOptionsVisible] = useState(false);

  // Update function for the search options
  const updateSearchOptions = (input) => {
    if (input.length >= 2) {
      const uniqueItems = new Set();
      const options = [];
      wasteManagementData.wasteBins.forEach((bin) => {
        bin.content.forEach((item) => {
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
      setSearchOptionsVisible(options.length > 0);
    } else {
      setSearchOptionsVisible(false);
    }
  };

  // Debounce the updateSearchOptions function
  const debouncedUpdateSearchOptions = debounce(updateSearchOptions, 300);

  // Memoize the debounced function
  const memoizedDebouncedUpdate = useCallback(debouncedUpdateSearchOptions, []);

  useEffect(() => {
    memoizedDebouncedUpdate(searchTerm);
  }, [searchTerm, memoizedDebouncedUpdate]);

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
        (option) => option.item.toLowerCase() === searchTerm?.toLowerCase()
      );

      if (foundOption) {
        dispatch(setSelectedBinId(foundOption.binId));
        dispatch(
          setAiSearchResult({item: foundOption.item, binId: foundOption.binId})
        );
        dispatch(setSearchTerm(searchTerm));
        setSearchOptionsVisible(false);
      } else {
        dispatch(setLoading(true));
        try {
          // API call logic here
          const result = {
            validItem: true,
            id: '008',
            reason: 'Found in API call',
          };
          dispatch(setAiSearchResult(result));
          dispatch(setSearchTerm(searchTerm));
          dispatch(setSelectedBinId(result.id));
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
      setSearchOptionsVisible(false);
      window.scrollTo(0, 0);
    },
    [dispatch]
  );

  return {
    searchTerm,
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
