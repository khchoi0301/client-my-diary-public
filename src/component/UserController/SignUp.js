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
    isPwSame: false,
    isPwLong: false,
    isIdExist: false,
  };

  _handleUserInfo = (e, attr) => {
    this.setState({
      [attr]: e.target.value,
    });
  };

  _onSignUp = e => {
    console.log('signup', e);
    e.preventDefault();
    api.signupPost(this.state).then(res => {
      if (res.status === 200) {
        if (res.data.code === 405) {
          alert('동일한 이메일이 이미 등록되었습니다.!');
        } else {
          alert('회원가입 되었습니다!');
          window.location = '/';
        }

      } else {
        console.dir(res);
        alert('회원가입에 실패했습니다!');
      }
    });
  };

  render() {
    let pwlength = 5;
    if (this.state.password.length >= pwlength && !this.state.isPwLong) {
      console.log('short password');
      this.setState({
        isPwLong: true
      });
    }
    if (this.state.password === this.state.passwordcheck && !this.state.isPwSame) {
      console.log(this.state.is);
      this.setState({
        isPwSame: true
      });
    } else if (this.state.password !== this.state.passwordcheck && this.state.isPwSame) {
      this.setState({
        isPwSame: false
      });
    }

    if (!this.state.isIdExist && this.state.email.length) {
      api.emailCheck(this.state.email)
        .then(res => {
          if (res.data.code === 405) {
            console.log(this.state.email + '이 존재함');
            this.setState({
              isIdExist: true
            });
          }
        });
    } else if (this.state.isIdExist) {
      api.emailCheck(this.state.email)
        .then(res => {
          if (res.data.code !== 405) {
            this.setState({
              isIdExist: false
            });
          }
        });
    }

    return (
      <div id='SignUp'>
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
              <FormText color="muted">
                {this.state.email.length && this.state.isIdExist ?
                  <span className='wrong'>동일한 이메일 주소가 이미 존재합니다</span>
                  : null}
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="signUpNickname" sm={4}>닉네임</Label>
            <Col sm={8}>
              <Input
                type="text"
                name="nick"
                id="exampleNickname"
                placeholder="Nickname을 반드시 입력해 주세요"
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
                {!this.state.isPwLong ?
                  <span className='wrong'>비밀번호를 {pwlength}자 이상으로 설정해 주세요</span>
                  : this.state.isPwSame ?
                    <span className='correct'>비밀 번호가 확인 되었습니다</span>
                    : <span className='wrong'>x 비밀 번호가 동일 하지 않습니다</span>}

              </FormText>
            </Col>
          </FormGroup>
          <Button color="primary" size="lg" className='signUp btn' disabled={!this.state.isPwLong || !this.state.isPwSame || this.state.isIdExist}> 가입 하기</Button>
        </Form>
        <Button color="warning" href="http://13.209.41.118:3001/auth/kakao" size="lg" className='signUp btnkakao white'  >
          <img className='kakaoimg' src='https://developers.kakao.com/assets/img/features/service/p_talk.png' width='20px' padding='100px' />
          카카오톡으로 시작 하기
        </Button>

        <div className='signUp'>Copiright @ 2018 MyDiary Inc.All rights reserved</div>
        <div className='signupBottom'>
          <Link className='signupBottom' to="/">메인</Link>
          <span className='signupBottom' >|</span>
          <Link className='signupBottom' to="/login">로그인</Link>
        </div>
      </div >
    );
  }
}