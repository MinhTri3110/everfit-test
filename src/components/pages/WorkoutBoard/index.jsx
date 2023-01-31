import React, { useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { v4 as uuidv4 } from "uuid";

import Workout from "../../common/Workout";
import Exercise from "../../common/Exercise";

import { dataWorkout } from "../../../mockData/data";
import './style.css';
import { applyDrag } from "../../../utils/helper";
import moment from "moment";

const WorkoutBoard = () => {
    const [board, setBoard] = useState(dataWorkout);

    const curentDate = moment(new Date()).format('DD/MM/YYYY');
    
    const onWorkoutDrop = (indexDate, dropResult) =>  {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            const newColumnList = [...board];
            newColumnList[indexDate].workouts = applyDrag(newColumnList[indexDate].workouts, dropResult);
            setBoard(newColumnList);
        }
    }

    const onExcersiceDrop = (indexDate, indexWorkout, dropResult) =>  {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            const newColumnList = [...board];
            newColumnList[indexDate].workouts[indexWorkout].exercises = applyDrag(
                newColumnList[indexDate].workouts[indexWorkout].exercises,
                dropResult
            );
            setBoard(newColumnList);
        }
    }

    const getWorkoutPayload = (indexDate, index) => {
        return board.filter((_, i) => i === indexDate)?.[0]?.workouts?.[index];
    }

    const getExercisePayload = (indexDate, indexWorkout, index) => {
        return board?.[indexDate]?.workouts?.filter(
            (_, i) => i === indexWorkout
          )[0]?.exercises[index];
    }

    const handleAddExercise = (dateId, workoutId) => {
        const boardData = board?.map((itemDate) => {
            if (dateId === itemDate?.id) {
              const workoutData = itemDate?.workouts?.map((itemWorkout) => {
                if (workoutId === itemWorkout.id) {
                  const listExercise = itemWorkout?.exercises || [];
                  listExercise?.push({
                    id: uuidv4(),
                    name: "New Exercise",
                    set: "1x",
                    infomation: "30 lb x 10",
                  });
                  return {
                    ...itemWorkout,
                    exercises: listExercise,
                  };
                } else {
                  return itemWorkout;
                }
              });
              return { ...itemDate, workouts: workoutData };
            } else {
              return itemDate;
            }
        });
        setBoard(boardData);
    }
    
    return (
        <div className="workouts-board-wrapper">
            <div className="workouts-board-list">
                <Container>
                    {board?.map((itemDate, indexDate) => (
                        itemDate.id && 
                        <div className="column-wrapper" key={indexDate}>
                            <div className={`column ${itemDate?.fullDate === curentDate && "active"}`}>
                                <div className="column-header">{itemDate?.date}</div>
                                <div className="column-content">
                                    <div className="column-title">{itemDate?.day}</div>
                                    <Container
                                        groupName="workouts"
                                        onDrop={(e) => onWorkoutDrop(indexDate, e)}
                                        getChildPayload={(e) => getWorkoutPayload(indexDate, e)}
                                        dropPlaceholder={{                      
                                            animationDuration: 150,
                                        }}
                                        dropPlaceholderAnimationDuration={200}
                                    >
                                        {itemDate?.workouts?.map((itemWorkout, indexWorkout) => (
                                            itemWorkout?.id &&
                                            <Draggable key={indexWorkout}>
                                                <div className="card">
                                                    <Workout data={itemWorkout} addExercise={() => handleAddExercise(itemDate?.id, itemWorkout?.id)}>
                                                        <div className="card-workouts">
                                                            <Container
                                                                groupName="exercises"
                                                                onDrop={(e) => onExcersiceDrop(indexDate, indexWorkout, e)}
                                                                getChildPayload={(e) => getExercisePayload(indexDate, indexWorkout, e)}
                                                                dropPlaceholder={{                      
                                                                    animationDuration: 150,
                                                                }}
                                                                dropPlaceholderAnimationDuration={200}
                                                            >
                                                                {itemWorkout?.exercises?.map((itemExercise, indexExercise) => (
                                                                    <Draggable key={indexExercise}>
                                                                        <div className="exercises">
                                                                            {itemExercise?.id && <Exercise data={itemExercise} />}
                                                                        </div>
                                                                    </Draggable>
                                                                ))}
                                                            </Container>
                                                        </div>
                                                    </Workout>
                                                </div>
                                            </Draggable>
                                        ))}
                                    </Container>
                                </div>
                            </div>
                        </div>
                    ))}
                </Container>
            </div>
        </div>
    );
};

export default WorkoutBoard;
