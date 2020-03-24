import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Product from './product';

const ProductsCategory = () => {
  return (
    <Fragment>
      <section className="headline-category-product">
        <div className="container-headline-category-product">
          <h1>מיטות ומלונות</h1>
          <h3>להיות חמוד זה מעייף</h3>
        </div>
      </section>
      <section className="sort-products">
        <div className="contianer-sort">
          <p>סדר לפי:</p>
          <Link to="#">פופולריות</Link>
          <p>|</p>
          <Link to="#">מחיר</Link>
          <p>|</p>
          <Link to="#">דירוג</Link>
          <p>|</p>
          <Link to="#">שם</Link>
        </div>
      </section>
      <section className="main-products">
        <div className="container-main-products">
          <div className="filter-products">
            <div className="filter-price">
              <h3>מחיר:</h3>
              <ul className="filter-price-options">
                <li className="price-li">
                  <label className="container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <p>עד 300</p>
                  </label>
                </li>
                <li className="price-li">
                  <label className="container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <p>בין 300 ל-700</p>
                  </label>
                </li>
                <li className="price-li">
                  <label className="container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <p>700 ומעלה</p>
                  </label>
                </li>
              </ul>
            </div>
            <div className="filter-price">
              <h3>גודל כלב:</h3>
              <ul className="filter-price-options">
                <li className="price-li">
                  <label className="container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <p>קטן</p>
                  </label>
                </li>
                <li className="price-li">
                  <label className="container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <p>בינוני</p>
                  </label>
                </li>
                <li className="price-li">
                  <label className="container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <p>גדול</p>
                  </label>
                </li>
              </ul>
            </div>
            <div className="filter-price">
              <h3>סינונים נוספים</h3>
              <ul className="filter-price-options">
                <li className="price-li">
                  <label className="container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <p>עם חוות דעת</p>
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className="product">
            <Product />
            <Product />
            <Product />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ProductsCategory;
