import React from "react";
import "./Rank.css";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="rank white f3">{`${name}, your current rank is...`}</div>
      <div className="rank white f1">{entries}</div>
    </div>
  );
};

export default Rank;
