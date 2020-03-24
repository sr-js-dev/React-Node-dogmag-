import React, { useEffect, useState } from 'react';
import { isAuthenticated } from './../action/auth';
import { getProfile, updateInfo } from '../action/professional';
import { Redirect } from 'react-router-dom';

const AddProfessionalInfo = () => {
  const [values, setValues] = useState({
    about: '',
    facebook: '',
    Arabic: false,
    English: false,
    Handicap: false
  });

  const { about, facebook, Arabic, English, Handicap } = values;

  const { user, token } = isAuthenticated();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirect, SetRedirect] = useState(false);
  const [profile, setProfile] = useState();

  const loadProfile = () => {
    getProfile(user._id).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProfile(data);
      }
    });
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const showError = () => <div>{error.error ? <p>error</p> : null}</div>;

  const showLoading = () =>
    loading && (
      <div className="show-loading">
        <h2>טוען...</h2>
      </div>
    );

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading({ loading: true });
    if (profile)
      updateInfo(profile.user, user._id, token, values).then(data => {
        if (data.error) {
          setError({ error: data.error });
        } else {
          setValues({
            ...values,
            about: '',
            facebook: '',
            Arabic: true,
            English: false,
            Handicap: false
          });
          SetRedirect({ redirect: true });
        }
      });
  };

  const handleRadioBtn = (e, Name) => {
    if (e.target.name === 'Arabic') {
      if (e.target.value === 'true') {
        setValues({ ...values, Arabic: true });
      } else {
        setValues({ ...values, Arabic: false });
      }
    } else if (e.target.name === 'English') {
      if (e.target.value === 'true') {
        setValues({ ...values, English: true });
      } else {
        setValues({ ...values, English: false });
      }
    } else if (e.target.name === 'Handicap') {
      if (e.target.value === 'true') {
        setValues({ ...values, Handicap: true });
      } else {
        setValues({ ...values, Handicap: false });
      }
    }
  };

  const redirectUser = () => {
    if (redirect) {
      return <Redirect to="/addworkingarea" />;
    }
  };

  return (
    <section className="addPro">
      {showLoading()}
      {showError()}
      <div className="addPro-container">
        <form className="addPro-form" onSubmit={e => onSubmit(e)}>
          {profile ? <h1> שם החברה: {profile.companyName} </h1> : 'שלום'}
          <label>ספרו לנו קצת על העסק: </label>
          <div className="addPro-row">
            <textarea
              rows="5"
              cols="100"
              name="about"
              placeholder="גוף ההודעה"
              value={about}
              onChange={e => onChange(e)}
            ></textarea>
          </div>
          <div className="addPro-row">
            <label>פייסבוק: </label>
            <input
              type="text"
              placeholder=""
              name="facebook"
              value={facebook}
              onChange={e => onChange(e)}
              maxLength="70"
              required
            />
          </div>
          <div
            className="addPro-row"
            onChange={e => handleRadioBtn(e, 'Arabic')}
          >
            <label>שירות בשפה הערבית: </label>
            <input type="radio" value="true" name="Arabic" /> כן
            <input type="radio" value="false" name="Arabic" /> לא
          </div>
          <div
            className="addPro-row"
            onChange={e => handleRadioBtn(e, 'English')}
          >
            <label>שירות בשפה האנגלית: </label>
            <input type="radio" value="true" name="English" /> כן
            <input type="radio" value="false" name="English" /> לא
          </div>
          <div
            className="addPro-row"
            onChange={e => handleRadioBtn(e, 'Handicap')}
          >
            <label>נגישות לאנשים עם מוגבלות: </label>
            <input type="radio" value="true" name="Handicap" /> כן
            <input type="radio" value="false" name="Handicap" /> לא
          </div>

          <div className="addPro-row">
            <button type="submit" className="addPro-submit">
              עדכן
            </button>
          </div>
        </form>
      </div>
      {redirectUser()}
    </section>
  );
};

export default AddProfessionalInfo;
