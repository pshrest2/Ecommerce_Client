import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import UpdateCategory from "./admin/UpdateCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import OrderHistory from "./admin/OrderHistory";
import SingleOrder from "./admin/SingleOrder";
import Profile from "./user/Profile";
import UpdateProduct from "./admin/UpdateProduct";
import Categories from "./admin/Categories";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/" exact component={Home} />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
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
        <AdminRoute path="/admin/orders" exact component={Orders} />
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
