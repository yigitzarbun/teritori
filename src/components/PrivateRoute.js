import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children, ...rest }) {
  const user = useSelector((store) => store.user);
  return (
    <Route
      {...rest}
      render={() => (user ? children : <Redirect to="/giris" />)}
    />
  );
}

export default PrivateRoute;
