import React from 'react';
import { Link } from 'react-router-dom';

import dogProduct1 from '../img/packshot-puppy-maxi-shn17.png';
import dogProduct2 from '../img/dog-shows.jpg';
import dogProduct3 from '../img/CAWAYI-KENNEL-Dog-Pet-House-Dog-Bed-For-Dogs-Cats-Small-Animals-Products-cama-perro-hondenmand.jpg';
import dogProduct4 from '../img/HTB1.DXIgY9YBuNjy0Fgq6AxcXXak.jpg';
import dogProduct5 from '../img/319ENByJc3L._SX425_.jpg';
import dogProduct6 from '../img/dog-boeh.jpg';
import dogProduct7 from '../img/4aaa71ed5ac0f61fa954680d40fd7be5.jpg';
import dogProduct8 from '../img/kong.jpg';
import dogProduct9 from '../img/71AqhcftGlL._AC_SX425_.jpg';

const ProductBySubject = ({ componentType, title }) => (
  <section className="products-by-subject">
    <div className="products-by-subject-container">
      {componentType === '1' ? (
        <Link to="/product/1">
          <div className="cover" style={{ marginLeft: '5px' }}>
            <h3>{title}</h3>
            <p>לכל המוצרים >></p>
          </div>
        </Link>
      ) : null}

      <div className="first-row">
        <Link to="/product/1">
          <div className="products-by-subject-top">
            <img src={dogProduct3} alt="product by subject" />
            <div className="products-by-subject-title">
              <h2>מיטת כלב בצורת כף רגל</h2>
            </div>
          </div>
        </Link>
        <Link to="/product/1">
          <div className="products-by-subject-bottom">
            <img src={dogProduct1} alt="product by subject" />
            <div className="products-by-subject-title">
              <h2>מיטת כלב בצורת כף רגל</h2>
            </div>
          </div>
        </Link>
      </div>
      <div className="second-row">
        <Link to="/product/1">
          <div className="products-by-subject-top">
            <img src={dogProduct8} alt="product by subject" />
            <div className="products-by-subject-title">
              <h2>מיטת כלב בצורת כף רגל</h2>
            </div>
          </div>
        </Link>
        <Link to="/product/1">
          <div className="products-by-subject-bottom">
            <img src={dogProduct9} alt="product by subject" />
            <div className="products-by-subject-title">
              <h2>מיטת כלב בצורת כף רגל</h2>
            </div>
          </div>
        </Link>
      </div>
      <div className="three-row">
        <Link to="/product/1">
          <div className="products-by-subject-top">
            <img src={dogProduct7} alt="product by subject" />
            <div className="products-by-subject-title">
              <h2>מיטת כלב בצורת כף רגל</h2>
            </div>
          </div>
        </Link>
        <Link to="/product/1">
          <div className="products-by-subject-bottom">
            <img src={dogProduct5} alt="product by subject" />
            <div className="products-by-subject-title">
              <h2>מיטת כלב בצורת כף רגל</h2>
            </div>
          </div>
        </Link>
      </div>
      {componentType === '2' ? (
        <Link to="/product/1">
          <div className="cover" style={{ marginRight: '5px' }}>
            <h3>{title}</h3>
            <p>לכל המוצרים >></p>
          </div>
        </Link>
      ) : null}
    </div>
  </section>
);

export default ProductBySubject;
