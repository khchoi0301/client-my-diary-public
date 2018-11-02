import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import loginPost from '../../api/api';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  state = {
    email: null,
    password: null,
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

  render() {
    return (
      <div>
        <Form
          onSubmit={e => {
            e.preventDefault();
            console.log(this.state.email, this.state.password);
            loginPost(this.state.email, this.state.password);
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
