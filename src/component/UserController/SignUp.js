import React, { Component } from 'react';
import { Button, Form, FormGroup, row, Col, Label, Input, FormText } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import api from 'api/api';
import './UserController.css';

export default class SignUp extends Component {
  state = {
    email: '',
    password: '',
    passwordcheck: null,
    nick: null,
    isSignUp: false,
    isSame: false
  };

  _handleUserInfo = (e, attr) => {
    this.setState({
      [attr]: e.target.value,
    });

    console.log(this.state.isSame);
    if (this.state.password.length > 5 && this.state.password === this.state.passwordcheck) {
      console.log(this.state);
      this.setState({
        isSame: true
      });
    }

  };

  _onSignUp = e => {
    console.log('signup', e);
    e.preventDefault();
    api.signupPost(this.state).then(res => {
      if (res.status === 200) {
        alert('회원가입 되었습니다!');
        this.setState({
          isSignUp: !this.state.isSignUp,
        });
      } else {
        console.dir(res);
        alert('회원가입에 실패했습니다!');
      }
    });
  };

  render() {
    const { isSignUp } = this.state;
    return (
      <div id='SignUp'>
        {/* {isSignUp ? <Redirect to='/login'/> :  */}
        <Form onSubmit={this._onSignUp}>
          <FormGroup row>
            <Label for="signUpEmail" sm={4}>이메일</Label>
            <Col sm={8}>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="example@gmail.com"
                onChange={e => this._handleUserInfo(e, 'email')}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="signUpNickname" sm={4}>닉네임</Label>
            <Col sm={8}>
              <Input
                type="text"
                name="nick"
                id="exampleNickname"
                placeholder="Nickname"
                onChange={e => this._handleUserInfo(e, 'nick')}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className='test' for="signUpPassword" sm={4} >비밀번호</Label>
            <Col sm={8}>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="password"
                onChange={e => this._handleUserInfo(e, 'password')}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="signUpPasswordcheck" sm={4}>비밀번호 확인</Label>
            <Col sm={8}>
              <Input
                type="password"
                name="passwordcheck"
                id="examplePasswordcheck"
                placeholder="password"
                onChange={e => this._handleUserInfo(e, 'passwordcheck')}
              />
              <FormText color="muted">
                {this.state.isSame ? '동일' : 'x 비밀 번호가 동일 하지 않습니다'}


              </FormText>
            </Col>
          </FormGroup>
          <Button color="primary" size="lg" className='signUp btn' >가입 하기</Button>

        </Form>
        <Button color="primary" size="lg" className='signUp btnkakao white' color='white' >카카오톡으로 시작 하기</Button>

        <div className='signUp'>Copiright@2018 MyDiary Inc.All rights reserved</div>
        <div className='signupBottom'>
          <Link className='signupBottom' to="/">메인</Link>
          <Link className='signupBottom' to="/login">로그인</Link>
        </div>
      </div>
    );
  }
}