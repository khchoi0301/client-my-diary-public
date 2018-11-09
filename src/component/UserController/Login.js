import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { Link, Route, Redirect } from 'react-router-dom';
import Main from '../Main/Main';
import App from '../../App';
import api from 'api/api';

export default class Login extends Component {
  state = {
    email: null,
    password: null,
    isLoginCorrect: false,
    isEmailCorrect: false,
    redir: false,
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
    console.log('login');
    e.preventDefault();
    api
      .loginPost(this.state)
      .then(res => {
        if (res.status === 200) {
          console.log('login set', res.data);
          const { token, nick } = res.data;
          localStorage.setItem('token', token);
          localStorage.setItem('nick', nick);

          alert('환영합니다!');
          window.location = '/';
          // this.setState({
          //   redir: true
          // });
        } else {
          alert(res.response.data.message);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (

      <div id='SignIn'>
        {this.state.redir ? <Redirect to='/' /> : null}
        <Form onSubmit={this._onLogin}>
          <FormGroup row>
            <Label for="exampleEmail" sm={4}>Email</Label>
            <Col sm={8}>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="example@gmail.com"
                onChange={this._handleEmail}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="examplePassword" sm={4}>Password</Label>
            <Col sm={8}>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="password"
                onChange={this._handlePassword}
              />
            </Col>
          </FormGroup>
          <Button color="primary" size="lg" className='signIn btn' >로그인</Button>
          <Button color="warning" href="http://13.209.41.118:3001/auth/kakao" size="lg" className='signIn btnkakao white'  >
            <img className='kakaoimg' src='https://developers.kakao.com/assets/img/features/service/p_talk.png' width='20px' padding='100px' />
            카카오톡으로 로그인 하기
          </Button>
        </Form>
        <div className='signIn'>Copiright @ 2018 MyDiary Inc.All rights reserved</div>
        <div className='signinBottom'>
          <Link className='signinBottom' to="/">메인</Link>
          <span className='signinBottom' >|</span>
          <Link className='signinBottom' to="/changeinfo">비밀번호 찾기</Link>
          <span className='signinBottom' >|</span>
          <Link className='signinBottom' to="/signup">회원가입</Link>
        </div>
      </div>
    );
  }
}
