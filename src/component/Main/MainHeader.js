import React, { Component } from 'react';
// import { Nav, NavItem, NavLink } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import api from 'api/api';
import auth from 'utils/auth';
import Header from 'component/Main/Header';

export default class HomeScreen extends Component {
  state = {
    isLogined: {},
  };

  async componentDidMount() {
    if (!localStorage.getItem('token')) {
      const { isLogined } = this.state;
      this.setState({
        isLogined: {
          code: 407,
          message: '잘못된 회원입니다.',
          ...isLogined,
        },
      });
    } else {
      const checking = await auth.userCheck();
      console.log(123);

      if (checking.code !== 200) {
        localStorage.removeItem('token');
        alert('로그인 만료! 재로그인 해주세요');
      }
      this.setState({
        isLogined: checking,
      });
    }
  }

  render() {
    const { isLogined } = this.state;

    if (!isLogined.code) return null;

    return (
      <div id="mainheader">
        <Header props={isLogined.code === 200} />
      </div>
    );
  }
}
