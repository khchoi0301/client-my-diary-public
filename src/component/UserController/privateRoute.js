import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from 'utils/auth';

export default class withPrivateRoute extends Component {
  state = {
    loaded: false,
    isAuthenticated: false,
  };

  async componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.setState({
        loaded: !this.state.loaded,
      });
    } else {
      const authenticateResult = await auth.userCheck();

      try {
        if (authenticateResult.code === 200) {
          this.setState({
            isAuthenticated: !this.state.isAuthenticated,
            loaded: !this.state.loaded,
          });
        } else {
          // 추후 토큰 state 별 상태를 유저에게 보여줄 수 있는 팝업이 필요하다!!
          alert(authenticateResult.message);

          localStorage.removeItem('token');
          this.setState({
            loaded: !this.state.loaded,
          });
        }
      } catch (err) {
        throw err;
      }
    }
  }

  render() {
    const { component: Component, appStateChange, ...rest } = this.props;
    const { loaded, isAuthenticated } = this.state;

    if (!loaded) return null;

    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} appStateChange={appStateChange} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
}
