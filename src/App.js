import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Diary from 'component/Diary/Diary';
import Main from 'component/Main/Main';
import SignUp from 'component/UserController/SignUp';
import Login from 'component/UserController/Login';
import GetToken from 'component/UserController/GetToken';
import PrivateRouter from 'component/UserController/privateRoute';
import NewDiary from 'component/Detail/NewDiary';
import MainHeader from 'component/Main/MainHeader';
import ChangeInfo from './component/UserController/ChangeInfo';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <MainHeader />
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/changeinfo" component={ChangeInfo} />
            <Route path="/post" component={NewDiary} />
            <PrivateRouter path="/diary" component={Diary} />
            <Route path="/user/:token" component={GetToken} />
          </Switch>
        </div>
      </Router>
    );
  }
}
