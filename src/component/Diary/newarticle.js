import React, { Component } from 'react';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import api from 'api/api';
import convertToArrayTag from 'utils/util';

import 'react-dates/initialize';
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class NewArticle extends Component {
  state = {
    title: '',
    content: '',
    date: '',
    weather: '',
    hashtag: '',
    modal: true,
    nestedModal: false,
    closeAll: false,
  };

  _handleSubmit = e => {
    const { postUpdate, hashTableUpdate } = this.props; // Diary data state update
    const arrayifyHashTag = convertToArrayTag(this.state.hashtag);

    const postDiaryData = {
      ...this.state,
      hashtag: arrayifyHashTag,
    };

    console.log(postDiaryData);

    e.preventDefault();
    api
      .userDiaryPost(postDiaryData)
      .then(res => {
        if (res.status === 200) {
          hashTableUpdate();
          console.log(postDiaryData);

          postUpdate(postDiaryData);
          alert('성공!');
        } else {
          alert('실패!');
        }
      })
      .catch(err => console.error(err));
  };

  _onChangeAttr = (e, attr) => {
    this.setState({
      [attr]: e.target.value,
    });
  };

  _toggle = attr => {
    this.setState({
      [attr]: !this.state[attr],
    });
  };

  _toggleNested = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false,
    });
  };

  _toggleAll = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true,
    });
  };

  async componentDidMount() {
    const getWeatherData = await api.getWeather('Seoul');

    try {
      const userLocationArea = getWeatherData.data.weather[0].main;
      this.setState({
        weather: userLocationArea,
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    // console.log('date', this.state.date._d);
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader
          toggle={() => {
            this._toggle('modal');
            this.props.toToggle();
          }}
        >
          일기 등록
        </ModalHeader>
        <ModalBody>
          <Form className="form" onSubmit={this._handleSubmit}>
            <FormGroup row>
              <Label for="exampleTitle" sm={2}>
                제목
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="title"
                  id="exampletitle"
                  placeholder="제목"
                  onChange={e => {
                    this._onChangeAttr(e, 'title');
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} for="exampleTag">
                날짜
              </Label>
              <Col sm={9}>
                <FormGroup>
                  <SingleDatePicker
                    date={this.state.date} // momentPropTypes.momentObj or null
                    onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                    id="your_unique_id" // PropTypes.string.isRequired,
                  />
                </FormGroup>
              </Col>
              <Label sm={2} for="exampleTag">
                날씨
              </Label>
              <Col sm={9}>
                <FormGroup>
                  <div>{this.state.weather}</div>
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
                  style={{ height: '300px' }}
                  onChange={e => {
                    this._onChangeAttr(e, 'content');
                  }}
                />
              </Col>
            </FormGroup>
            <Row form>
              <Label sm={2} for="exampleTag">
                태그
              </Label>
              <Col sm={9}>
                <FormGroup>
                  <Input
                    type="text"
                    name="hashtag"
                    id="exampleTag"
                    onChange={e => {
                      this._onChangeAttr(e, 'hashtag');
                    }}
                  />
                </FormGroup>
              </Col>
              {/* <Label sm={2} for="exampleTag">
                날씨
              </Label>
              <Col sm={9}>
                <FormGroup>
                  <Input
                    type="text"
                    name="weather"
                    id="exampleWeather"
                    value={this.state.weather}
                    onChange={e => {
                      this._onChangeAttr(e, 'weather');
                    }}
                  />
                </FormGroup>
              </Col> */}
            </Row>

            <FormGroup row>
              <Label for="exampleFile" sm={2}>
                사진
              </Label>
              <Col sm={10}>
                <Input type="file" name="file" id="exampleFile" />
                <FormText color="muted">
                  파일은 하나만 넣을 수 있습니다!
                </FormText>
              </Col>
            </FormGroup>

            <ModalFooter>
              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button>Submit</Button>
                </Col>
              </FormGroup>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
