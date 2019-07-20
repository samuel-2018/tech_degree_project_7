import React from "react";

const Error = props => {
  const { error, description } = props;
  return (
    <li className="error msg">
      <h3>{error}</h3>
      <p>{description}</p>
    </li>
  );
};

export default Error;
