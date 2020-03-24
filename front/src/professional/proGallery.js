import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../config';

import ShowImage from './../const/showImage';
import { getNumOfImages } from './../action/gallery';
import Popup from './../const/popup';

const ProGallery = ({ professionalId }) => {
  const [imageActive, setImageActive] = useState({
    left: 'g3',
    middle: 'g2',
    right: 'g1'
  });
  const [gallery, setGallery] = useState();
  const [error, setError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeIndex, setActiveIndex] = useState(false);

  const loadGallery = () => {
    console.log('load gallery for: ', professionalId);
    getNumOfImages(professionalId).then(data => {
      console.log('data: ', data);
      if (data.error) {
        console.log('error', data);
        setError(data.error);
      } else {
        setGallery(data);
      }
    });
  };

  useEffect(() => {
    if (professionalId) {
      loadGallery();
    }
  }, [professionalId]);

  const handlePrev = () => {
    if (imageActive.left === 'g1') {
      console.log('8');
    } else {
      let str = imageActive.left.substring(1, 2);
      let i = Number(str);
      let x = i - 1;
      let y = i - 2;
      let z = i - 3;
      setImageActive({ left: 'g' + x, middle: 'g' + y, right: 'g' + z });
    }
  };

  const handleNext = () => {
    if (imageActive.right === 'g' + gallery) {
      console.log('3');
    } else {
      let str = imageActive.right.substring(1, 2);
      let i = Number(str);
      let x = i + 3;
      let y = i + 2;
      let z = i + 1;
      setImageActive({ left: 'g' + x, middle: 'g' + y, right: 'g' + z });
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handlePopup = index => {
    setShowPopup(true);
    setActiveIndex(index);
  };
  return (
    <Fragment>
      <div className="last-article-hedline">
        <h2>גלריית תמונות</h2>
      </div>
      <section className="gallery">
        <div className="gallery-container">
          <div className="gallery-slider 1">
            {professionalId ? (
              <Link to="#" onClick={p => handlePopup(imageActive.right)}>
                <ShowImage
                  id={professionalId}
                  url={'professional/gallery/' + imageActive.right}
                />
              </Link>
            ) : null}

            {gallery && imageActive.right === 'g1' ? (
              <Link to="#">
                <div className="block-gallery">
                  <p>❮</p>
                </div>
              </Link>
            ) : (
              <Link onClick={p => handlePrev()} to="#">
                <div className="prev">
                  <p>❮</p>
                </div>
              </Link>
            )}
          </div>

          <div className="gallery-slider 2">
            {professionalId ? (
              <Link to="#" onClick={p => handlePopup(imageActive.middle)}>
                <ShowImage
                  id={professionalId}
                  url={'professional/gallery/' + imageActive.middle}
                />
              </Link>
            ) : null}
          </div>
          <div className="gallery-slider 3">
            {professionalId ? (
              <Link to="#" onClick={p => handlePopup(imageActive.left)}>
                <ShowImage
                  id={professionalId}
                  url={'professional/gallery/' + imageActive.left}
                />
              </Link>
            ) : null}
            {imageActive.left === 'g' + gallery ? (
              <Link to="#">
                <div className="block-gallery">
                  <p>❯</p>
                </div>
              </Link>
            ) : (
              <Link onClick={p => handleNext()} to="#">
                <div className="next">
                  <p>❯</p>
                </div>
              </Link>
            )}
          </div>
        </div>
        {showPopup ? (
          <Popup
            id={professionalId}
            url={'professional/gallery'}
            numOfImages={gallery}
            index={activeIndex}
            closePopup={p => closePopup(p)}
          />
        ) : null}
      </section>
    </Fragment>
  );
};

export default ProGallery;
