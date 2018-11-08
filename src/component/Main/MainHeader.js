import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from 'api/api';
import auth from 'utils/auth';

export default class Header extends Component {
  state = {
    isLogined: {},
  };

  async componentDidMount() {
    if (!localStorage.getItem('token')) {
      // 토큰 없음
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
      <div id="header">
        <Nav id="navbar" color="black">
          <NavItem>
            <NavLink>
              <Link to="/">My Log</Link>
            </NavLink>
          </NavItem>
          <NavItem id="diarylink">
            <NavLink>
              <Link to="/diary">My Diary</Link>
            </NavLink>
          </NavItem>
          <NavItem id="login">
            <NavLink id="navlink">
              {!(isLogined.code === 200) ? (
                <Link to="/login">Login</Link>
              ) : (
                <div onClick={api.userLogout}>Logout</div>
              )}
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
