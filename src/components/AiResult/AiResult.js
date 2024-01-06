import React from 'react';
import aiIcon from '../../assets/ai.svg';
import {useSelector} from 'react-redux';

const AiResult = () => {
  const searchResult = useSelector((state) => state.search.searchResult);

  return (
    searchResult && (
      <div className="ai-result">
        <img src={aiIcon} alt="ai" />
        <p>{searchResult?.reason}</p>
      </div>
    )
  );
};

export default AiResult;
