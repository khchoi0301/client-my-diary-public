import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from 'api/api';
import auth from 'utils/auth';

export default class UserController extends Component {
  render() {
    return (
      <div>
        <Nav>
          <NavItem>
            <NavLink>
              {auth.getToken() === null ? ( // 토큰이 존재하는지만 확인하므로 수정 필요
                <Link to="/login">Login</Link>
              ) : (
                <div onClick={api.userLogout}>Logout</div>
              )}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              {!localStorage.token ? <Link to="/signup">Sign Up</Link> : null}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link to="/diary">Diary Link</Link>
            </NavLink>
          </NavItem>
        </Nav>
        <img alt="ourService" src="https://picsum.photos/600/400?image=123" />
      </div>
    );
  }
}
