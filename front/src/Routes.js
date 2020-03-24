import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AdminRoute from './route/AdminRoute';
import PrivateRoute from './route/PrivateRoute';
import ProfessionalRoute from './route/ProfessionalRoute';

import Home from './home/home';
import Header from './const/header';
import Footer from './const/footer';
import Professionals from './professionals/professionals';
import Pro from './professional/pro';
import Products from './products/products';
import ProductsCategory from './products/category';
import ProductPage from './product/productPage';
import MainLogin from './login/main';
import AddProfessional from './AdminPanel/addProfessional';
import AddProfile from './ProfessionalPanel/addProfile';
import AddGallery from './ProfessionalPanel/addGallery';
import AddArea from './ProfessionalPanel/addWorkingArea';
import AddCalendar from './ProfessionalPanel/addCalendar';
import AddProfession from './AdminPanel/addProfession';
import AddProfessionalInfo from './ProfessionalPanel/addProfessionalInfo';
import { currentLocation } from './action/profession';
import { MAP_KEY } from './config';
import AddCategory from './AdminPanel/addCategory';
import AddProduct from './AdminPanel/addProduct';

function successFunction(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
}

const Routes = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async position => {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        localStorage.setItem('lat', lat);
        localStorage.setItem('long', long);
      },
      err => console.log(err)
    );
  } else {
    console.log('no');
  }
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/login" exact component={MainLogin} />
        <Route path="/" exact component={Home} />
        <Route path="/professionals" exact component={Professionals} />
        <Route path="/professional/:id" exact component={Pro} />
        <Route path="/products" exact component={Products} />
        <Route path="/category/:cat" exact component={ProductsCategory} />

        <Route path="/product/:id" exact component={ProductPage} />

        <AdminRoute
          path="/add/professional"
          exact
          component={AddProfessional}
        />

        <AdminRoute path="/add/category" exact component={AddCategory} />

        <AdminRoute path="/add/product" exact component={AddProduct} />

        <AdminRoute path="/add/profession" exact component={AddProfession} />

        <ProfessionalRoute path="/mycompany" exact component={AddProfile} />
        <ProfessionalRoute
          path="/companyinfo"
          exact
          component={AddProfessionalInfo}
        />
        <ProfessionalRoute path="/addgallery" exact component={AddGallery} />
        <ProfessionalRoute path="/addworkingarea" exact component={AddArea} />
        <ProfessionalRoute path="/addcalendar" exact component={AddCalendar} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
