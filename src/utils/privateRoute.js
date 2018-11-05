import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from 'utils/auth';

const withPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.userCheck().code === 200 ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default withPrivateRoute;
