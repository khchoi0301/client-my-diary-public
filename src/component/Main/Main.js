import React, { Component } from 'react';
import auth from 'utils/auth';
import './main.css';
import { Link } from 'react-router-dom';


export default class Main extends Component {
  render() {
    return (
      <div class="main">
        {/* <img
          id="mainimg"
          src="https://s3.ap-northeast-2.amazonaws.com/app2app2/ALLOWTO_PHOTO_20181108194839_STANDARD.jpg"
          alt="main"
        /> */}
        <div id='title'><Link to='/diary'>My Diary</Link></div>
      </div>
    );
  }
}
