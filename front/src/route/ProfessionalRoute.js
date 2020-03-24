import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../action/auth';

const ProfessionalRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() &&
      (isAuthenticated().user.role === 1 ||
        isAuthenticated().user.role === 2) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default ProfessionalRoute;
