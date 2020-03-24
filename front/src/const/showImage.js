import React from 'react';
import { API } from '../config';

const ShowImage = ({ id, url }) => <img src={`${API}/${url}/${id}`} />;

export default ShowImage;
