import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from 'api/api';

export default props => {
  return (
    <Nav>
      <NavItem>
        <NavLink>
          {!props.isLogined ? (
            <Link to="/login">Login</Link>
          ) : (
            <div onClick={api.userLogout}>Logout</div>
          )}
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink>
          {!props.isLogined ? <Link to="/signup">Sign Up</Link> : null}
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink>
          <Link to="/diary">Diary Link</Link>
        </NavLink>
      </NavItem>
    </Nav>
  );
};
