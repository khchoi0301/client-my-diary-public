import React, { Component } from 'react';
import { Button, Form, FormGroup, row, Col, Label, Input, FormText } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import api from 'api/api';
import './UserController.css';

export default class DeleteAccount extends Component {
  state = {
    email: '',
    isIdExist: false,
  };

  _handleUserInfo = (e, attr) => {
    this.setState({
      [attr]: e.target.value,
    });
  };

  _onDeleteAccount = e => {
    console.log('change', e);
    e.preventDefault();
    api.deleteAccountGet()
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          if (res.data.code === 405) {
            alert(res.data);
          } else {
            alert('계정이 삭제 되었습니다.');
            localStorage.removeItem('token');
            localStorage.removeItem('nick');
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
      <div id='DeleteAccount'>
        <Form onSubmit={this._onDeleteAccount}>
          <FormGroup row>
            <Label for="DeleteAccountEmail" sm={4}>이메일</Label>
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

          <Button color="primary" size="lg" className='DeleteAccount btn'
            disabled={!this.state.isIdExist}>
            회원 탈퇴 하기
          </Button>
        </Form>


        <div className='DeleteAccount'>Copiright @ 2018 MyDiary Inc.All rights reserved</div>
        <div className='DeleteAccountBottom'>
          <Link className='DeleteAccountBottom' to="/">메인</Link>
        </div>
      </div >
    );
  }
}