import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../../api/api';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  state = {
    email: null,
    password: null,
    nick: null,
  };

  _handleEmail = e => {
    this.setState({
      email: e.target.value,
    });
  };

  _handleNick = e => {
    this.setState({
      nick: e.target.value,
    });
  };

  _handlePassword = e => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <Form
          onSubmit={e => {
            e.preventDefault();
            api.signupPost(
              this.state.email,
              this.state.nick,
              this.state.password,
            );
          }}
        >
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
          <FormGroup>
            <Label for="exampleNickname">Nickname</Label>
            <Input
              type="text"
              name="nick"
              id="exampleNickname"
              placeholder="Nickname"
              onChange={this._handleNick}
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

export default SignUp;
