import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Diary from 'component/Diary/Diary';
import Main from 'component/Main/Main';
import SignUp from 'component/UserController/SignUp';
import Login from 'component/UserController/Login';
import GetToken from 'component/UserController/GetToken';
import PrivateRouter from 'component/UserController/privateRoute';
import NewDiary from 'component/Detail/NewDiary';


import ChangeInfo from './component/UserController/ChangeInfo';

import Header from 'component/Main/MainHeader';


export default class App extends Component {
  state = {
    user: 'propsinit',
  };

  getUserName(user) {
    console.log('e', user);
    this.setState({
      user: user
    });
  }

  componentDidMount() {
  }


  render() {
    return (
      <Router>
        <div className="App">
          <Header user={this.state.user} />

          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/signup" component={SignUp} />
            {/* <Route path="/login" component={Login} /> */}
            <Route path="/login" render={() => <Login func={this.getUserName.bind(this)} />} />
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
