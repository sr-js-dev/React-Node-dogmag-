import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import rexiMedal from '../icon/medal.png';
import proLocaion from '../icon/map-location.png';
import ShowImage from './../const/showImage';
import { checkOpenAtNigth, checkOpenOnSaturday } from '../action/calendar';
import Star from '../const/star';
import HalfStar from './../const/half-star';
import { getCalendar } from './../action/calendar';

import MyMap from './../const/googleMap';

const ProDetails = ({
  name,
  userId,
  phone,
  location,
  rexiPro,
  about,
  arabic,
  english,
  handicap,
  avgScore,
  numOfReviwer
}) => {
  const [openAtNight, setOpenAtNight] = useState(false);
  const [openOnSaturday, setOpenOnSaturday] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [error, setError] = useState(false);
  const [openMap, setOpenMap] = useState(false);

  const checkProfesionalOpenAtNight = () => {
    checkOpenAtNigth(userId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setOpenAtNight(data);
      }
    });
  };

  const checkProfesionalOpenOnSaturday = () => {
    checkOpenOnSaturday(userId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setOpenOnSaturday(data);
      }
    });
  };

  const loadCalendar = () => {
    getCalendar(userId).then(data => {
      if (data.error) {
        console.log('error', data);
        setError(data.error);
      } else {
        setCalendar(data);
      }
    });
  };

  useEffect(() => {
    if (userId) {
      loadCalendar();
      checkProfesionalOpenAtNight();
      checkProfesionalOpenOnSaturday();
    }
  }, [userId]);

  const phoneFunc = phone => {
    let strThree = phone.substring(0, 3);
    let strLength = phone.length;
    let strRestNumbr = phone.substring(3, strLength);
    return (
      <Link to="#" href={`tel:phone`}>
        <h2>
          {strRestNumbr} - {strThree}
        </h2>
      </Link>
    );
  };

  const handleStars = () => {
    let broke = true;
    let intNumber;
    let stars = [];
    if (Number.isInteger(avgScore)) {
      broke = false;
      intNumber = avgScore;
    } else {
      intNumber = Math.floor(avgScore);
    }

    for (let i = 4; i >= 0; i--) {
      if (i < intNumber) {
        stars.unshift(<Star color="star-red" key={i} size="star-24" />);
      } else if (broke && i === intNumber) {
        stars.unshift(<HalfStar size="star-24" key={i} />);
      } else {
        stars.unshift(<Star size="star-24" color="star" key={i} />);
      }
    }
    return stars;
  };

  const handleCalendarHours = (open, close) => {
    return (
      <p>
        {open}-{close}
      </p>
    );
  };

  const handleGoogleMaps = () => {
    setOpenMap(true);
  };

  const closePopup = () => {
    setOpenMap(false);
  };

  return (
    <section className="professional-details">
      <div className="professional-container">
        <div className="professional-image">
          {userId ? <ShowImage id={userId} url="professional/logo" /> : null}
        </div>
        <div className="professional-details-wrap">
          <div className="professionals-headline">
            <h1>{name}</h1>
            {rexiPro ? (
              <div className="pro-special-rexi">
                <img src={rexiMedal} alt="rexi medal" />
                <h3>מומחה רקסי</h3>
              </div>
            ) : null}
          </div>
          {about ? (
            <div className="professional-detail">
              <p>{about}</p>
            </div>
          ) : null}

          <div className="pro-options">
            <ul>
              {openOnSaturday ? <li>פתוח בשבת</li> : null}
              {openAtNight ? <li>פתוח בלילה</li> : null}
              {arabic ? <li>שירות בשפה הערבית</li> : null}
              {english ? <li>שירות בשפה האנגלית</li> : null}
              {handicap ? <li>נגישות לאנשים עם מוגבלות</li> : null}
            </ul>
          </div>
          <div className="pro-details-review">
            <div className="pro-details-review-stars">{handleStars()}</div>
            <h3>ע"י {numOfReviwer} מדרגים</h3>
          </div>
        </div>
        <div className="pro-hour-open">
          <table>
            <tbody>
              <tr>
                <th className="day">א:</th>
                {calendar &&
                calendar.sunday &&
                calendar.sunday.openA &&
                calendar.sunday.closeA ? (
                  <th className="hour">
                    {handleCalendarHours(
                      calendar.sunday.openA,
                      calendar.sunday.closeA
                    )}
                  </th>
                ) : (
                  <th className="hour">סגור</th>
                )}

                {calendar &&
                calendar.sunday &&
                calendar.sunday.openB &&
                calendar.sunday.closeB ? (
                  <th className="hour">
                    {handleCalendarHours(
                      calendar.sunday.openB,
                      calendar.sunday.closeB
                    )}
                  </th>
                ) : null}
              </tr>
              <tr>
                <th className="day">ב:</th>
                {calendar &&
                calendar.monday &&
                calendar.monday.openA &&
                calendar.monday.closeA ? (
                  <th className="hour">
                    {handleCalendarHours(
                      calendar.monday.openA,
                      calendar.monday.closeA
                    )}
                  </th>
                ) : (
                  <th className="hour">סגור</th>
                )}

                {calendar &&
                calendar.monday &&
                calendar.monday.openB &&
                calendar.monday.closeB ? (
                  <th className="hour">
                    {handleCalendarHours(
                      calendar.monday.openB,
                      calendar.monday.closeB
                    )}
                  </th>
                ) : null}
              </tr>
              <tr>
                <th className="day">ג:</th>
                {calendar &&
                calendar.tuesday &&
                calendar.tuesday.openA &&
                calendar.tuesday.closeA ? (
                  <th className="hour">
                    {handleCalendarHours(
                      calendar.tuesday.openA,
                      calendar.tuesday.closeA
                    )}
                  </th>
                ) : (
                  <th className="hour">סגור</th>
                )}

                {calendar &&
                calendar.tuesday &&
                calendar.tuesday.openB &&
                calendar.tuesday.closeB ? (
                  <th className="hour">
                    {handleCalendarHours(
                      calendar.tuesday.openB,
                      calendar.tuesday.closeB
                    )}
                  </th>
                ) : null}
              </tr>
              <tr>
                <th className="day">ד:</th>
                {calendar &&
                calendar.wednesday &&
                calendar.wednesday.openA &&
                calendar.wednesday.closeA ? (
                  <th className="hour">
                    {handleCalendarHours(
                      calendar.wednesday.openA,
                      calendar.wednesday.closeA
                    )}
                  </th>
                ) : (
                  <th className="hour">סגור</th>
                )}

                {calendar &&
                calendar.wednesday &&
                calendar.wednesday.openB &&
                calendar.wednesday.closeB ? (
                  <th className="hour">
                    {handleCalendarHours(
                      calendar.wednesday.openB,
                      calendar.wednesday.closeB
                    )}
                  </th>
                ) : null}
              </tr>
              <tr>
                <th className="day">ה:</th>
                {calendar &&
                calendar.thursday &&
                calendar.thursday.openA &&
                calendar.thursday.closeA ? (
                  <th className="hour">
                    {handleCalendarHours(
                      calendar.thursday.openA,
                      calendar.thursday.closeA
                    )}
                  </th>
                ) : (
                  <th className="hour">סגור</th>
                )}

                {calendar &&
                calendar.thursday &&
                calendar.thursday.openB &&
                calendar.thursday.closeB ? (
                  <th className="hour">
                    {handleCalendarHours(
                      calendar.thursday.openB,
                      calendar.thursday.closeB
                    )}
                  </th>
                ) : null}
              </tr>
              <tr>
                <th className="day">ו:</th>
                {calendar &&
                calendar.friday &&
                calendar.friday.openA &&
                calendar.friday.closeA ? (
                  <th className="hour">
                    {handleCalendarHours(
                      calendar.friday.openA,
                      calendar.friday.closeA
                    )}
                  </th>
                ) : (
                  <th className="hour">סגור</th>
                )}

                {calendar &&
                calendar.friday &&
                calendar.friday.openB &&
                calendar.friday.closeB ? (
                  <th className="hour">
                    {handleCalendarHours(
                      calendar.sunday.openB,
                      calendar.sunday.closeB
                    )}
                  </th>
                ) : null}
              </tr>
              <tr>
                <th className="day">ש:</th>
                {calendar &&
                calendar.saturday &&
                calendar.saturday.openA &&
                calendar.saturday.closeA ? (
                  <th className="hour">
                    {handleCalendarHours(
                      calendar.saturday.openA,
                      calendar.saturday.closeA
                    )}
                  </th>
                ) : (
                  <th className="hour">סגור</th>
                )}

                {calendar &&
                calendar.saturday &&
                calendar.saturday.openB &&
                calendar.saturday.closeB ? (
                  <th className="hour">
                    {handleCalendarHours(
                      calendar.saturday.openB,
                      calendar.saturday.closeB
                    )}
                  </th>
                ) : null}
              </tr>
            </tbody>
          </table>

          <div className="pro-address">
            <div className="pro-location">
              <Link to="#" onClick={p => handleGoogleMaps()}>
                <img src={proLocaion} alt="location" />

                <h3>
                  {location && location.street ? location.street : null}{' '}
                  {location && location.number ? location.number : null},{' '}
                  {location && location.city ? location.city : null}
                </h3>
              </Link>
            </div>
            {phone ? phoneFunc(phone) : <h2>אין מספר</h2>}
          </div>
        </div>
      </div>
      {openMap ? (
        <MyMap
          closePopup={p => closePopup(p)}
          lng={location.geo.coordinates[0]}
          lat={location.geo.coordinates[1]}
        />
      ) : null}
    </section>
  );
};

export default ProDetails;
