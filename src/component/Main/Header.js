import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from 'api/api';

export default props => {
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
            {!props.isLogined ? (
              <Link to="/login">Login</Link>
            ) : (
              <div onClick={api.userLogout}>Logout</div>
            )}
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};
