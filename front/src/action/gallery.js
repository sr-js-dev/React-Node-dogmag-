import { API } from '../config';

export const updateGallery = (professionalId, userId, token, photos) => {
  return fetch(
    `${API}/professional/update/gallery/${professionalId}/${userId}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: photos
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const addGallery = (userId, token, photos) => {
  return fetch(`${API}/professional/add/gallery/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: photos
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getGallery = professionalId => {
  return fetch(`${API}/gallery/${professionalId}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getNumOfImages = professionalId => {
  return fetch(`${API}/gallery/number/${professionalId}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
