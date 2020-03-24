import React, { useState, useEffect } from 'react';
import { addProfession } from '../action/profession';

import { isAuthenticated } from '../action/auth';
import './admin.css';

const AddProfession = () => {
  const [values, setValues] = useState({
    professionName: '',
    photo: '',
    photog: '',
    loading: false,
    formData: ''
  });

  const { loading, professionName, formData } = values;

  const [error, setError] = useState(false);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    setValues({ ...values, formData: new FormData() });
  };

  const showError = () => (
    <div>{error ? <p>למשתמש זה כבר קיים חשבון מקצועי</p> : null}</div>
  );

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
    const value = name === 'photo' ? event.target.files[0] : null;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleChangeg = name => event => {
    const value = name === 'photog' ? event.target.files[0] : null;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    addProfession(user._id, token, formData).then(data => {
      if (typeof data.error !== 'undefined' && data.error) {
        console.log('error!');
        setValues({ ...values, error: data.error });
      } else {
        console.log('not error: ', error);
        setValues({
          ...values,
          photo: '',
          professionName: '',
          loading: false,
          redirectToProfile: true
        });
      }
    });
  };

  return (
    <section className="addPro">
      {showLoading()}
      {showError()}
      <div className="addPro-container">
        <form className="addPro-form" onSubmit={e => onSubmit(e)}>
          <h1>הוספת בעל מקצוע</h1>

          <div className="addPro-row">
            <label>מקצוע</label>
            <input
              type="text"
              placeholder=""
              name="professionName"
              value={professionName}
              onChange={e => onChange(e)}
              maxLength="20"
              required
            />
          </div>
          <label> תמונה בצבע כתום </label>
          <div className="addPro-row">
            <label className="btn-main-photo">
              <input
                onChange={handleChange('photo')}
                type="file"
                name="photo"
                accept="image/*"
              />
            </label>
          </div>

          <label>תמונה בצבע אפור </label>
          <div className="addPro-row">
            <label className="btn-main-photo">
              <input
                onChange={handleChangeg('photog')}
                type="file"
                name="photog"
                accept="image/*"
              />
            </label>
          </div>

          <div className="addPro-row">
            <button type="submit" className="addPro-submit">
              הוסף
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProfession;
