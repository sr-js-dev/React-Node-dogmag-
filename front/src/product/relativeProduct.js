import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import p1 from '../img/p1.jpg';
import p2 from '../img/p2.jpg';
import p3 from '../img/p3.jpg';

const RelativeProduct = () => (
  <Fragment>
    <div className="relative-product-title">
      <h2>מוצרים קשורים</h2>
    </div>
    <div className="relative-product">
      <div className="relative-product-contianer">
        <Link to="/">
          <div className="relative-product-img">
            <img src={p1} alt="product" />
            <div className="relative-product-img-title">
              <h3>מלונות עץ לכלבים גדולים</h3>
            </div>
          </div>
        </Link>
        <Link to="/">
          <div className="relative-product-img">
            <img src={p2} alt="product" />
            <div className="relative-product-img-title">
              <h3>מלונות עץ לכלבים גדולים</h3>
            </div>
          </div>
        </Link>
        <Link to="/">
          <div className="relative-product-img">
            <img src={p3} alt="product" />
            <div className="relative-product-img-title">
              <h3>מלונות עץ לכלבים גדולים</h3>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </Fragment>
);

export default RelativeProduct;
