import React from 'react';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  CustomInput,
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { SingleDatePicker } from 'react-dates';
import './Modify.css';
import MakeTag from 'component/Diary/MakeTag';
import moment from 'moment';

export default props => {
  console.log('modify 데이터 props : ', props);

  if (props.currentDiary.isModified) return <Redirect to="diary" />;
  return (
    <div id="Modify">
      <button
        className="button"
        onClick={() => {
          props.modifyDiary();
          props.changeState('isModified', true);
        }}
      >
        <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4My44MDkgNDgzLjgwOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDgzLjgwOSA0ODMuODA5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCI+CjxnPgoJPHBhdGggZD0iTTE5NC45MDUsOTMuNzI1Yy00LjkwNy04LjMzMi0xMy45ODItMTMuNTQtMjMuODYxLTEzLjcxNGMtMC4xMDktMC4wMTYtMC4xODktMC4wNjMtMC4yODUtMC4wNjMgICBjLTAuMDYzLDAtMC4xMjcsMC4wMzMtMC4yMDMsMC4wNDhjLTkuNzA0LDAuMDYzLTE4LjgyOCw1LjI3MS0yMy44NjEsMTMuNzE1TDQ1Ljg0OSwyNjQuMjczICAgYy05LjYyMiwxNi4xOTEtOC45OTIsMzYuODE4LDEuNjU5LDUyLjU2N2wzMy42NDQsNDkuMjg2Yy0yLjUwNywwLjgyLTQuODczLDIuMDUxLTYuNzUyLDMuOTljLTMuMDc4LDMuMTktNC43MzMsNy41MTMtNC41NDUsMTEuOTQ5ICAgbDMuMjY1LDg2LjAyNWMwLjMzMyw4Ljc3Myw3LjU0NiwxNS43MTcsMTYuMzE3LDE1LjcxN2wxNjIuNjYtMC4wMTZjOC43NzUsMCwxNS45ODgtNi45NDUsMTYuMzE2LTE1LjcxOWwzLjI4MS04Ni4wMDggICBjMC4xNzYtNC40MzYtMS40NjMtOC43NTktNC41NDMtMTEuOTQ5Yy0xLjg4LTEuOTM5LTQuMjQ2LTMuMTctNi43Ny0zLjk5bDMzLjU4Mi00OS4yMDdjMTAuNzItMTUuNjA2LDExLjM4MS0zNi4yNDksMS43MDMtNTIuNTgzICAgTDE5NC45MDUsOTMuNzI1eiBNMjM2LjM2Miw0NTEuMTI1bC0xMzEuMjA3LDAuMDE1bC0yLjAxOC01My4zNTdoMTM1LjI4MUwyMzYuMzYyLDQ1MS4xMjV6IE0yNjcuMDA4LDI5OC40NzRsLTQwLjYxNyw1OS41MTEgICBjLTIuOTg0LDQuNC03Ljk1Niw3LjAyMy0xMy40NDcsNy4wMjNjLTAuMDE3LDAtMC4wMTcsMC0wLjAxNywwbC04NC4zMTksMC4wNDdjLTUuNDc3LTAuMDE3LTEwLjQxOC0yLjYzNy0xMy41MS03LjEzNCAgIGwtNDAuNTU4LTU5LjQxN2MtMy41NjUtNS4yODYtMy44LTEyLjE2OC0wLjYwMS0xNy41OGw4MC40ODgtMTM2LjExNGwwLjAxMyw5OC4yMzljLTExLjA3NSw1Ljg4Ny0xOC42OTYsMTcuMzc0LTE4LjY5NiwzMC43NzMgICBjMCwxOS4zNzgsMTUuNjk5LDM1LjA4MiwzNS4wMTQsMzUuMDM0YzE5LjM1MiwwLjAxNiwzNS4wMDYtMTUuNjM5LDM1LjAwNi0zNS4wMzRjMC4wMzMtMTMuMzk5LTcuNTkyLTI0Ljg4Ny0xOC42NTItMzAuNzczICAgbC0wLjAxOC05OC4zMDNsODAuNDU1LDEzNi4yMjRDMjcwLjc4MywyODYuNDMyLDI3MC41NzksMjkzLjI2NCwyNjcuMDA4LDI5OC40NzR6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cGF0aCBkPSJNNDIwLjI0OSw2NC44NDZoLTQwLjM1MlYyNC41MDhDMzc5Ljg5NywxMC45NywzNjguOTI0LDAsMzU1LjQwMywwYy0xMy41NDEsMC0yNC41MDgsMTAuOTctMjQuNTA4LDI0LjUwOHY0MC4zMzhoLTQwLjMzOCAgIGMtMTMuNTIzLDAtMjQuNTA4LDEwLjk2Ny0yNC41MDgsMjQuNDkxYzAsMTMuNTQsMTAuOTg0LDI0LjUxMSwyNC41MDgsMjQuNTExaDQwLjMzOHY0MC4zNTJjMCwxMy41MjQsMTAuOTY3LDI0LjUwOCwyNC41MDgsMjQuNTA4ICAgYzEzLjUyMiwwLDI0LjQ5NC0xMC45ODMsMjQuNDk0LTI0LjUwOHYtNDAuMzUyaDQwLjM1MmMxMy41MzksMCwyNC41MDgtMTAuOTcxLDI0LjUwOC0yNC41MTEgICBDNDQ0Ljc1Nyw3NS44MTMsNDMzLjc4OCw2NC44NDYsNDIwLjI0OSw2NC44NDZ6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
      </button>
      <div className="header">수정하기 </div>
      <hr className="detailBar" />
      <Form className="form">
        <FormGroup row>
          <Label for="exampleTitle" sm={2}>
            제목
          </Label>
          <Col sm={9}>{props.modify('title', '500px')}</Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for="exampleTag">
            날짜
          </Label>
          <Col sm={9}>
            <FormGroup>
              <SingleDatePicker
                date={moment()} // momentPropTypes.momentObj or null
                onDateChange={date => props.changeState('date', date)} // PropTypes.func.isRequired
                focused={props.focused} // PropTypes.bool
                onFocusChange={({ focused }) => {
                  console.log('focused ?? : ', focused);

                  props.changeState('focused', props.focused);
                }} // PropTypes.func.isRequired
                id="your_unique_id" // PropTypes.string.isRequired,
                isOutsideRange={() => false}
              />
            </FormGroup>
          </Col>
          <Label sm={2} for="exampleTag">
            날씨
          </Label>
          <Col sm={9}>
            <FormGroup>
              <CustomInput
                type="select"
                id="CustomSelect"
                name="customSelect"
                onChange={e => props.changeState('weather', e.target.value)}
              >
                <option>{props.currentDiary.weather}</option>
                <option>Thunderstorm</option>
                <option>Drizzle</option>
                <option>Rain</option>
                <option>Snow</option>
                <option>Clear</option>
                <option>Clouds</option>
              </CustomInput>
            </FormGroup>
          </Col>
          <Label for="exampleText" sm={2}>
            내용
          </Label>
          <Col sm={9}>
            <Input
              type="textarea"
              name="text"
              id="exampleText"
              placeholder="내용을 입력하세요."
              value={props.currentDiary.content}
              style={{ height: '300px' }}
              onChange={e => props.changeState('content', e.target.value)}
            />
          </Col>
        </FormGroup>
        <Row form>
          <Label sm={2} for="exampleTag">
            태그
          </Label>
          <Col sm={9}>
            <FormGroup>
              <MakeTag
                tag={props.currentDiary.tag}
                func={tags => {
                  console.log('태그 : ', tags);

                  props.changeState('tag', tags);
                }}
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup row>
          <Label for="exampleFile" sm={2}>
            사진
          </Label>
          <Col sm={10}>
            <CustomInput
              type="file"
              id="file"
              name="file"
              label="등록은 한장만 가능합니다!"
              onChange={() => {
                props.sendImg();
              }}
            />
          </Col>
        </FormGroup>
      </Form>
      <Label sm={2} />
      {props.currentDiary.img ? (
        <img className="image" src={props.currentDiary.img} alt="이미지" />
      ) : null}
    </div>
  );
};
