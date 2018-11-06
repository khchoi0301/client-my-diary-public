import React, { Component } from 'react';
import Diary from 'component/Diary/Diary';
import Main from 'component/Main/Main';
import SignUp from 'component/UserController/SignUp';
import Login from 'component/UserController/Login';
import PrivateRouter from 'component/UserController/privateRoute';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* header 넣기 */}
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <PrivateRouter path="/diary" component={Diary} />
          </Switch>
        </div>
      </Router>
    );
  }
}
