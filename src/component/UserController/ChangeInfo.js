import React, { Component } from 'react';
import { Button, Form, FormGroup, row, Col, Label, Input, FormText } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import api from 'api/api';
import './UserController.css';

export default class ChangeInfo extends Component {
  state = {
    email: '',
    isIdExist: false,
  };

  _handleUserInfo = (e, attr) => {
    this.setState({
      [attr]: e.target.value,
    });
  };

  _onChangeInfo = e => {
    console.log('change', e);
    e.preventDefault();
    api.changeInfoPost(this.state).then(res => {
      if (res.status === 200) {
        console.log(res);
        if (res.data.code === 405) {
          alert(res.data);
        } else {
          alert('이메일 주소로 비밀번호 변경 메일이 발송되었습니다');
          window.location = '/';
        }
      } else {
        console.dir(res);
        alert(res.response.data.message);
      }
    });
  };

  render() {
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
    } else if (this.state.isIdExist && this.state.email.length) {
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
      <div id='ChangeInfo'>
        <Form onSubmit={this._onChangeInfo}>
          <FormGroup row>
            <Label for="ChangeInfoEmail" sm={4}>이메일</Label>
            <Col sm={8}>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="example@gmail.com"
                onChange={e => this._handleUserInfo(e, 'email')}
              />
              <FormText color="muted">
                {!this.state.email.length || this.state.isIdExist ?
                  null
                  : <span className='wrong'>등록되지 않은 이메일 주소 입니다.</span>}
              </FormText>
            </Col>
          </FormGroup>

          <Button color="primary" size="lg" className='ChangeInfo btn'
            disabled={!this.state.isIdExist}>
            이메일주소로 비밀번호 변경 메일 받기
          </Button>
        </Form>
        {/* <Button color="warning" href="http://13.209.41.118:3001/auth/kakao" size="lg" className='ChangeInfo btnkakao white'  >
          <img className='kakaoimg' src='https://developers.kakao.com/assets/img/features/service/p_talk.png' width='20px' padding='100px' />
          카카오톡으로 시작 하기
        </Button> */}

        <div className='ChangeInfo'>Copiright @ 2018 MyDiary Inc.All rights reserved</div>
        <div className='ChangeInfoBottom'>
          <Link className='ChangeInfoBottom' to="/">메인</Link>
          <span className='ChangeInfoBottom' >|</span>
          <Link className='ChangeInfoBottom' to="/login">로그인</Link>
          <span className='ChangeInfoBottom' >|</span>
          <Link className='ChangeInfoBottom' to="/signup">회원가입</Link>
        </div>
      </div >
    );
  }
}