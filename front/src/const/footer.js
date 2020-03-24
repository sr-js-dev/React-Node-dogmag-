import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './footer.css';
import youtube from '../icon/youtube.svg';
import facebook from '../icon/facebook.svg';

const Footer = () => (
  <footer className="footer">
    <div className="container-footer">
      <div className="footer-section">
        <Link to="#" className="footer-link">
          ראשי
        </Link>
        <Link to="#" className="footer-link">
          אודות רקסי
        </Link>
        <Link to="#" className="footer-link">
          כתבות מגזין
        </Link>
        <Link to="#" className="footer-link">
          בעלי מקצוע
        </Link>
        <Link to="#" className="footer-link">
          מוצרים לכלב
        </Link>
        <Link to="#" className="footer-link">
          טיפים ומדריכים
        </Link>
      </div>
      <div className="footer-section">
        <Link to="#" className="footer-link">
          פרסום באתר
        </Link>
        <Link to="#" className="footer-link">
          תקנון שימוש
        </Link>
        <Link to="#" className="footer-link">
          יצירת קשר
        </Link>
      </div>
      <div className="footer-section">
        <Link to="#" className="footer-link">
          רקסי - מגזין אינטרנט לבעלי כלבים
        </Link>
        <Link to="#" className="footer-link">
          כל הזכויות שמורות
        </Link>
        <div className="rexi-social">
          <Link to="#" className="footer-link">
            <img src={youtube} alt="youtube" />
          </Link>
          <Link to="#" className="footer-link">
            <img src={facebook} alt="facebook" />
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default withRouter(Footer);
