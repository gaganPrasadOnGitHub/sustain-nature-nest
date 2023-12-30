import React from 'react';
import wasteManagementData from '../data/bin.json';
import CategoryCard from './CategoryCard/CategoryCard';

const WasteList = () => {
  return (
    <div>
      <div className="category-container">
        {wasteManagementData.wasteBins.map((bin, index) => (
          <CategoryCard key={index} data={bin} />
        ))}
      </div>
    </div>
  );
};

export default WasteList;
