import React, { Component } from 'react';
import Diary from 'component/Diary/Diary';
import Main from 'component/Main/Main';
import SignUp from 'component/UserController/SignUp';
import Login from 'component/UserController/Login';
import GetToken from 'component/UserController/GetToken';

import { HashRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* header 넣기 */}
          <Route path="/" exact component={Main} />
          <Route path="/diary" component={Diary} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/user/:token" component={GetToken} />
        </div>
      </Router>
    );
  }
}
