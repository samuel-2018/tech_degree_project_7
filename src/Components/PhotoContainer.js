import React from "react";
import Photo from "./Photo";

const PhotoContainer = props => {
  const { data, query } = props;
  if (data.length !== 0) {
    // console.log(data);

    return (
      <div className="photo-container">
        <h2>{query}</h2>
        <ul>
          {data.map(imageData => (
            <Photo key={imageData.id} imageData={imageData} />
          ))}
        </ul>
      </div>
    );
  } else {
    // May be shown when loading topics.
    return "Loading";
  }
};
export default PhotoContainer;
