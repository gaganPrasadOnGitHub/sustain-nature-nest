import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedBinId, setSelectedBin} from '../utils/redux/binSlice';
import wasteData from '../data/bin.json';

const useRandomBinSelection = () => {
  const dispatch = useDispatch();
  const selectedBinId = useSelector((state) => state.bin.selectedBinId);

  useEffect(() => {
    const bins = wasteData?.wasteBins;

    if (bins && bins.length > 0) {
      const newRandomBin = bins[Math.floor(Math.random() * bins.length)];

      if (!selectedBinId && newRandomBin) {
        dispatch(setSelectedBinId(newRandomBin.id));
        dispatch(setSelectedBin(newRandomBin));
      }
    }
  }, [dispatch, selectedBinId]);
};

export default useRandomBinSelection;
