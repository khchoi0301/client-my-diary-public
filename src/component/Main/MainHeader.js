import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from 'api/api';
import auth from 'utils/auth';
import DropDown from './DropDown';

export default class Header extends Component {
  state = {
    isLogined: {},
    user: 'init',
    isFirst: true
  };

  async componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.setState({
        isLogined: { code: 407 }
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
    if (this.props.user !== 'propsinit' && this.state.isFirst) {
      this.setState({
        user: this.props.user,
        isFirst: false
      });
    }

    console.log('nav', this.state.user, this.props.user);
    const { isLogined } = this.state;

    return (
      <div id="header">
        <Nav id="navbar" color="black">
          <NavItem className="diarylink">
            <NavLink>
              {/* <img id='menuimg' src='https://cdn2.iconfinder.com/data/icons/music-player-icons-filled/50/Menu_Bar_2-512.png' width='25px' /> */}
              {/* <img id='menuimg' src='https://cdn.onlinewebfonts.com/svg/img_510724.png' width='20px' /> */}
              <img id='menuimg' src='https://cdn3.iconfinder.com/data/icons/mini-icon-set-web-design-device/91/Web_-_Design_-_Device_81-512.png' width='45px' />


              <Link to="/diary">My Diary</Link>
            </NavLink>
          </NavItem>
          <NavItem className='home'>
            <NavLink >
              <Link to="/">My Log</Link>
            </NavLink>
          </NavItem>
          <NavItem className="login">
            <NavLink >
              {(!isLogined.code) ? null :
                !(isLogined.code === 200) ? (
                  <Link to="/login">Login</Link>
                ) : (<Link to disabled><DropDown /></Link>)}
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
