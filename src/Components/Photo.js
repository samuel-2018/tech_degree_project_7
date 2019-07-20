import React from "react";

const Photo = props => {
  return (
    <li>
      <img src={props.imageData.urls.small} alt={props.imageData.description} />
      <div />
    </li>
  );
};

export default Photo;
