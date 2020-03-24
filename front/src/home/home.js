import React, { Fragment } from 'react';

import MainArticles from './mainArticles';
import BestProfessional from './professional';
import LastArticles from './articles';
import LastProduct from './products';

import './home.css';

const Home = () => (
  <Fragment>
    <MainArticles />
    <BestProfessional />
    <LastArticles />
    <LastProduct />
  </Fragment>
);

export default Home;
