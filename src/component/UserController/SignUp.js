import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from 'api/api';

export default class SignUp extends Component {
  state = {
    email: '',
    password: null,
    nick: null,
  };

  _handleUserInfo = (e, attr) => {
    this.setState({
      [attr]: e.target.value,
    });
  };

  _onSignUp = e => {
    e.preventDefault();
    api.signupPost(this.state).then(res => {
      if (res.status === 200) {
        alert('성공');
      } else {
        console.dir(res);
        alert('실패');
      }
    });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this._onSignUp}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="example@gmail.com"
              onChange={e => this._handleUserInfo(e, 'email')}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password"
              onChange={e => this._handleUserInfo(e, 'password')}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleNickname">Nickname</Label>
            <Input
              type="text"
              name="nick"
              id="exampleNickname"
              placeholder="Nickname"
              onChange={e => this._handleUserInfo(e, 'nick')}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
        <Link to="/">메인</Link>
        <div>
          <Link to="/login">로그인</Link>
        </div>
      </div>
    );
  }
}
