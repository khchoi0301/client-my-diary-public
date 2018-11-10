import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from 'api/api';
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

    if (localStorage.getItem('nick') && !this.state.user) {

      this.setState({
        user: localStorage.getItem('nick'),
      });
      // window.location = '/';
    }

    const { isLogined } = this.state;
    console.log('header', isLogined);

    return (
      <div id="header">
        <Nav id="navbar" color="black">
          <NavItem className="diarylink">
            <NavLink>
              <Menu />
              {/* <img id="menuimg" src="https://cdn3.iconfinder.com/data/icons/mini-icon-set-web-design-device/91/Web_-_Design_-_Device_81-512.png" width="45px" /> */}
              <Link to="/diary">My Diary</Link>
            </NavLink>
          </NavItem>
          <NavItem className="home">
            <NavLink>
              <Link to="/">My Log</Link>
            </NavLink>
          </NavItem>
          <NavItem className="login">
            <NavLink >
              {(!isLogined.code) ? null :
                !(isLogined.code === 200) ? (
                  <Link to="/login">Login</Link>
                ) : (<Link to disabled><span id='nick'>{this.state.user}</span><DropDown user={this.state.user} /></Link>)}
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
