import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import api from '../../api/api';


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
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} id="Dropdown">
        <DropdownToggle caret>
          {/* UserID */}
          <img src="https://ca.slack-edge.com/TCN9XVDBP-USLACKBOT-sv1444671949-48" width='30px' />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Signed in as</DropdownItem>
          <DropdownItem header>UserID</DropdownItem>

          <DropdownItem divider />
          {/* <DropdownItem disabled>Action</DropdownItem> */}
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Help</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={api.userLogout}><span >Log Out</span></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}