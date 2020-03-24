import React from 'react';
import { Link } from 'react-router-dom';
import productImg from '../img/malona.jpg';
import Star from './../const/star';
import HalfStar from '../const/half-star';

const Product = () => (
  <div className="product-contianer">
    <Link to="/pro">
      <img src={productImg} alt="product" />
      <div className="product-wrap">
        <div className="product-headline">
          <h2>מלונה קני 3 פרפלסט לכלב בינוני גודל M</h2>
        </div>
        <div className="product-details">
          <p>
            מלונה לכלב קני 3 KENNY - מלונו פלסטיק איכותיות, מגינה מפני חיפה
            לקרני השמש. כוללת מערכת ניקוז בתית. כוללת מערכת אוורור. גודל
            60*60*89 חשוב לדעת - מלונה לכלבים קני המקורית של חברת פרפלסט מגיע ב-
            5 גדלים שונים - מלונה קני מיני לכלבים זעירים במשקל של עד 4 קד ויכולה
            להתאים גם לחתול אחד
          </p>
          <div className="product-price">
            <h3>300 ש"ח</h3>
          </div>
        </div>
        <div className="product-review-avg">
          <div className="product-review-avg-stars">
            <Star color="star-red" size="star-24" />
            <HalfStar size="star-24" />
            <Star size="star-24" color="star" />
            <Star size="star-24" color="star" />
            <Star size="star-24" color="star" />
          </div>
          <h3>ע"י 13 מדרגים</h3>
        </div>
      </div>
    </Link>
  </div>
);

export default Product;
