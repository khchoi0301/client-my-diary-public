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
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

import 'react-dates/lib/css/_datepicker.css';
import MakeTag from './MakeTag';
// var FormData = require('form-data');

export default class NewArticle extends Component {
  state = {
    title: '',
    content: '',
    date: moment(),
    weather: '',
    hashtag: [],
    modal: true,
    nestedModal: false,
    closeAll: false,
    key: '',
    img: '',
    isUploadImg: false,
  };

  _handleSubmit = e => {
    const { postUpdate, hashTableUpdate } = this.props; // Diary data state update
    const arrayifyHashTag = this.state.hashtag.map(item => {
      return item.label;
    });

    const postDiaryData = {
      ...this.state,
      hashtag: arrayifyHashTag,
    };
    this.setState({ modal: false });

    console.log('postDiaryData', postDiaryData);

    e.preventDefault();
    api
      .userDiaryPost(postDiaryData)
      .then(res => {
        if (res.status === 200) {
          hashTableUpdate();
          console.log(postDiaryData);

          postUpdate(postDiaryData);
          alert('등록되었습니다!');
        } else {
          alert('실패!');
        }
      })
      .catch(err => console.error(err));
  };

  _setHashtagState = hashtags => {
    var changed = hashtags.map(text => {
      return { label: text, value: text };
    });
    var newtag = this.state.hashtag.concat(changed);
    this.setState({
      hashtag: newtag,
    });
  };

  _sendImage = () => {
    var imageForm = new FormData();
    // console.log(document.getElementById('imagefile').files[0]);

    imageForm.append('img', document.getElementById('imagefile').files[0]);
    api
      .uploadImage(imageForm)
      .then(data => {
        const imgData = data.data;

        this._setHashtagState(imgData.tag);
        this.setState({
          img: imgData.img,
          key: imgData.key,
          isUploadImg: false,
        });
      })
      .catch(err => console.error(err));
  };

  _onChangeAttr = (e, attr) => {
    this.setState({
      [attr]: e.target.value,
    });
  };

  _onChangeTag = (e, attr) => {
    console.log('thisonchangetag', e);
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

  _onvalueChange = tags => {
    this.setState({ hashtag: tags });
    console.log('tag', this.state.hashtag);
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
    console.log('render', this.state);

    return (
      <Modal id='Newarticlemodal' isOpen={this.state.modal}>
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
                    isOutsideRange={() => false}
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
                  <MakeTag
                    tag={this.state.hashtag}
                    func={this._onvalueChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup row>
              <Label for="exampleFile" sm={2}>
                사진
              </Label>
              <Col sm={10}>
                <Input
                  type="file"
                  name="file"
                  id="imagefile"
                  onChange={() => {
                    this.setState({
                      isUploadImg: !this.state.isUploadImg,
                    });
                    console.log('Imagechanging');
                    this._sendImage();
                  }}
                />
                <FormText color="muted">
                  파일은 하나만 넣을 수 있습니다!!
                  <img src={this.state.img} width='300px' />
                </FormText>
              </Col>
            </FormGroup>

            <ModalFooter>
              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button disabled={this.state.isUploadImg ? true : false}>
                    Submit
                  </Button>
                </Col>
              </FormGroup>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
