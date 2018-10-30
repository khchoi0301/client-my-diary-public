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
} from 'reactstrap';

export default class NewArticle extends Component {
  render() {
    return (
      <Form className="form">
        <FormGroup row>
          <Label for="exampleTitle" sm={2}>
            Title
          </Label>
          <Col sm={9}>
            <Input
              type="text"
              name="title"
              id="exampletitle"
              placeholder="제목"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>
            Text Area
          </Label>
          <Col sm={9}>
            <Input
              type="textarea"
              name="text"
              id="exampleText"
              style={{ height: '300px' }}
            />
          </Col>
        </FormGroup>
        <Row form>
          <Label sm={2} for="exampleZip">
            Tag
          </Label>
          <Col md={1.5}>
            <FormGroup>
              <Input type="text" name="tag" id="exampleTag" />
            </FormGroup>
          </Col>
          <Col md={1.5}>
            <FormGroup>
              <Input type="text" name="tag" id="exampleTag" />
            </FormGroup>
          </Col>
          <Col md={1.5}>
            <FormGroup>
              <Input type="text" name="tag" id="exampleTag" />
            </FormGroup>
          </Col>
          <Col md={1.5}>
            <FormGroup>
              <Input type="text" name="tag" id="exampleTag" />
            </FormGroup>
          </Col>
          <Col md={1.5}>
            <FormGroup>
              <Input type="text" name="tag" id="exampleTag" />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup row>
          <Label for="exampleFile" sm={2}>
            File
          </Label>
          <Col sm={10}>
            <Input type="file" name="file" id="exampleFile" />
            <FormText color="muted">파일은 하나만 넣을 수 있습니다!</FormText>
          </Col>
        </FormGroup>

        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
