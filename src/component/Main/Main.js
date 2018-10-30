import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

class UserController extends Component {
  render() {
    return (
      <div>
        <Nav>
          <NavItem>
            <NavLink href="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link to="/signup">Sign Up</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              <Link to="/diary">Diary Link</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">
              Disabled Link
            </NavLink>
          </NavItem>
        </Nav>
        <img src="https://picsum.photos/600/400?image=123" />
      </div>
    );
  }
}

export default UserController;
