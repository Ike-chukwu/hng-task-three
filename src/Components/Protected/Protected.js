import React, { useContext } from "react";
import { AuthContext } from "../../context";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Protected;
