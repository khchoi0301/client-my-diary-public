import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import auth from 'utils/auth';
import DropDown from './DropDown';
import Menu from './Menu';
import './mainheader.css';

export default class Header extends Component {
  state = {
    isLogined: {},
    user: null,
  };

  async _tokenCheck() {
    if (!localStorage.getItem('token')) {
      this.setState({
        isLogined: { code: 407 },
      });
    } else {
      const checking = await auth.userCheck();
      if (checking.code !== 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('nick');
        localStorage.removeItem('profile');
        alert('로그인 만료! 재로그인 해주세요');
      }
      this.setState({
        isLogined: checking,
      });
    }
  }

  async componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.setState({
        isLogined: { code: 407 },
      });
    } else {
      const checking = await auth.userCheck();
      if (checking.code !== 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('nick');
        localStorage.removeItem('profile');
        alert('로그인 만료! 재로그인 해주세요');
      }
      this.setState({
        isLogined: checking,
      });
    }
  }

  render() {
    const { isLogined } = this.state;
    console.log('loginrender', isLogined);

    if (localStorage.getItem('nick') && !this.state.user) {
      this.setState({
        user: localStorage.getItem('nick'),
      });

      console.log('checkToken');
      this._tokenCheck();
    }

    return (
      <div id="header">
        <Nav id="navbar" color="black">
          <NavItem className="diarylink">
            <NavLink>
              <Menu />
              <Link to="/diary">My Diary</Link>
            </NavLink>
          </NavItem>
          <NavItem className="home">
            <NavLink>
              <Link to="/">My Log</Link>
            </NavLink>
          </NavItem>
          <NavItem className="login">
            <NavLink>
              {!isLogined.code ? null : !(isLogined.code === 200) ? (
                <Link to="/login">Login</Link>
              ) : (
                <Link to disabled>
                  <span id="nick">{this.state.user}</span>
                  <DropDown user={this.state.user} />
                </Link>
              )}
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
