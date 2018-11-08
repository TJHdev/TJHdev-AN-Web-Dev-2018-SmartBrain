import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxs }) => {
  const boxsItems =
    boxs && boxs[0] ? (
      boxs.map(box => (
        <div
          key={box.topRow}
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol
          }}
        />
      ))
    ) : (
      <div />
    );

  return (
    <div className="center me">
      <div className="absolute mt2">
        <img
          id="inputimage"
          alt=""
          src={imageUrl}
          width="500px"
          height="auto"
        />
        {boxsItems}
      </div>
    </div>
  );
};

export default FaceRecognition;
