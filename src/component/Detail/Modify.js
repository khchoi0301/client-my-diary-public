import React from 'react';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  CustomInput,
  Button,
} from 'reactstrap';
// import { Redirect } from 'react-router-dom';
import { SingleDatePicker } from 'react-dates';
import './Modify.css';
import MakeTag from 'component/Diary/MakeTag';
import moment from 'moment';

export default props => (
  <div id="Modify">
    <Button className="button" color="success" onClick={props.sendModify}>
      수정
    </Button>
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
              onFocusChange={({ focused }) =>
                props.changeState('focused', !focused)
              } // PropTypes.func.isRequired
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
    {props.currentDiary.img ? (
      <img className="image" src={props.currentDiary.img} alt="이미지" />
    ) : null}
  </div>
);
