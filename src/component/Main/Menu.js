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
    let profileImg =
      localStorage.getItem('profile') ||
      'https://post-phinf.pstatic.net/MjAxNzEwMDNfMjE3/MDAxNTA3MDA3MjI1MTYw.TaU5VcfHOapwEBML6YpDx9FaJRru9-Cu_SvXJWC55kQg.NJ3jP1Rdh5TkvAqxo7VfUQOSD8bnKJpdyiQ8WGFFj4sg.PNG/%EB%B8%8C%EB%9F%B0%EC%B9%98%EB%A1%9C%EA%B3%A0.png?type=w1200';

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} id="Menu">
        <DropdownToggle caret>
          <img
            id="menuimg"
            src="https://cdn3.iconfinder.com/data/icons/mini-icon-set-web-design-device/91/Web_-_Design_-_Device_81-512.png"
            width="45px"
          />
        </DropdownToggle>
        <DropdownMenu id='menu-item'>
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
