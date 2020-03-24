import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import lastArticlesImg from '../img/dogstealing.jpg';
import rexiFacebook from '../img/facebook.png';

const ProArticles = () => (
  <Fragment>
    <div className="last-article-headline">
      <h2>כתבות מומחה</h2>
    </div>
    <section className="last-article">
      <div className="container-last-article">
        <div className="articals">
          <div className="the-article">
            <img src={lastArticlesImg} alt="last article img" />
            <h3>חינוך להרגלי אכילה נכונים</h3>
            <p>
              הגור והארוחה המשפחתית גורי כלבים הם ימורים חברותיים וארוחה משפחתית
              יא אחד האירועים החברתיים המהנים. מה יותר טבעי ונחמד מאשר שהגור -
              הנמנה גם הוא על בני המשפחה - יצטרף לארוחה?
            </p>
            <div className="the-article-author">
              <h4>דני מוסקוביץ - תזונה</h4>
              <h4>10 תגובות</h4>
            </div>
          </div>
          <div className="more-articles">
            <div className="article-wrap">
              <h3>טיפוח ורחצת גורי כלבים</h3>
              <div className="article-author">
                <h4>מושיק עפיה - וטרינריה</h4>
                <h4>12 תגובות</h4>
              </div>
            </div>
            <div className="article-wrap">
              <h3>כלבלב בהפרעה: גורי כלבים בגיל ההתבגרות</h3>
              <div className="article-author">
                <h4>מושיק עפיה - וטרינריה</h4>
                <h4>12 תגובות</h4>
              </div>
            </div>
            <div className="article-wrap">
              <h3>11 טיפים עבור גור כלבים שלא מפסיק ללעוס</h3>
              <div className="article-author">
                <h4>מושיק עפיה - וטרינריה</h4>
                <h4>12 תגובות</h4>
              </div>
            </div>
            <div className="article-wrap">
              <h3>להפוך את הבית לבטוח עבור הכלבלב</h3>
              <div className="article-author">
                <h4>מושיק עפיה - וטרינריה</h4>
                <h4>12 תגובות</h4>
              </div>
            </div>
            <div className="article-wrap">
              <h3>גור חדש בבית: מפגש ראשון עם הוטרינר</h3>
              <div className="article-author">
                <h4>מושיק עפיה - וטרינריה</h4>
                <h4>12 תגובות</h4>
              </div>
            </div>
            <div className="article-wrap">
              <h3>חינוך גורי כלבים לשליטה בצרכים</h3>
              <div className="article-author">
                <h4>מושיק עפיה - וטרינריה</h4>
                <h4>12 תגובות</h4>
              </div>
            </div>
            <div className="article-wrap">
              <h3>הגור החדש כל הזמן נושך, מה עושים?</h3>
              <div className="article-author">
                <h4>מושיק עפיה - וטרינריה</h4>
                <h4>12 תגובות</h4>
              </div>
            </div>
            <div className="more-articles-link">
              <Link to="#">לכל הכתבות &raquo;</Link>
            </div>
          </div>
          <div className="rexi-facebook">
            <img src={rexiFacebook} alt="Rexi facebook" />
          </div>
        </div>
      </div>
    </section>
  </Fragment>
);

export default ProArticles;
