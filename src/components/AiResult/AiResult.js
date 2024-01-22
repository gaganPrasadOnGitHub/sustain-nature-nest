import React from 'react';
import './AiResult.css';
import aiIcon from '../../assets/ai.svg';
import {useSelector} from 'react-redux';

const AiResult = () => {
  const aiSearchResult = useSelector((state) => state.search.aiSearchResult);
  const error = useSelector((state) => state.search.error);

  return (
    aiSearchResult && (
      <div className="ai-result detail-info">
        <img src={aiIcon} alt="ai" />
        <p>{aiSearchResult?.message || error}</p>
      </div>
    )
  );
};

export default AiResult;
