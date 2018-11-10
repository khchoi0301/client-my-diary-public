import React from 'react';
import { Button } from 'reactstrap';
import './Specific.css';
import { Redirect } from 'react-router-dom';

const week = ['일', '월', '화', '수', '목', '금', '토'];

export default props => {
  console.log('받아온 데이터 : ', props.currentDiary);
  if (props.currentDiary.content) {
    var addHashTag = '#' + props.currentDiary.tag.join(' #');
    var date = props.currentDiary.date.split('T')[0];
    var createdAt = props.currentDiary.createdAt.split('T')[0];
    var day = week[new Date(date).getDay()];
    var createdday = week[new Date(createdAt).getDay()];
  }
  if (!props.currentDiary.content) return <Redirect to="/diary" />;
  if (props.currentDiary.clickModified) return <Redirect to="/modify" />;

  console.log('IMGIMGIMG', props.currentDiary.img);

  return (
    <div id="Specific">
      <button className="button" onClick={props.deleteDiary}>
        <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij4KPGc+Cgk8Zz4KCQk8Zz4KCQkJPHBvbHlnb24gcG9pbnRzPSIzNTMuNTc0LDE3Ni41MjYgMzEzLjQ5NiwxNzUuMDU2IDMwNC44MDcsNDEyLjM0IDM0NC44ODUsNDEzLjgwNCAgICAiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHJlY3QgeD0iMjM1Ljk0OCIgeT0iMTc1Ljc5MSIgd2lkdGg9IjQwLjEwNCIgaGVpZ2h0PSIyMzcuMjg1IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxwb2x5Z29uIHBvaW50cz0iMjA3LjE4Niw0MTIuMzM0IDE5OC40OTcsMTc1LjA0OSAxNTguNDE5LDE3Ni41MiAxNjcuMTA5LDQxMy44MDQgICAgIiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxwYXRoIGQ9Ik0xNy4zNzksNzYuODY3djQwLjEwNGg0MS43ODlMOTIuMzIsNDkzLjcwNkM5My4yMjksNTA0LjA1OSwxMDEuODk5LDUxMiwxMTIuMjkyLDUxMmgyODYuNzQgICAgIGMxMC4zOTQsMCwxOS4wNy03Ljk0NywxOS45NzItMTguMzAxbDMzLjE1My0zNzYuNzI4aDQyLjQ2NFY3Ni44NjdIMTcuMzc5eiBNMzgwLjY2NSw0NzEuODk2SDEzMC42NTRMOTkuNDI2LDExNi45NzFoMzEyLjQ3NCAgICAgTDM4MC42NjUsNDcxLjg5NnoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8L2c+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzIxLjUwNCwwSDE5MC40OTZjLTE4LjQyOCwwLTMzLjQyLDE0Ljk5Mi0zMy40MiwzMy40MnY2My40OTloNDAuMTA0VjQwLjEwNGgxMTcuNjR2NTYuODE1aDQwLjEwNFYzMy40MiAgICBDMzU0LjkyNCwxNC45OTIsMzM5LjkzMiwwLDMyMS41MDQsMHoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
      </button>
      <button
        className="button"
        onClick={() => {
          props.changeState('clickModified', true);
        }}
      >
        <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4My44MDkgNDgzLjgwOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDgzLjgwOSA0ODMuODA5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCI+CjxnPgoJPHBhdGggZD0iTTE5NC45MDUsOTMuNzI1Yy00LjkwNy04LjMzMi0xMy45ODItMTMuNTQtMjMuODYxLTEzLjcxNGMtMC4xMDktMC4wMTYtMC4xODktMC4wNjMtMC4yODUtMC4wNjMgICBjLTAuMDYzLDAtMC4xMjcsMC4wMzMtMC4yMDMsMC4wNDhjLTkuNzA0LDAuMDYzLTE4LjgyOCw1LjI3MS0yMy44NjEsMTMuNzE1TDQ1Ljg0OSwyNjQuMjczICAgYy05LjYyMiwxNi4xOTEtOC45OTIsMzYuODE4LDEuNjU5LDUyLjU2N2wzMy42NDQsNDkuMjg2Yy0yLjUwNywwLjgyLTQuODczLDIuMDUxLTYuNzUyLDMuOTljLTMuMDc4LDMuMTktNC43MzMsNy41MTMtNC41NDUsMTEuOTQ5ICAgbDMuMjY1LDg2LjAyNWMwLjMzMyw4Ljc3Myw3LjU0NiwxNS43MTcsMTYuMzE3LDE1LjcxN2wxNjIuNjYtMC4wMTZjOC43NzUsMCwxNS45ODgtNi45NDUsMTYuMzE2LTE1LjcxOWwzLjI4MS04Ni4wMDggICBjMC4xNzYtNC40MzYtMS40NjMtOC43NTktNC41NDMtMTEuOTQ5Yy0xLjg4LTEuOTM5LTQuMjQ2LTMuMTctNi43Ny0zLjk5bDMzLjU4Mi00OS4yMDdjMTAuNzItMTUuNjA2LDExLjM4MS0zNi4yNDksMS43MDMtNTIuNTgzICAgTDE5NC45MDUsOTMuNzI1eiBNMjM2LjM2Miw0NTEuMTI1bC0xMzEuMjA3LDAuMDE1bC0yLjAxOC01My4zNTdoMTM1LjI4MUwyMzYuMzYyLDQ1MS4xMjV6IE0yNjcuMDA4LDI5OC40NzRsLTQwLjYxNyw1OS41MTEgICBjLTIuOTg0LDQuNC03Ljk1Niw3LjAyMy0xMy40NDcsNy4wMjNjLTAuMDE3LDAtMC4wMTcsMC0wLjAxNywwbC04NC4zMTksMC4wNDdjLTUuNDc3LTAuMDE3LTEwLjQxOC0yLjYzNy0xMy41MS03LjEzNCAgIGwtNDAuNTU4LTU5LjQxN2MtMy41NjUtNS4yODYtMy44LTEyLjE2OC0wLjYwMS0xNy41OGw4MC40ODgtMTM2LjExNGwwLjAxMyw5OC4yMzljLTExLjA3NSw1Ljg4Ny0xOC42OTYsMTcuMzc0LTE4LjY5NiwzMC43NzMgICBjMCwxOS4zNzgsMTUuNjk5LDM1LjA4MiwzNS4wMTQsMzUuMDM0YzE5LjM1MiwwLjAxNiwzNS4wMDYtMTUuNjM5LDM1LjAwNi0zNS4wMzRjMC4wMzMtMTMuMzk5LTcuNTkyLTI0Ljg4Ny0xOC42NTItMzAuNzczICAgbC0wLjAxOC05OC4zMDNsODAuNDU1LDEzNi4yMjRDMjcwLjc4MywyODYuNDMyLDI3MC41NzksMjkzLjI2NCwyNjcuMDA4LDI5OC40NzR6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cGF0aCBkPSJNNDIwLjI0OSw2NC44NDZoLTQwLjM1MlYyNC41MDhDMzc5Ljg5NywxMC45NywzNjguOTI0LDAsMzU1LjQwMywwYy0xMy41NDEsMC0yNC41MDgsMTAuOTctMjQuNTA4LDI0LjUwOHY0MC4zMzhoLTQwLjMzOCAgIGMtMTMuNTIzLDAtMjQuNTA4LDEwLjk2Ny0yNC41MDgsMjQuNDkxYzAsMTMuNTQsMTAuOTg0LDI0LjUxMSwyNC41MDgsMjQuNTExaDQwLjMzOHY0MC4zNTJjMCwxMy41MjQsMTAuOTY3LDI0LjUwOCwyNC41MDgsMjQuNTA4ICAgYzEzLjUyMiwwLDI0LjQ5NC0xMC45ODMsMjQuNDk0LTI0LjUwOHYtNDAuMzUyaDQwLjM1MmMxMy41MzksMCwyNC41MDgtMTAuOTcxLDI0LjUwOC0yNC41MTEgICBDNDQ0Ljc1Nyw3NS44MTMsNDMzLjc4OCw2NC44NDYsNDIwLjI0OSw2NC44NDZ6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
      </button>
      {/* <Button className="button" color="danger" onClick={props.deleteDiary}>
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
      </Button> */}
      <div className="title">{props.currentDiary.title}</div>
      <hr className="detailBar" />
      <span className="tag">{addHashTag}</span>{' '}
      <span className="userdate"> </span>
      <span className="weather">{`${date} (${day}) ${
        props.currentDiary.weather
      }`}</span>
      <p className="imageContainer">
        {props.currentDiary.img === '' ? null : (
          <img
            className="userImage"
            src={props.currentDiary.img}
            alt="이미지"
          />
        )}
      </p>
      <div>
        <span className="content">{props.currentDiary.content}</span>
      </div>
      <span className="createdAt">{`${createdAt} (${createdday}) 작성`} </span>
    </div>
  );
};
