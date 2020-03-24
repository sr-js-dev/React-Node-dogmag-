import React, { useState, useEffect } from 'react';
import { addCategory } from '../action/category';

import { isAuthenticated } from '../action/auth';
import './admin.css';

const AddCategory = () => {
  const [prices, setPrices] = useState([{ number: 0, headline: '' }]);
  const [catName, setName] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, token } = isAuthenticated();

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
    setName(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await addCategory(user._id, token, catName, prices);
      setLoading(false);
      if (data.error) {
        setError({ error: data.error });
        console.log('error');
      } else {
        console.log('add');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addNewPrice = () => {
    setPrices([...prices, { number: 0, headline: '' }]);
  };

  const handlePrices = (e, index) => {
    let tempPrices = [...prices];

    tempPrices[index][e.target.name] = e.target.value;
    setPrices(tempPrices);
  };

  return (
    <section className="addPro">
      {showLoading()}
      {showError()}
      <div className="addPro-container">
        <form className="addPro-form" onSubmit={e => onSubmit(e)}>
          <h1>הוספת קטגורית מוצרים</h1>

          <div className="addPro-row">
            <label>שם</label>
            <input
              type="text"
              placeholder=""
              name="מame"
              value={catName}
              onChange={e => onChange(e)}
              maxLength="20"
              required
            />
          </div>

          <label>טווחי מחירים</label>
          {prices.map((p, i) => {
            return (
              <div className="addCat-row" key={i}>
                <label>מספר</label>
                <input
                  type="text"
                  placeholder=""
                  name="number"
                  value={p.number}
                  onChange={e => handlePrices(e, i)}
                  maxLength="20"
                  required
                />
                <label>מלל</label>
                <input
                  type="text"
                  placeholder=""
                  name="headline"
                  value={p.headline}
                  onChange={e => handlePrices(e, i)}
                  maxLength="20"
                  required
                />

                {console.log('price from input:', prices)}
              </div>
            );
          })}

          <div className="btnAddPrice" onClick={p => addNewPrice()}>
            +
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

export default AddCategory;
