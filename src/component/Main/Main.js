import React, { Component } from 'react';
import auth from 'utils/auth';

export default class Main extends Component {
  componentDidMount() {
    document.title = 'My Log';
  }
  render() {
    return (
      <div id="main">
        <img alt="ourService" src="https://picsum.photos/600/400?image=123" />
      </div>
    );
  }
}
