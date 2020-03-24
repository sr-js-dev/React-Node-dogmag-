import React, { Fragment, useState, useEffect } from 'react';
import { GOOGLE_KEY } from '../config';
import './map.css';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from 'react-google-maps';

const Map = ({ lat, lng }) => {
  console.log('Map   lat:', lat, ' long:', lng);
  return (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: lat, lng: lng }}>
      <Marker position={{ lat: lat, lng: lng }} />
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

const MyMap = ({ closePopup, lat, lng }) => {
  const [image, setImage] = useState();

  const handleClosePopup = () => {
    closePopup();
  };
  console.log('comp lat:', lat, ' long:', lng);
  return (
    <Fragment>
      <div className="popup-container">
        <button className="btn-close" onClick={handleClosePopup}>
          X
        </button>
        <div className="popup-map">
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAEpoi-KYj13mgZs9tBKn8eHNf8ZmzKgr4`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            lat={lat}
            lng={lng}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default MyMap;
