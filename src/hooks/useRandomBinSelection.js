import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useRandomBin from './useRandomBin';
import {setSelectedBinId, setSelectedBin} from '../utils/redux/binSlice';

const useRandomBinSelection = () => {
  const dispatch = useDispatch();
  const randomBin = useRandomBin();
  const selectedBinId = useSelector((state) => state.bin.selectedBinId);

  useEffect(() => {
    console.log('selectedBinId useRandomBinSelection', selectedBinId);
    if (!selectedBinId && randomBin) {
      console.log('selectedBinId', selectedBinId);
      console.log('randomBin', randomBin);
      dispatch(setSelectedBinId(randomBin.id));
      dispatch(setSelectedBin(randomBin));
    }
    console.log('selectedBinId aa', selectedBinId);
  }, [dispatch, selectedBinId, randomBin]);
};

export default useRandomBinSelection;
