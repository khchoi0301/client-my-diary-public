import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import api from '../../api/api';
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
    console.log(this.props.user);
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} id="Menu">
        <DropdownToggle caret>
          <img
            id="menuimg"
            src="https://cdn3.iconfinder.com/data/icons/mini-icon-set-web-design-device/91/Web_-_Design_-_Device_81-512.png"
            width="45px"
          />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>My Log</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            <Link to="/">Home</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="/diary">My Diary</Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
