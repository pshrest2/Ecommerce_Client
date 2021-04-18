import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import UserRoute from "./auth/UserRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import UpdateCategory from "./admin/UpdateCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import OrderHistory from "./admin/OrderHistory";
import SingleOrder from "./admin/SingleOrder";
import SingleOrderUser from "./user/SingleOrder";
import Profile from "./user/Profile";
import UpdateProduct from "./admin/UpdateProduct";
import Categories from "./admin/Categories";
import UserHistory from "./user/UserHistory";
import AdminSignup from "./admin/AdminSignup";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/admin/signup" exact component={AdminSignup} />
        <Route path="/" exact component={Home} />
        <Route path="/product/:productId" exact component={Product} />
        <UserRoute path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <PrivateRoute path="/user/orderhistory" exact component={UserHistory} />
        <PrivateRoute
          path="/user/orderhistory/:orderId"
          exact
          component={SingleOrderUser}
        />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute
          path="/update/category/:categoryId"
          exact
          component={UpdateCategory}
        />
        <AdminRoute path="/update/category" exact component={Categories} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/orderhistory" exact component={OrderHistory} />
        <AdminRoute
          path="/admin/orderhistory/:orderId"
          exact
          component={SingleOrder}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
