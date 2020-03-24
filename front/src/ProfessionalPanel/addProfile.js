import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { isAuthenticated } from './../action/auth';
import {
  getDistricts,
  getProfile,
  updateProfile
} from '../action/professional';

const AddProfile = () => {
  const [values, setValues] = useState({
    phone: '',
    city: '',
    street: '',
    number: '',
    zipcode: '',
    mainPhoto: '',
    loading: false,
    redirectToProfile: false,
    formData: ''
  });

  const {
    phone,
    city,
    street,
    number,
    zipcode,
    loading,
    redirectToProfile,
    formData
  } = values;

  const { user, token } = isAuthenticated();

  const [error, setError] = useState(false);
  const [area, setArea] = useState([]);
  const [areaSelected, setAreaSelected] = useState([]);
  const [profile, setProfile] = useState();

  const init = () => {
    getDistricts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setAreaSelected(data);
        setValues({ ...values, formData: new FormData() });
      }
    });
  };

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
    init();
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
    formData.set(e.target.name, e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChange = name => event => {
    const value = name === 'mainPhoto' ? event.target.files[0] : null;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    setError({ error: '' });
    if (profile)
      updateProfile(profile.user, user._id, token, formData).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            phone: '',
            city: '',
            street: '',
            number: '',
            zipcode: '',

            mainPhoto: '',

            loading: false,
            redirectToProfile: true
          });
        }
      });
  };

  const redirectUser = () => {
    if (redirectToProfile) {
      return <Redirect to="/companyinfo" />;
    }
  };

  return (
    <section className="addPro">
      {showLoading()}
      {showError()}
      <div className="addPro-container">
        <form className="addPro-form" onSubmit={e => onSubmit(e)}>
          {profile ? <h1> שם החברה: {profile.companyName} </h1> : 'שלום'}
          <h3>מלאו את פרטי ההתקשרות:</h3>
          <div className="addPro-row">
            <label>טלפון נייד: </label>
            <input
              type="text"
              placeholder=""
              name="phone"
              value={phone}
              onChange={e => onChange(e)}
              maxLength="15"
              required
            />
          </div>
          <div className="addPro-row">
            <label>עיר: </label>
            <input
              type="text"
              placeholder=""
              name="city"
              value={city}
              onChange={e => onChange(e)}
              maxLength="70"
              required
            />
          </div>
          <div className="addPro-row">
            <label>רחוב: </label>
            <input
              type="text"
              placeholder=""
              name="street"
              value={street}
              onChange={e => onChange(e)}
              maxLength="70"
              required
            />
          </div>
          <div className="addPro-row">
            <label>מספר: </label>
            <input
              type="text"
              placeholder=""
              name="number"
              value={number}
              onChange={e => onChange(e)}
              maxLength="70"
              required
            />
          </div>
          <div className="addPro-row">
            <label>מיקוד: </label>
            <input
              type="text"
              placeholder=""
              name="zipcode"
              value={zipcode}
              onChange={e => onChange(e)}
              maxLength="70"
              required
            />
          </div>

          <label>תמונה ראשית </label>
          <div className="addPro-row">
            <label className="btn-main-photo">
              <input
                onChange={handleChange('mainPhoto')}
                type="file"
                name="mainPhoto"
                accept="image/*"
              />
            </label>
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

export default AddProfile;
