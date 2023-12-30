import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedBin} from '../utils/redux/binSlice';
import wasteData from '../data/bin.json';

const useSelectedBin = () => {
  const dispatch = useDispatch();
  const selectedBinId = useSelector((state) => state.bin.selectedBinId);
  const selectedBin = useSelector((state) => state.bin.selectedBin);

  useEffect(() => {
    if (selectedBinId) {
      const currentBin = wasteData.wasteBins.find(
        (bin) => bin.id === selectedBinId
      );
      dispatch(setSelectedBin(currentBin));
    }
  }, [dispatch, selectedBinId]);

  return {selectedBinId, selectedBin};
};

export default useSelectedBin;
