import { API } from '../config';

export const checkOpenAtNigth = professionalId => {
  return fetch(`${API}/calendar/night/${professionalId}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const checkOpenOnSaturday = professionalId => {
  return fetch(`${API}/calendar/saturday/${professionalId}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getCalendar = professionalId => {
  return fetch(`${API}/calendar/${professionalId}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
