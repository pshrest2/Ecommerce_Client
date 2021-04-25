import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

//this route is only accessible by users who are logged in
//if someone other than the authenticated users try to access this route, they will be redirecte to signin page
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
