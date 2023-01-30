import React from "react";

import './style.css';

const Exercise = ({ data }) => {
  return (
    <div className="exercise-wrapper">
      <div className="exercise-title">{data?.name || ""}</div>
        <div className="exercise-info-wrapper">
            <div className="exercise-set">{data?.set || ""}</div>
            <div className="exercise-desc">{data?.infomation || ""}</div>
        </div>
    </div>
  );
};

export default Exercise;
