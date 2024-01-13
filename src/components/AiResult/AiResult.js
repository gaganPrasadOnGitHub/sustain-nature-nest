import React from 'react';
import aiIcon from '../../assets/ai.svg';
import {useSelector} from 'react-redux';

const AiResult = () => {
  const aiSearchResult = useSelector((state) => state.search.aiSearchResult);

  return (
    aiSearchResult && (
      <div className="ai-result">
        <img src={aiIcon} alt="ai" />
        <p>{aiSearchResult?.reason}</p>
      </div>
    )
  );
};

export default AiResult;
