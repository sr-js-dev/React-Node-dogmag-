import { API } from '../config';

export const addProfession = (userId, token, profession) => {
  return fetch(`${API}/profession/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: profession
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProfession = () => {
  return fetch(`${API}/professions`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const currentLocation = (myLat, myLon, myApiKey) => {
  return fetch(
    'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
      myLat +
      ',' +
      myLon +
      '&key=' +
      myApiKey +
      '&language =iw'
  ).then(response => {
    return response.json();
  });
};
