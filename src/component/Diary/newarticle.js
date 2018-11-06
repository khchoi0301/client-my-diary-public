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
import 'react-dates/lib/css/_datepicker.css';
import MakeTag from './MakeTag';

export default class NewArticle extends Component {
  state = {
    title: '',
    content: '',
    date: '',
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
    if (Array.isArray(this.state.hashtag)) {
      for (let i = 0; i < hashtags.length; i++) {
        this.state.hashtag.push(hashtags[i]);
        console.log('11', this.state);
      }
    } else {
      this.setState({
        hashtag: hashtags,
      });
      console.log('22', this.state);
    }
  };

  _sendImage = () => {
    // 폼데이터로 만들기
    const imageForm = new FormData();
    imageForm.append('img', document.getElementById('imagefile').files[0]);
    api
      .uploadImage(imageForm)
      .then(data => {
        const imgData = data.data;

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
                  // enctype="multipart/form-data"
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
