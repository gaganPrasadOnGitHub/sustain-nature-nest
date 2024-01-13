import wasteManagementData from '../data/bin.json';

const useGetBinById = (binId) => {
  const getBinById = (id) =>
    wasteManagementData.wasteBins.find((bin) => bin.id === id);

  return getBinById(binId);
};

export default useGetBinById;
