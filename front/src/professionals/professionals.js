import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './professionals.css';
import CheckboxFilterArea from './checkboxFilterArea';
import ProfessionalsType from './professionalsType';
import Professional from './Professional';

import { getDistricts, getFiltersProfessionals } from '../action/professional';

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [error, setError] = useState(false);
  const [area, setArea] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: {
      worksArea: [],
      companyProfession: {},
      open: false,
      rexiPro: false,
      comment: false,
      openAtNight: false,
      openOnSaturday: false,
      arabic: false,
      english: false,
      handicap: false
    }
  });
  const [filteredResults, setFilteredResults] = useState([]);

  const loadProfessionalByTime = () => {
    getFiltersProfessionals().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProfessionals(data.data);
      }
    });
  };
  const loadArea = () => {
    getDistricts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setArea(data);
      }
    });
  };

  useEffect(() => {
    loadArea();
    loadProfessionalByTime();
  }, []);

  const loadFilterProfessional = async newFilters => {
    const data = await getFiltersProfessionals(newFilters);
    if (typeof data === 'undefined' || data.error) setError('error');
    else {
      setFilteredResults(data.data);
      setProfessionals(data.data);
    }
  };
  const handleChecked = (filters, filterBy) => {
    if (filters === 'empty') {
      handleCancleProfession();
    } else {
      const newFilters = { ...myFilters };
      newFilters.filters[filterBy] = filters;
      loadFilterProfessional(myFilters.filters);
    }
  };

  const handleCancleProfession = () => {
    const newFilters = { ...myFilters };
    newFilters.filters['companyProfession'] = null;
    newFilters.filters['companyProfession'] = {};
    loadFilterProfessional(myFilters.filters);
  };

  const handleChackbox = filtersBy => {
    if (myFilters.filters[filtersBy]) {
      myFilters.filters[filtersBy] = false;
    } else {
      myFilters.filters[filtersBy] = true;
    }

    loadFilterProfessional(myFilters.filters);
  };

  function distance(
    xis1: number,
    yis1: number,
    xis2: number,
    yis2: number
  ): number {
    const toRadian = n => (n * Math.PI) / 180;
    let lat2 = xis2;
    let lon2 = yis2;
    let lat1 = xis1;
    let lon1 = yis1;
    let R = 6371; // km
    let x1 = lat2 - lat1;
    let dLat = toRadian(x1);
    let x2 = lon2 - lon1;
    let dLon = toRadian(x2);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadian(lat1)) *
        Math.cos(toRadian(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;
  }

  const handelTopFilters = async e => {
    let params, data, name;
    name = e.currentTarget.name;
    let lat = parseFloat(localStorage.getItem('lat'));
    let long = parseFloat(localStorage.getItem('long'));

    if (name === 'filterdistance') {
      let sortedProffesionalsLocations = professionals.sort((a, b) => {
        return distance(
          lat,
          long,
          a.location.geo.coordinates[1],
          a.location.geo.coordinates[0]
        ) >
          distance(
            lat,
            long,
            b.location.geo.coordinates[1],
            b.location.geo.coordinates[0]
          )
          ? 1
          : distance(
              lat,
              long,
              b.location.geo.coordinates[1],
              b.location.geo.coordinates[0]
            ) >
            distance(
              lat,
              long,
              a.location.geo.coordinates[1],
              a.location.geo.coordinates[0]
            )
          ? -1
          : 0;
      });

      setProfessionals(sortedProffesionalsLocations);
    } else if (name === 'filtername') {
      let sortedProffesionals = professionals.sort((a, b) =>
        a.companyName > b.companyName
          ? 1
          : b.companyName > a.companyName
          ? -1
          : 0
      );
      setProfessionals(sortedProffesionals);
    } else if (name === 'filterscore') {
      let sortedProffesionalsByScore = professionals.sort((a, b) =>
        a.avgRating > b.avgRating ? 1 : b.avgRating > a.avgRating ? -1 : 0
      );
      setProfessionals(sortedProffesionalsByScore);
    }
  };
  return (
    <Fragment>
      <ProfessionalsType
        handleChecked={p => handleChecked(p, 'companyProfession')}
      />
      <section className="sort-proffesionals">
        <div className="headline-sort">
          <p>סדר לפי:</p>
          <Link to="#" name="filterscore" onClick={e => handelTopFilters(e)}>
            דירוג
          </Link>
          <p>|</p>
          <Link to="#" name="filterdistance" onClick={e => handelTopFilters(e)}>
            מרחק
          </Link>
          <p>|</p>
          <Link to="#" name="filtername" onClick={e => handelTopFilters(e)}>
            שם
          </Link>
        </div>
      </section>
      <section className="main-professionals">
        <div className="container-main-professionals">
          <div className="filter-pro">
            <h1>
              {myFilters.filters.companyProfession &&
              myFilters.filters.companyProfession !== 'null' &&
              Object.keys(myFilters.filters.companyProfession).length !== 0 ? (
                <div className="filter-title">
                  <h1>{myFilters.filters.companyProfession.professionName}</h1>
                  <div
                    className="close-filter-profession"
                    onClick={handleCancleProfession}
                  >
                    &#10006;
                  </div>
                </div>
              ) : null}
            </h1>

            <div className="store-open">
              <label className="container-checkbox">
                <input type="checkbox" onClick={p => handleChackbox('open')} />
                <span className="checkmark"></span>
                <p>פתוח עכשיו</p>
              </label>
            </div>
            <div className="area">
              <h4>איזור:</h4>

              <ul className="professionals-area">
                <CheckboxFilterArea
                  districts={area}
                  handleChecked={p => handleChecked(p, 'worksArea')}
                />
              </ul>
            </div>
            <div className="sort">
              <h4>סינונים נוספים:</h4>
              <ul className="professionals-area">
                <li className="container-li">
                  <label className="container-checkbox">
                    <input
                      type="checkbox"
                      onClick={p => handleChackbox('rexiPro')}
                    />
                    <span className="checkmark"></span>
                    <p>מומחי רקסי</p>
                  </label>
                </li>
                <li className="container-li">
                  <label className="container-checkbox">
                    <input
                      type="checkbox"
                      onClick={p => handleChackbox('comment')}
                    />
                    <span className="checkmark"></span>
                    <p>חוות דעת</p>
                  </label>
                </li>
                <li className="container-li">
                  <label className="container-checkbox">
                    <input
                      type="checkbox"
                      onClick={p => handleChackbox('openAtNight')}
                    />
                    <span className="checkmark"></span>
                    <p>פתוח בלילה</p>
                  </label>
                </li>
                <li className="container-li">
                  <label className="container-checkbox">
                    <input
                      type="checkbox"
                      onClick={p => handleChackbox('openOnSaturday')}
                    />
                    <span className="checkmark"></span>
                    <p>פתוח בשבת</p>
                  </label>
                </li>
                <li className="container-li">
                  <label className="container-checkbox">
                    <input
                      type="checkbox"
                      onClick={p => handleChackbox('arabic')}
                    />
                    <span className="checkmark"></span>
                    <p>שירות בשפה הערבית</p>
                  </label>
                </li>
                <li className="container-li">
                  <label className="container-checkbox">
                    <input
                      type="checkbox"
                      onClick={p => handleChackbox('english')}
                    />
                    <span className="checkmark"></span>
                    <p>שירות בשפה האנגלית</p>
                  </label>
                </li>
                <li className="container-li">
                  <label className="container-checkbox">
                    <input
                      type="checkbox"
                      onClick={p => handleChackbox('handicap')}
                    />
                    <span className="checkmark"></span>
                    <p>נגישות לאנשים עם מוגבלות</p>
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className="display-pro">
            {professionals ? (
              professionals.map((p, i) => (
                <div key={i}>
                  <Professional
                    professional={p}
                    checkboxOpen={myFilters.filters.open}
                  />
                </div>
              ))
            ) : (
              <p>טוען...</p>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Professionals;
