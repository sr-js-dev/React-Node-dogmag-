import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
  signin,
  authenticate,
  isAuthenticated,
  googleLogin,
  facebookLogin
} from '../action/auth';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import './login.css';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false
  });

  const [googleName, setGoogleName] = useState('');
  const [googleLastName, setGoogleLastName] = useState('');
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleImage, setGoogleImage] = useState('');

  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const onChange = e => {
    setValues({ ...values, error: false, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    const data = await signin({ email, password });
    if (data.error) {
      setValues({ ...values, error: data.error, loading: false });
    } else {
      authenticate(data, () => {
        setValues({ ...values, redirectToReferrer: true });
      });
    }
  };

  const showError = () => <div>{error}</div>;

  const showLoading = () =>
    loading && (
      <div className="show-loading">
        <h2>טוען...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user) {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const responseFacebook = async response => {
    console.log(response);
    const name = response.name;
    const email = response.email;
    const picture = response.picture.data.url;
    console.log('name: ', name, ' email: ', email, ' pic:', picture);
    const data = await facebookLogin({ name, email, picture });
    if (data.error) {
      setValues({ ...values, error: data.error, loading: false });
    } else {
      authenticate(data, () => {
        setValues({ ...values, redirectToReferrer: true });
      });
    }
  };

  const responseGoogle = async response => {
    setGoogleName(response.profileObj.givenName);
    const name = response.profileObj.givenName;
    setGoogleLastName(response.profileObj.familyName);
    const lastName = response.profileObj.familyName;
    setGoogleEmail(response.profileObj.email);
    const email = response.profileObj.email;
    setGoogleImage(response.profileObj.imageUrl);
    const imageUrl = response.profileObj.imageUrl;
    console.log(imageUrl);
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

  return (
    <section className="signin">
      {showLoading()}
      {showError()}
      <div className="signin-container">
        <form className="signin-form" onSubmit={e => onSubmit(e)}>
          <h1>התחברות</h1>
          <div className="signin-row">
            <input
              type="email"
              placeholder="מייל"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              maxLength="30"
              required
            />
          </div>
          <div className="signin-row">
            <input
              type="password"
              placeholder="סיסמה"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength="6"
              maxLength="30"
              required
            />
            <div className="forgotPassword">
              <Link to="/">רקסי, שכחתי את הסיסמה...</Link>
            </div>
          </div>

          <div className="signin-row">
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

              <h1>
                <FacebookLogin
                  appId="540869129968601"
                  callback={responseFacebook}
                  textButton="f"
                  fields="name,email,picture"
                  cssClass="facebook-button"
                  render={renderProps => (
                    <button onClick={renderProps.onClick}>f</button>
                  )}
                />
              </h1>
            </div>
          </div>
        </form>
      </div>

      {redirectUser()}
    </section>
  );
};

export default Signin;
