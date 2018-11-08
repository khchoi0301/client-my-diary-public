import React from 'react';
import { Button } from 'reactstrap';
import './Specific.css';
import { Redirect } from 'react-router-dom';

const week = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

export default props => {
  // if (!props.currentDiary.code === 1) {
  //   props.currentDiary = testData;
  // }

  console.log('받아온 데이터 : ', props.currentDiary);
  if (props.currentDiary.content) {
    var addHashTag = '#' + props.currentDiary.tag.join(' # ');
    var date = props.currentDiary.date.split('T')[0];
    var day = week[new Date(date).getDay()];
  }
  if (!props.currentDiary.content) return <Redirect to="/diary" />;
  if (props.currentDiary.clickModified) return <Redirect to="/modify" />;

  return (
    <div id="Specific">
      <Button className="button" color="danger" onClick={props.deleteDiary}>
        삭제
      </Button>
      <Button
        className="button"
        color="success"
        onClick={() => {
          props.changeState('clickModified', true);
        }}
      >
        수정
      </Button>
      <div className="title">{props.currentDiary.title}</div>
      <hr className="detailBar" />
      <span className="tag">{addHashTag}</span>{' '}
      <span className="userdate"> </span>
      <span className="weather">{`${date} (${day}) ${
        props.currentDiary.weather
      }`}</span>
      <p className="imageContainer">
        <img className="userImage" src={props.currentDiary.img} alt="이미지" />
      </p>
      <div>
        <span className="content">{props.currentDiary.content}</span>
      </div>
      <span className="createdAt">{props.currentDiary.createdAt} </span>
    </div>
  );
};
