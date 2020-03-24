import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidemenu.css';

const SideMenu = () => {
  return (
    <div className="side-menu">
      <div className="side-menu-headline">
        <h2>הפרופיל האישי שלך</h2>
      </div>
      <div className="side-menu-row">
        <NavLink to="/mycompany" activeClassName="active">
          פרטי העסק
        </NavLink>

        <NavLink to="/addcalendar" activeClassName="active">
          שעות פתיחה
        </NavLink>

        <NavLink to="/addgallery" activeClassName="active">
          גלריית תמונות
        </NavLink>
      </div>
    </div>
  );
};

export default SideMenu;
