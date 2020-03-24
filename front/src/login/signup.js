import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
  signup,
  googleLogin,
  facebookLogin,
  authenticate
} from '../action/auth';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import './login.css';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    checkpassword: '',
    error: '',
    success: false,
    loading: false,
    redirectToReferrer: false
  });

  const {
    name,
    lastName,
    email,
    password,
    checkpassword,
    success,
    error,
    loading,
    redirectToReferrer
  } = values;

  const onChange = e => {
    setValues({ ...values, error: false, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setValues({ ...values, error: false });
    const data = await signup({ name, lastName, email, password });
    if (data.error) {
      setValues({ ...values, error: data.error, success: false });
    } else {
      setValues({
        ...values,
        name: '',
        lastName: '',
        email: '',
        password: '',
        checkpassword: '',
        error: '',
        success: true
      });
    }
  };

  const showError = () => (
    <div style={{ display: error ? '' : 'none' }}>{error}</div>
  );

  const showSuccess = () => (
    <div className="show-success" style={{ display: success ? '' : 'none' }}>
      נוצר חשבון משתמש חדש, בבקשה התחבר
    </div>
  );

  const responseGoogle = async response => {
    const name = response.profileObj.givenName;
    const lastName = response.profileObj.familyName;
    const email = response.profileObj.email;
    const imageUrl = response.profileObj.imageUrl;
    const data = await googleLogin({
      name,
      lastName,
      email,
      imageUrl
    });
    if (data.error) {
      setValues({ ...values, error: data.error, loading: false });
    } else {
      authenticate(data, () => {
        setValues({ ...values, redirectToReferrer: true });
      });
    }
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }
  };

  return (
    <section className="signup">
      {showSuccess()}
      {showError()}
      <div className="signup-container">
        <form className="signup-form" onSubmit={e => onSubmit(e)}>
          <h1>הרשמה</h1>
          <div className="signup-row">
            <input
              type="text"
              placeholder="שם פרטי"
              name="name"
              value={name}
              onChange={e => onChange(e)}
              maxLength="20"
              className="input-name-right"
              required
            />
            <input
              type="text"
              placeholder="שם משפחה"
              name="lastName"
              value={lastName}
              onChange={e => onChange(e)}
              maxLength="20"
              className="input-name-left"
              required
            />
          </div>
          <div className="signup-row">
            <input
              type="email"
              placeholder="מייל"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              maxLength="30"
              className="input-email"
              required
            />
          </div>
          <div className="signup-row">
            <input
              type="password"
              placeholder="סיסמה"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength="6"
              maxLength="30"
              className="input-password"
              required
            />
          </div>
          <div className="signup-row">
            <input
              type="password"
              placeholder="סיסמה חוזרת"
              name="checkpassword"
              value={checkpassword}
              onChange={e => onChange(e)}
              minLength="6"
              maxLength="30"
              className="input-password"
              required
            />
          </div>
          <div className="signup-row">
            <button type="submit" className="btn-submit">
              כניסה
            </button>
          </div>
          <div className="more-options-login">
            <p>אפשר גם עם</p>
            <div className="outside-login">
              <Link to="/">
                <h1>
                  <GoogleLogin
                    clientId="994355747421-3d51nir2he9edu09lapanvif6rdfb003.apps.googleusercontent.com"
                    buttonText=""
                    render={renderProps => (
                      <button
                        onClick={renderProps.onClick}
                        style={{
                          backgroundColor: '#e69500',
                          fontSize: '32px',
                          border: 'none',
                          color: 'white',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        G
                      </button>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                </h1>
              </Link>
              <Link to="/">
                <h1>f</h1>
              </Link>
            </div>
          </div>
        </form>
      </div>
      {redirectUser()}
    </section>
  );
};

export default Signup;
