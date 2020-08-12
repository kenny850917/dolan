import React from "react";
import "./image.scss";

const Image = (props) => {
  return (
    <div>
      <img
        className="image-res"
        src="http://via.placeholder.com/500x500"
        alt="Card image cap"
      />
    </div>
  );
};

export default Image;
