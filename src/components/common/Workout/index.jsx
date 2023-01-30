import React from "react";

import actions from "../../../assets/icons/actions.svg";
import add from "../../../assets/icons/add.svg";

import './style.css';

const Workout = ({ data, children }) => {
  return (
    <div className="workout-wrapper">
        <div className="workout-info">
            <div className="workout-title">{data?.name || ""}</div>
            <div className="workout-actions"><img src={actions} alt="" /></div>
        </div>
        {children}
        <div className="workout-add-exercise"><img src={add} alt="" /></div>
    </div>
  );
};

export default Workout;
