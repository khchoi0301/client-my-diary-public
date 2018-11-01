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
import api from '../../api/api';

export default class NewArticle extends Component {
  state = {
    title: '',
    content: '',
    weather: '',
    tag: '',
    modal: true,
  };

  _handleSubmit = e => {
    const { tag, title, content, weather } = this.state;
    const splitedTagToArr = tag.split('#').slice(1);

    let postDiaryData = {
      title,
      content,
      weather,
      tag: splitedTagToArr,
    };
    e.preventDefault();
    api.mockPost(postDiaryData);
  };

  _onChangeAttr = (e, attr) => {
    this.setState({
      [attr]: e.target.value,
    });
  };

  _toggle = () => {
    console.log('modal toggled!');

    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    return (
      <Modal
        isOpen={this.state.modal}
        toggle={() => {
          this._toggle();
          this.props.toToggle();
        }}
      >
        <ModalHeader toggle={this.toggle}>일기 등록</ModalHeader>
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
                    name="tag"
                    id="exampleTag"
                    onChange={e => {
                      this._onChangeAttr(e, 'tag');
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
