import React from "react";

import add from "../../../assets/icons/add.svg";

import './style.css';

const Workout = ({ data, children, addExercise }) => {
  return (
    <div className="workout-wrapper">
        <div className="workout-info">
            <div className="workout-title">{data?.name || ""}</div>
            <div className="workout-actions"><span /><span /><span /></div>
        </div>
        {children}
        <div className="workout-add-exercise"><img onClick={() => addExercise()} src={add} alt="" /></div>
    </div>
  );
};

export default Workout;
