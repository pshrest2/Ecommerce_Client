import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

//authorization component for only admins
//if other users try to access this route, they will be re-routed to signin page
const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() && isAuthenticated().user.role === 1 ? (
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

export default AdminRoute;
