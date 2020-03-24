import React, { Fragment } from 'react';
import ProductSum from './productSum';
import ProductArticle from './productArticle';
import RelativeProduct from './relativeProduct';
import ProReview from '../professional/proReview';

const ProductPage = () => (
  <Fragment>
    <ProductSum />
    <ProductArticle />
    <RelativeProduct />
    <ProReview />
  </Fragment>
);

export default ProductPage;
