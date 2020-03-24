import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import rexiPro from '../icon/medal.png';
import Star from './../const/star';
import HalfStar from '../const/half-star';
import ShowImage from './../const/showImage';
import { getProfessionalCalendar } from '../action/professional';

const Professional = ({ professional, checkboxOpen }) => {
  const [professionalOpen, setProfessionalOpen] = useState(false);
  const [error, setError] = useState(false);

  const checkProfesionalOpen = () => {
    getProfessionalCalendar(professional.user).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProfessionalOpen(data);
      }
    });
  };

  useEffect(() => {
    checkProfesionalOpen();
  }, [professional]);

  const phoneFunc = phone => {
    let strThree = phone.substring(0, 3);
    let strLength = phone.length;
    let strRestNumbr = phone.substring(3, strLength);
    return (
      <h2>
        {strRestNumbr} - {strThree}
      </h2>
    );
  };

  const handleStars = avgScore => {
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
        stars.unshift(<Star color="star-red" key={i} size="star-16" />);
      } else if (broke && i === intNumber) {
        stars.unshift(<HalfStar size="star-16" key={i} />);
      } else {
        stars.unshift(<Star size="star-16" color="star" key={i} />);
      }
    }
    return stars;
  };

  const viewProfessional = () => (
    <Link to={`/professional/${professional.user}`}>
      <div className="professional-breif">
        <div className="professional-breif-mainphoto">
          <ShowImage id={professional.user} url="professional/logo" />
        </div>
        <div className="professional-breif-details">
          <div className="professional-breif-main-details">
            <div className="wrap-details-up">
              <div className="pro-headline">
                <h2>{professional.companyName}</h2>
                {professional.rexiPro ? (
                  <div className="special-rexi">
                    <img src={rexiPro} alt="rexi medal" />
                    <h3>מומחה רקסי</h3>
                  </div>
                ) : null}
              </div>
              <div className="professional-breif-about">
                {professional.about ? (
                  <p>{professional.about}</p>
                ) : (
                  <p>
                    העבודה עם כלבים הובילה אותנו להבנת צרכיו הפיזיים והמנטאליים
                    של כל כלב בפרט. אנו מאמינים בשפה משותפת עם הכלב, האילוף
                    והעבודה עם הכלב מהנים לאורך כל הדרך, לכלב ולבעלים, עד שתהיה
                    לכם שפה משותפת. השפה הייחודית לכם היא שיוצרת מערכת יחסים
                    יציבה המבוססת על אמון ומשם - הבנת המקום ההיררכי במשפחה.
                  </p>
                )}
              </div>
            </div>
            <div className="professional-review-avg">
              <div className="professional-review-avg-stars">
                {handleStars(professional.avgRating)}
              </div>
              <h3> ע"י {professional.numOfComments} מדרגים</h3>
            </div>
          </div>
          <div className="professional-breif-contact">
            <div className="professional-address">
              {professional.location ? (
                <h3>
                  {professional.location.street} {professional.location.number},{' '}
                  {professional.location.city}
                </h3>
              ) : (
                <h3>הבוסתן 67, בני ברק</h3>
              )}
              {professional.phone ? (
                phoneFunc(professional.phone)
              ) : (
                <h2>אין מספר</h2>
              )}
              {professionalOpen ? <h4>פתוח עכשיו</h4> : <h3>סגור כעת</h3>}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="all-professional">
      {checkboxOpen
        ? professionalOpen
          ? viewProfessional()
          : null
        : viewProfessional()}
    </section>
  );
};

export default Professional;
