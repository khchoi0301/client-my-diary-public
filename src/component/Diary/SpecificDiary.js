import React from 'react';

const SpecificDiary = props => (
  <div>
    <div>{props.article.title}</div>
    <div>{props.article.email}</div>
    <div>{props.article.content}</div>
  </div>
);

export default SpecificDiary;
