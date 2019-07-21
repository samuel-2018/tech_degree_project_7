import React from "react";
// import Photo from "./Photo";

const PhotoContainer = props => {
  // 'children' is a special React prop that gets child components.
  const { title, children } = props;

  return (
    <div className="photo-container container">
      <h2>{title}</h2>
      <ul>
        {/* Inserts component here. */}
        {children}
      </ul>
    </div>
  );
};
export default PhotoContainer;
