import React, { Component } from 'react';
import auth from 'utils/auth';
import './main.css';

export default class Main extends Component {
  render() {
    return (
      <div id="main">
        <h1 id='title'>My Diary</h1>
        {/* <img alt="ourService" src="https://picsum.photos/600/400?image=123" /> */}
      </div>
    );
  }
}
