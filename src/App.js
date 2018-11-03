import React, { Component } from 'react';
import Diary from './component/Diary/Diary';
import Main from './component/Main/Main';
import SignUp from './component/UserController/SignUp';
import Login from './component/UserController/Login';
import NewArticle from './component/Diary/newarticle';

import { HashRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* header 넣기 */}
          <Route path="/" exact component={Main} />
          <Route path="/diary" component={Diary} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
