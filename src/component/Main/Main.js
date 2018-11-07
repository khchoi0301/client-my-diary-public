import React, { Component } from 'react';
import auth from 'utils/auth';
import './main.css';

const liStyle = {
  width: '200px',
  height: '276px',
};

export default class Main extends Component {

  render() {
    return (
      <div id="main">
        <img alt="ourService" src="https://picsum.photos/600/400?image=123" />
      </div>
    );
  }
}
