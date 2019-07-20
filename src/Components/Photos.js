import React from "react";
import Photo from "./Photo";
import Loading from "./Loading";

const Photos = props => {
  const { data } = props;
  if (data.length !== 0) {
    return (
      <>
        {data.map(imageData => (
          <Photo key={imageData.id} imageData={imageData} />
        ))}
      </>
    );
  } else {
    // Shown when loading topics.
    return <Loading />;
  }
};

export default Photos;
