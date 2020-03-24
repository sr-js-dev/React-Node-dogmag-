import { API } from '../config';
import axios from 'axios';

export const getDistricts = () => {
  return fetch(`${API}/districts`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getProfile = userId => {
  return fetch(`${API}/professional/profile/${userId}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// export const getFliterProfession = params => {
//   console.log('params:', JSON.stringify(params));
//   return fetch(`${API}/professionalsfilter/${JSON.stringify(params)}`, {
//     method: 'GET'
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };

export const getFliterProfession = async params => {
  console.log(params);
  let res = await axios.post(`${API}/professionalsfilter`, { params });
  return res.data;
};

export const getProfessionalCalendar = professionalId => {
  return fetch(`${API}/calendar/check/${professionalId}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const addProfesional = async (
  userId,
  token,
  companyId,
  companyName,
  professionsSelected
) => {
  try {
    const res = await fetch(`${API}/professional/profile/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ companyId, companyName, professionsSelected })
    });

    const { status } = res;

    if (status === 401) {
      return 401;
    }
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateProfile = (professionalId, userId, token, profile) => {
  return fetch(`${API}/professional/profile/${professionalId}/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: profile
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateInfo = (professionalId, userId, token, profile) => {
  console.log('profile: ', profile);
  return fetch(
    `${API}/professional/updateprofile/${professionalId}/${userId}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(profile)
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateGallery = (professionalId, userId, token, photos) => {
  return fetch(
    `${API}/professional/profile/gallery/${professionalId}/${userId}`,
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

export const addArea = async (userId, token, professionalId, areaSelected) => {
  try {
    const res = await fetch(
      `${API}/professional/addArea/${professionalId}/${userId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ areaSelected })
      }
    );

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const addComment = async (
  userId,
  token,
  professionalId,
  comment,
  score
) => {
  try {
    const res = await fetch(
      `${API}/professional/addcomment/${professionalId}/${userId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ comment, score })
      }
    );
    return res.json();
  } catch (err) {
    console.log('err:', err);
  }
};

export const updateCalendar = async (
  userId,
  token,
  professionalId,
  workingHours
) => {
  try {
    const res = await fetch(
      `${API}/update/calendar/${professionalId}/${userId}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ workingHours })
      }
    );

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const addCalendar = async (
  userId,
  token,
  professionalId,
  workingHours
) => {
  try {
    const res = await fetch(`${API}/add/calendar/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ workingHours })
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getProfessionals = () => {
  return fetch(`${API}/professionals`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getProfessional = id => {
  return fetch(`${API}/professional/${id}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getFiltersProfessionals = filters => {
  return fetch(`${API}/professionals/by/search`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(filters)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
