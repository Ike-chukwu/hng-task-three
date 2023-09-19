import React from "react";
import "./Error.scss";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error-bg">
      <p className="error-header">Looks like you're lost😒</p>
      <h4 className="error-status-code">404</h4>
      <Link to="/">
        <button className="btn-home">Back to home or Refresh the page</button>
      </Link>
    </div>
  );
};

export default Error;
