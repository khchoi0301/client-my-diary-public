import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} id="Menu">
        <DropdownToggle caret>
          <img
            id="menuimg"
            src="https://cdn3.iconfinder.com/data/icons/mini-icon-set-web-design-device/91/Web_-_Design_-_Device_81-512.png"
            width="45px"
          />
        </DropdownToggle>
        <DropdownMenu id="menu-item">
          <DropdownItem header>My Diary</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            <Link to="/alldiary">Diaries</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="/diary">Tags</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="/post">New Diary</Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
