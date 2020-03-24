import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './header.css';
import logo from '../img/logo.png';
import search from '../icon/magnifying-glass.png';
import { isAuthenticated, signout } from './../action/auth';

const Header = ({ history }) => {
  const toggleDropdown = () => {
    let navbarToggle = document.getElementById('navbar-toggle');
    if (navbarToggle.className === 'topnav') {
      navbarToggle.className += ' responsive';
    } else {
      navbarToggle.className = 'topnav';
    }
  };

  return (
    <header className="header-nav">
      <div className="top-black">
        <nav className="navbar">
          <ul className="topnav" id="navbar-toggle">
            <li>
              <Link className="nav-link" to="#">
                אודות
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="#">
                פרסום באתר
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="#">
                כתבות שאהבתי
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="#">
                יצירת קשר
              </Link>
            </li>
            <li className="dropdownLink">
              <div className="dropdown-link" onClick={toggleDropdown}>
                &#9776;
              </div>
            </li>
          </ul>
          {isAuthenticated() && (
            <div className="private">
              <Link className="private-link" to="/">
                אזור אישי
              </Link>
              <span
                className="private-link"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  signout(() => {
                    history.push('/');
                  })
                }
              >
                התנתק
              </span>
            </div>
          )}
          {!isAuthenticated() && (
            <div className="private">
              <div className="register">
                <Link className="private-link" to="/login">
                  התחברות
                </Link>
                <Link className="private-link" to="/login">
                  הרשמה
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
      <div className="header-down">
        <div className="top-logo-menu">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" className="logo-rexi" />
            </Link>
          </div>
          <div className="menu">
            <ul className="menu-top">
              <li className="menu-link">
                <Link to="#">מגזין</Link>
              </li>
              <li>
                <p className="menu-line">|</p>
              </li>
              <li className="menu-link">
                <Link to="/products">מוצרים</Link>
              </li>
              <li>
                <p className="menu-line">|</p>
              </li>
              <li className="menu-link">
                <Link to="/professionals">בעלי מקצוע</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="search">
          <input className="search-box" type="text" />
          <Link className="search-link" to="#">
            <img className="search-img" src={search} alt="search icone" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
