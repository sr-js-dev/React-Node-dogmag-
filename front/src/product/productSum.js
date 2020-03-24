import React from 'react';
import { Link } from 'react-router-dom';
import productImg from '../img/malona.jpg';
import Star from './../const/star';
import HalfStar from '../const/half-star';
import './product.css';

const ProductSum = () => {
  return (
    <div className="product-sum">
      <div className="product-sum-contianer">
        <img src={productImg} alt="product" />
        <div className="product-wrap">
          <div className="product-style">
            <div className="product-sum-headline">
              <h2>מלונה קני 3 פרפלסט לכלב בינוני גודל M</h2>
            </div>
            <div className="product-details">
              <p>
                מלונה לכלב קני 3 KENNY - מלונו פלסטיק איכותיות, מגינה מפני חיפה
                לקרני השמש. כוללת מערכת ניקוז בתית. כוללת מערכת אוורור. גודל
                60*60*89 חשוב לדעת - מלונה לכלבים קני המקורית של חברת פרפלסט
                מגיע ב- 5 גדלים שונים - מלונה קני מיני לכלבים זעירים במשקל של עד
                4 קד ויכולה להתאים גם לחתול אחד
              </p>
              <div className="product-sum-price">
                <h3>300 ש"ח</h3>
                <Link to="/">
                  <div className="btn-primary">הוספה לסל</div>
                </Link>
              </div>
            </div>
          </div>
          <div className="product-sum-review-avg">
            <div className="product-sum-review-avg-stars">
              <Star color="star-red" size="star-16" />
              <HalfStar size="star-16" />
              <Star size="star-16" color="star" />
              <Star size="star-16" color="star" />
              <Star size="star-16" color="star" />
            </div>
            <h3>ע"י 13 מדרגים</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSum;
