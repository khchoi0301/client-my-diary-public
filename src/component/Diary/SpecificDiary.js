import React from 'react';

const SpecificDiary = props => (
  <div>
    <div>title: {props.article.title}</div>
    <div>email: {props.article.email}</div>
    <div>content: {props.article.content}</div>
  </div>
);

export default SpecificDiary;
