import {useEffect, useState} from 'react';
import wasteData from '../data/bin.json';

const useRandomBin = () => {
  const [randomBin, setRandomBin] = useState(null);

  useEffect(() => {
    const bins = wasteData?.wasteBins;
    if (bins && bins.length > 0) {
      const newRandomBin = bins[Math.floor(Math.random() * bins.length)];
      setRandomBin(newRandomBin);
    }
  }, []);

  return randomBin;
};

export default useRandomBin;
