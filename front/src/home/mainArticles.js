import React from 'react';
import { Link } from 'react-router-dom';
import d1 from '../img/dog1.jpg';
import d2 from '../img/dog2.jpg';
import d3 from '../img/dog3.jpg';
import l1 from '../icon/lightbulb-idea.png';
import l2 from '../icon/newspaper.png';
import l3 from '../icon/pet-brush.png';

const MainArticles = () => (
  <section className="first-section">
    <div className="container-best-articles">
      <div className="main-article">
        <img className="main-article-img" src={d1} alt="main article" />
        <div className="main-article-div">
          <div className="main-article-headline">
            <p>כותרת כתבה ראשית</p>
          </div>
          <div className="main-article-author">
            <p>מחבר הכתבה ומספר תגובות</p>
          </div>
        </div>
      </div>
      <div className="top-articles">
        <div className="top-article-div1">
          <img className="main-article-img2" src={d2} alt="article 2" />
          <div className="main-article-div">
            <div className="main-article-headline">
              <p>כותרת כתבה 2</p>
            </div>
            <div className="main-article-author">
              <p>מחבר הכתבה ומספר תגובות</p>
            </div>
          </div>
        </div>
        <div className="top-article-div2">
          <img className="main-article-img3" src={d3} alt="article 3" />
          <div className="main-article-div">
            <div className="main-article-headline">
              <p>כותרת כתבה 3</p>
            </div>
            <div className="main-article-author">
              <p>מחבר הכתבה ומספר תגובות</p>
            </div>
          </div>
        </div>
      </div>
      <div className="sidenav">
        <div>
          <Link className="sidenav-link" to="#">
            <img className="lightbulb" src={l1} alt="tip from rexi" />
          </Link>
          <Link className="sidenav-link" to="#">
            <p>טיפים ומדריכים</p>
          </Link>
        </div>
        <div>
          <Link className="sidenav-link" to="#">
            <img className="newspaper" src={l2} alt="articles pro" />
          </Link>
          <Link className="sidenav-link" to="#">
            <p>כתבות מומחים</p>
          </Link>
        </div>
        <div>
          <Link className="sidenav-link" to="#">
            <img className="pet-brush" src={l3} alt="products" />
          </Link>
          <Link className="sidenav-link" to="#">
            {' '}
            <p>מוצרים נבחרים</p>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default MainArticles;
