import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedBin, setSelectedBinId} from '../utils/redux/binSlice';
import wasteData from '../data/bin.json';
import {setAiSearchResult, setSearchTerm} from '../utils/redux/searchSlice';

const useSelectedBin = () => {
  const dispatch = useDispatch();
  const selectedBinId = useSelector((state) => state.bin.selectedBinId);
  const selectedBin = useSelector((state) => state.bin.selectedBin);

  const handleUpdateSelectedBin = (newBinId) => {
    const newBin = wasteData?.wasteBins.find((item) => item?.id === newBinId);
    if (newBin) {
      dispatch(setSelectedBinId(newBin.id));
      dispatch(setSelectedBin(newBin));
      dispatch(setAiSearchResult(null));
      dispatch(setSearchTerm(null));
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (selectedBinId) {
      const currentBin = wasteData.wasteBins.find(
        (bin) => bin.id === selectedBinId
      );
      dispatch(setSelectedBin(currentBin));
    }
  }, [dispatch, selectedBinId]);

  return {selectedBinId, selectedBin, handleUpdateSelectedBin};
};

export default useSelectedBin;
