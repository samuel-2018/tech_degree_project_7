import React from "react";

const Photo = props => {
  return (
    <li>
      <figure>
        <img
          src={props.imageData.urls.small}
          alt={props.imageData.description}
        />

        {/* Creates a layer for inset shadow.*/}
        <div className="shadow-inset" />

        <figcaption>
          <a className="img-link" href={props.imageData.urls.full}>
            Photo
          </a>{" "}
          by{" "}
          <a className="img-link" href={props.imageData.user.links.html}>
            {props.imageData.user.name}
          </a>{" "}
          on Unsplash
        </figcaption>
      </figure>

      <div />
    </li>
  );
};

export default Photo;
