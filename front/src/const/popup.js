import React, { Fragment, useState, useEffect } from 'react';
import { API } from '../config';
import './popup.css';
import { Link } from 'react-router-dom';

const Popup = ({ id, url, numOfImages, index, closePopup }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    if (index) {
      setImage(index);
    }
  }, [index]);

  const handleClosePopup = () => {
    closePopup();
  };

  const handlePrev = () => {
    if (image === 'g1') {
      console.log('8');
    } else {
      let str = image.substring(1, 2);
      let i = Number(str);
      let x = i - 1;
      setImage('g' + x);
    }
  };

  const handleNext = () => {
    if (image === 'g' + numOfImages) {
      console.log('3');
    } else {
      let str = image.substring(1, 2);
      let i = Number(str);
      let x = i + 1;
      setImage('g' + x);
    }
  };

  return (
    <Fragment>
      <div className="popup-container">
        <button className="btn-close" onClick={handleClosePopup}>
          X
        </button>
        <div className="popup-image">
          {image === 'g1' ? (
            <Link to="#">
              <div className="block-gallery">
                <p>❮</p>
              </div>
            </Link>
          ) : (
            <Link onClick={p => handlePrev()} to="#">
              <div className="prev-popup">
                <p>❮</p>
              </div>
            </Link>
          )}

          {image ? <img src={`${API}/${url}/${image}/${id}`} /> : null}

          {image === 'g' + numOfImages ? (
            <Link to="#">
              <div className="block-gallery">
                <p>❯</p>
              </div>
            </Link>
          ) : (
            <Link onClick={p => handleNext()} to="#">
              <div className="next-popup">
                <p>❯</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Popup;
