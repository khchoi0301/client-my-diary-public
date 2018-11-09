import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from 'api/api';
import auth from 'utils/auth';
import DropDown from './DropDown';

export default class Header extends Component {
  state = {
    isLogined: {},
    user: null,
  };

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
        user: localStorage.getItem('nick')
      });
    }

    console.log(this.state.user);
    // console.log('nav', this.state.user, this.props.user, localStorage.getItem('token'), this.state.isLogined);
    // async function func() {
    //   console.log('func in');
    //   const checking = await auth.userCheck();
    //   console.log('checking', checking);

    //   // this.setState({
    //   //   isLogined: checking,
    //   //   // isLogined: { code: 200 },
    //   // });
    // }
    // if (localStorage.getItem('token') && this.state.isLogined && this.state.isLogined.code === 407) {
    //   console.log('tokken exist', this.state.isLogined.code);
    //   func();
    // }

    const { isLogined } = this.state;

    return (
      <div id="header">
        <Nav id="navbar" color="black">
          <NavItem className="diarylink">
            <NavLink>
              {/* <img id='menuimg' src='https://cdn2.iconfinder.com/data/icons/music-player-icons-filled/50/Menu_Bar_2-512.png' width='25px' /> */}
              {/* <img id='menuimg' src='https://cdn.onlinewebfonts.com/svg/img_510724.png' width='20px' /> */}
              <img
                id="menuimg"
                src="https://cdn3.iconfinder.com/data/icons/mini-icon-set-web-design-device/91/Web_-_Design_-_Device_81-512.png"
                width="45px"
              />

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
