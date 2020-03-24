import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import dogProduct1 from '../img/dog-bed.jpg';
import dogProduct2 from '../img/dog-shows.jpg';
import dogProduct3 from '../img/king.jpg';
import dogProduct4 from '../img/HTB1.DXIgY9YBuNjy0Fgq6AxcXXak.jpg';
import dogProduct5 from '../img/Tennis-ball-braided-fleece-tug-toy.jpg';
import shopingCart from '../icon/shopping-basket.png';

const LastProduct = () => (
  <Fragment>
    <div className="products-headline">
      <h2>מוצרים לכלב</h2>
    </div>
    <section className="last-products">
      <div className="container-last-products">
        <div className="products">
          <div className="product-row">
            <div className="wrap-product-top">
              <Link to="#">
                <img src={dogProduct1} alt="dog products" />
                <div className="product-dog-title">
                  <h3>מיטת כלב מכותנה מלאה</h3>
                  <p>מיטות ומזרנים</p>
                </div>
              </Link>
            </div>
            <div className="wrap-product-bottom">
              <Link to="#">
                <img src={dogProduct2} alt="dog products" />
                <div className="product-dog-title">
                  <h3>מיטת כלב מכותנה מלאה</h3>
                  <p>מיטות ומזרנים</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="product-row">
            <div className="wrap-product-top">
              <Link to="#">
                <img src={dogProduct3} alt="dog products" />
                <div className="product-dog-title">
                  <h3>מיטת כלב מכותנה מלאה</h3>
                  <p>מיטות ומזרנים</p>
                </div>
              </Link>
            </div>
            <div className="wrap-product-bottom">
              <Link to="#">
                <img src={dogProduct4} alt="dog products" />
                <div className="product-dog-title">
                  <h3>מיטת כלב מכותנה מלאה</h3>
                  <p>מיטות ומזרנים</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="product-row">
            <div className="wrap-product-top">
              <Link to="#">
                <img src={dogProduct5} alt="dog products" />
                <div className="product-dog-title">
                  <h3>מיטת כלב מכותנה מלאה</h3>
                  <p>מיטות ומזרנים</p>
                </div>
              </Link>
            </div>
            <div className="wrap-all-products">
              <Link to="#">
                <div className="product-dog-all-link">
                  <div className="product-dog-all-img">
                    <img src={shopingCart} alt="shoping cart" />
                    <h3>לכל המוצרים</h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="newsletter">
          <div className="container-newsletter">
            <div className="newsletter-text">
              <h4>רקסי, תביא עיתון!</h4>
              <p>
                מדי פעם אנחנו שולחים ניוזלטר עם כל הכתבות והמוצרים החדשים באתר.
              </p>
              <p>הירשמו, רקסי לא נושך.</p>
            </div>
            <input
              className="newsletter-mail"
              type="text"
              placeholder="המייל שלך"
            ></input>
            <button>רוץ!</button>
          </div>
        </div>
      </div>
    </section>
  </Fragment>
);

export default LastProduct;
