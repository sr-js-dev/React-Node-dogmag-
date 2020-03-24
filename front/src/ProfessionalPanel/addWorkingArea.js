import React, { useEffect, useState } from 'react';
import { getDistricts, getProfile, addArea } from '../action/professional';
import { isAuthenticated } from '../action/auth';
import CheckboxArea from './checkBoxArea';
import { Redirect } from 'react-router-dom';

const AddArea = () => {
  const [error, setError] = useState(false);
  const [area, setArea] = useState([]);
  const [areaSelected, setAreaSelected] = useState([]);
  const [profile, setProfile] = useState();
  const [redirectUser, setRedirectUser] = useState(false);

  const { user, token } = isAuthenticated();

  const loadProfile = () => {
    getProfile(user._id).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProfile(data);
      }
    });
  };

  const init = () => {
    getDistricts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setArea(data);
      }
    });
  };

  useEffect(() => {
    loadProfile();
    init();
  }, []);

  const showError = () => <div>{error ? <p>error</p> : null}</div>;

  const onSubmit = async e => {
    e.preventDefault();
    const data = await addArea(user._id, token, profile.user, areaSelected);
    if (data.error) {
      setError({ error: data.error });
      console.log('error', data.error);
    }
    setRedirectUser({ redirectUser: true });
  };

  const handleChecked = a => {
    setAreaSelected({ a });
  };

  const redirectUserTo = () => {
    if (redirectUser) {
      return <Redirect to="/addcalendar" />;
    }
  };

  return (
    <section className="addPro">
      {showError()}
      <div className="addPro-container">
        <form className="addPro-form" onSubmit={e => onSubmit(e)}>
          <h1>הוספת אזורי עבודה</h1>

          <div className="addPro-row">
            <ul>
              <CheckboxArea
                districts={area}
                handleChecked={p => handleChecked(p)}
              />
            </ul>
          </div>
          <div className="addPro-row">
            <button type="submit" className="addPro-submit">
              הוסף
            </button>
          </div>
        </form>
      </div>
      {redirectUserTo()}
    </section>
  );
};

export default AddArea;
