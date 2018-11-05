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
var FormData = require('form-data');

export default class NewArticle extends Component {
  state = {
    title: '',
    content: '',
    weather: '',
    hashtag: '',
    modal: true,
    nestedModal: false,
    closeAll: false,
    img: '',
  };

  // _handleSubmit = e => {
  //   const { postUpdate, hashTableUpdate } = this.props; // Diary data state update
  //   const arrayifyHashTag = convertToArrayTag(this.state.hashtag);

  //   const postDiaryData = new FormData();
  //   postDiaryData.append('hashtag', arrayifyHashTag);
  //   for (var prop in this.state) {
  //     postDiaryData.append(prop, this.state[prop]);
  //   }

  //   e.preventDefault();
  //   console.log('it is', postDiaryData);
  //   // console.log('hhh', postDiaryData.getHeaders());
  //   api.userDiaryPost(postDiaryData, hashTableUpdate);
  // };

  _handleSubmit = e => {
    const { postUpdate, hashTableUpdate } = this.props; // Diary data state update
    const arrayifyHashTag = convertToArrayTag(this.state.hashtag);

    const postDiaryData = {
      ...this.state,
      hashtag: arrayifyHashTag,
    };

    console.log('postDiaryData', postDiaryData);

    e.preventDefault();
    api.userDiaryPost(postDiaryData, hashTableUpdate);
  };

  _sendImage = () => {
    // 폼데이터로 만들기
    // console.log('_sendImage');
    var imageForm = new FormData();
    // console.log(document.getElementById('imagefile').files[0]);
    imageForm.append('img', document.getElementById('imagefile').files[0]);
    api.uploadImage(imageForm, a => {
      console.log('aa', a);
      this.setState({
        img: 'aaaaaa',
      });
      console.log(this.state.img);
    });
    // console.log(e);
    // callback(e);
  };

  // _changeImgState = e => {
  //   if (this.state.img !== '') {
  //     console.log('EEEE', e);
  //     this.setState({
  //       img: e,
  //       // key: e.key,
  //     });
  //   }
  // };

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

  render() {
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
              <Label sm={2} for="exampleTag">
                날씨
              </Label>
              <Col sm={9}>
                <FormGroup>
                  <Input
                    type="text"
                    name="weather"
                    id="exampleWeather"
                    onChange={e => {
                      this._onChangeAttr(e, 'weather');
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
                <Input
                  type="file"
                  name="file"
                  id="imagefile"
                  // enctype="multipart/form-data"
                  onChange={() => {
                    console.log('Imagechanging');
                    this._sendImage();
                    // api.uploadImage();
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
