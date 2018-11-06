import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from 'api/api';

export default class Login extends Component {
  state = {
    email: null,
    password: null,
    isLoginCorrect: false,
    isEmailCorrect: false,
  };

  _handleEmail = e => {
    this.setState({
      email: e.target.value,
    });
  };

  _handlePassword = e => {
    this.setState({
      password: e.target.value,
    });
  };

  _onLogin = e => {
    e.preventDefault();
    api
      .loginPost(this.state)
      .then(res => {
        if (res.status === 200) {
          const { token } = res.data;
          localStorage.setItem('token', token);
          alert('환영합니다!');
          window.location = '/';
        } else {
          console.dir(res);
          alert('에러가 있어요');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this._onLogin}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="example@gmail.com"
              onChange={this._handleEmail}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password"
              onChange={this._handlePassword}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
        <Link to="/signup">회원가입</Link>
        <div>
          <Link to="/">메인</Link>
        </div>
      </div>
    );
  }
}
