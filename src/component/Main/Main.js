import React, { Component } from 'react';
import auth from 'utils/auth';
import './main.css';
import { Link } from 'react-router-dom';


export default class Main extends Component {
  render() {
    return (
      <div>
        <div className="main">
          {/* <img
          id="mainimg"
          src="https://s3.ap-northeast-2.amazonaws.com/app2app2/ALLOWTO_PHOTO_20181108194839_STANDARD.jpg"
          alt="main"
        /> */}
          <div id='title'><Link to='/diary'>My Diary</Link></div>
        </div>
        <div className='middle'>
          <div>
            <div className='left'>
              design <span id='and'>and</span> travel
            </div>
            <div className='right'>
              <h3>ABOUT US</h3>
              {/* 돌아가는 길은 외로운 여행이 될 듯 했다. */}
              {/* It was going to be a lonely trip back. */}
              Woven Magazine celebrates artists, designers, and entrepreneurs while exploring the history of design through travel.
            </div>
          </div>
        </div>
        <div className='bottom'></div>
      </div>

    );
  }
}
