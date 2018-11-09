import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import api from '../../api/api';
import { Link } from 'react-router-dom';


export default class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    console.log(this.props.user);
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} id="Dropdown">
        <DropdownToggle caret>
          <img src="https://post-phinf.pstatic.net/MjAxNzEwMDNfMjE3/MDAxNTA3MDA3MjI1MTYw.TaU5VcfHOapwEBML6YpDx9FaJRru9-Cu_SvXJWC55kQg.NJ3jP1Rdh5TkvAqxo7VfUQOSD8bnKJpdyiQ8WGFFj4sg.PNG/%EB%B8%8C%EB%9F%B0%EC%B9%98%EB%A1%9C%EA%B3%A0.png?type=w1200" width='30px' />
          {/* <img src="https://ca.slack-edge.com/TCN9XVDBP-USLACKBOT-sv1444671949-48" width='30px' /> */}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Signed in as</DropdownItem>
          <DropdownItem header id='dropnick'>{this.props.user}</DropdownItem>
          <DropdownItem divider />
          {/* <DropdownItem disabled>Action</DropdownItem> */}
          <DropdownItem><Link to='/deleteaccount'>Delete Account</Link>  </DropdownItem>
          <DropdownItem>Help</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={api.userLogout}><span >Log Out</span></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}