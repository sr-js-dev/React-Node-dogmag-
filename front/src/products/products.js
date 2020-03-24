import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './product.css';
import LastProduct from './last-products';
import ProductBySubject from './productsBySubject';

const Products = () => (
  <Fragment>
    <LastProduct />
    <ProductBySubject componentType="2" title="מזון וכלי אוכל" />
    <ProductBySubject componentType="1" title="היגיינה והדברה" />
    <ProductBySubject componentType="2" title="ביגוד" />
    <ProductBySubject componentType="1" title="צעצועים ומשחקים" />
    <ProductBySubject componentType="2" title="קולרים ורצועות" />
    <ProductBySubject componentType="1" title="מיטות ומלונות" />
  </Fragment>
);

export default Products;
