import React, { useEffect, useState } from 'react';
import { addProfesional } from '../action/professional';
import { getProfession } from '../action/profession';
import Checkbox from './checkbox';
import { isAuthenticated } from '../action/auth';
import './admin.css';

const AddProfessional = () => {
  const [values, setValues] = useState({
    companyName: '',
    companyId: '',
    loading: false
  });

  const { loading, companyName, companyId } = values;

  const [error, setError] = useState(false);
  const [professions, setProfessions] = useState([]);
  const [professionsSelected, setProfessionsSelected] = useState([]);

  const { user, token } = isAuthenticated();

  const init = () => {
    getProfession().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProfessions(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

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
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const data = await addProfesional(
        user._id,
        token,
        companyId,
        companyName,
        professionsSelected
      );
      if (data == 401) {
        setError({ error: 'למשתמש קיים חשבון מקצועי' });
      } else {
        if (data.error) {
          setValues({ ...values, loading: false });
          setError({ error: data.error });
          console.log('error');
        } else {
          console.log('add');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChecked = professions => {
    setProfessionsSelected({ professions });
  };

  return (
    <section className="addPro">
      {showLoading()}
      {showError()}
      <div className="addPro-container">
        <form className="addPro-form" onSubmit={e => onSubmit(e)}>
          <h1>הוספת בעל מקצוע</h1>
          <div className="addPro-row">
            <label>id משתמש: </label>
            <input
              type="text"
              placeholder=""
              name="companyId"
              value={companyId}
              onChange={e => onChange(e)}
              maxLength="70"
              required
            />
          </div>
          <div className="addPro-row">
            <label>שם החברה: </label>
            <input
              type="text"
              placeholder=""
              name="companyName"
              value={companyName}
              onChange={e => onChange(e)}
              maxLength="70"
              required
            />
          </div>
          <div className="addPro-row">
            <ul>
              <Checkbox
                professions={professions}
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
    </section>
  );
};

export default AddProfessional;
