import React from 'react';
import SpecificDiary from './SpecificDiary';
import './diary.css';

const SpecificDiarylist = props => (
  <div className="specific">
    {props.articles.map((article, idx) => {
      return <SpecificDiary article={article} key={idx} />;
    })}
  </div>
);

export default SpecificDiarylist;
