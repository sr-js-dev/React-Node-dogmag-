import React, { Fragment, useEffect, useState } from 'react';
import './pro.css';
import ProDetails from './proDetails';
import ProGallery from './proGallery';
import ProArticles from './proArticles';
import ProReview from './proReview';

import { getProfile } from '../action/professional';
import { getNumOfImages } from './../action/gallery';

const Pro = ({ match }) => {
  const [professional, setProfessional] = useState([]);
  const [error, setError] = useState(false);
  const [newReview, setNewReview] = useState(false);

  const init = () => {
    getProfile(match.params.id).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProfessional(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, [match.params.id]);

  const handleAddReview = async a => {
    setNewReview(true);
    await init();
  };

  return (
    <Fragment>
      <ProDetails
        name={professional.companyName}
        userId={professional.user}
        phone={professional.phone}
        location={professional.location}
        rexiPro={professional.rexiPro}
        about={professional.about}
        arabic={professional.Arabic}
        english={professional.English}
        Handicap={professional.Handicap}
        avgScore={professional.avgRating}
        numOfReviwer={professional.numOfComments}
      />
      <ProGallery professionalId={professional.user} />
      <ProArticles />
      <ProReview
        name={professional.companyName}
        professionalId={professional.user}
        comments={professional.comments}
        handleAddReview={p => handleAddReview(p)}
      />
    </Fragment>
  );
};
export default Pro;
