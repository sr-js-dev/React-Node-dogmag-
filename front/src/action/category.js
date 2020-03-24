import { API } from '../config';

export const addCategory = async (userId, token, catName, prices) => {
  try {
    const res = await fetch(`${API}/category/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ catName, prices })
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};
