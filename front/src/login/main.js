import React, { Fragment } from 'react';
import Signin from './signin';
import Signup from './signup';
import './login.css';

const MainLogin = () => (
  <Fragment>
    <div className="wrap-main-login">
      <div className="container-main-login">
        <div className="login">
          <Signin />
        </div>
        <div className="register">
          <Signup />
        </div>
      </div>
    </div>
  </Fragment>
);

export default MainLogin;
