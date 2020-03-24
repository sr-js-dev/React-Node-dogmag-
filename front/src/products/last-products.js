import React from 'react';
import { Link } from 'react-router-dom';
import dogProduct1 from '../img/dog-bed.jpg';
import dogProduct2 from '../img/dog-shows.jpg';
import dogProduct3 from '../img/king.jpg';
import dogProduct4 from '../img/HTB1.DXIgY9YBuNjy0Fgq6AxcXXak.jpg';
import dogProduct5 from '../img/Tennis-ball-braided-fleece-tug-toy.jpg';
import dogProduct6 from '../img/dog-boeh.jpg';

const LastProduct = () => (
  <section className="last-products">
    <div className="last-products-container">
      <div className="product-menu">
        <Link to="/category/food">
          <div className="product-menu-row">
            <h2>מזון וכלי אוכל</h2>
          </div>
        </Link>
        <Link to="/category/hygiene">
          <div className="product-menu-row">
            <h2>היגיינה והדברה</h2>
          </div>
        </Link>
        <Link to="/category/clothes">
          <div className="product-menu-row">
            <h2>ביגוד</h2>
          </div>
        </Link>
        <Link to="/category/toys">
          <div className="product-menu-row">
            <h2>צעצועים ומשחקים</h2>
          </div>
        </Link>
        <Link to="/category/collar">
          <div className="product-menu-row">
            <h2>קולרים ורצועות</h2>
          </div>
        </Link>
        <Link to="/category/beds">
          <div className="product-menu-row">
            <h2>מיטות ומלונות</h2>
          </div>
        </Link>
      </div>
      <div className="last-products-one">
        <Link to="/product/1">
          <img src={dogProduct1} alt="last product added" />
          <div className="last-products-title">
            <h3>מיטת כלב</h3>
            <p>מיטות ומלונות</p>
          </div>
        </Link>
      </div>
      <div className="last-products-two">
        <div className="last-products-two-top">
          <Link to="/product/1">
            <img src={dogProduct2} alt="last product added" />
            <div className="last-products-title">
              <h3>נעלים לכלב</h3>
              <p>ביגוד</p>
            </div>
          </Link>
        </div>
        <div className="last-products-two-bottom">
          <Link to="/product/1">
            <img src={dogProduct3} alt="last product added" />
            <div className="last-products-title">
              <h3>קונג לכלב</h3>
              <p>צעצועים ומשחקים</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default LastProduct;
