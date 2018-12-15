import React, { Component } from 'react';
import './main.css';
import { Link } from 'react-router-dom';

export default class Main extends Component {
  render() {
    return (
      <div>
        <div className="main">
          <img id="mainimg" src="./main.jpg" alt="main" />
          <div id="title">
            <Link to="/diary">My Diary</Link>
          </div>
        </div>
        <div className="middle">
          <div>
            <div className="left">
              design <span id="and">and</span> travel
            </div>
            <div className="right">
              <h3>ABOUT US</h3>
              Woven Magazine celebrates artists, designers, and entrepreneurs
              while exploring the history of design through travel.
            </div>
          </div>
        </div>
        <div className="bottom" />
      </div>
    );
  }
}
