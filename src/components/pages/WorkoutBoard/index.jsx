import React, { useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";

import Workout from "../../common/Workout";
import Exercise from "../../common/Exercise";

import { dataWorkout } from "../../../mockData/data";
import './style.css';
import { applyDrag } from "../../../utils/helper";

const WorkoutBoard = () => {

    const [board, setBoard] = useState([
        ...dataWorkout
    ]);

    const onColumnDrop = (dropResult) => {
        const columnList = applyDrag(board, dropResult);
        setBoard(columnList);
    }
    
    const onCardDrop = (columnId, dropResult) =>  {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            const comlumnList = [...board];
            const column = comlumnList.filter(p => p.id === columnId)[0];
            const columnIndex = comlumnList.indexOf(column);

            const newColumn = Object.assign({}, column);
            newColumn.workout = applyDrag(newColumn.workout, dropResult);
            comlumnList.splice(columnIndex, 1, newColumn);

            setBoard(comlumnList);
        }
    }

    const onSubCardDrop = (columnId, cardId, dropResult) =>  {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            const comlumnList = [...board];
            const column = comlumnList.filter(p => p.id === columnId)[0];
            const columnIndex = column.indexOf(column)
            const card = column.filter(p => p.id === cardId)[0];
            const cardIndex = column.indexOf(card);

            const newCard = Object.assign({}, card);
            newCard.exercise = applyDrag(newCard.exercise, dropResult);
            comlumnList[columnIndex]?.workout.splice(cardIndex, 1, newCard);

            setBoard(comlumnList);
        }
    }

    const getCardPayload = (columnId, index) => {
        return board.filter(p => p.id === columnId)[0].workout[
          index
        ];
    }

    const getExercisePayload = (columnId, cardId, index) => {
        const column = board.filter(p => p.id === columnId)[0].workout;
        return column.filter(p => p.id === cardId)[0].exercise[
            index
        ];
    }

    return (
        <div className="workout-board-wrapper">
            <div className="workout-board-list">
                <Container
                    orientation="horizontal"
                    onDrop={onColumnDrop}
                    dragHandleSelector=".card-column-header"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'cards-drop-preview'
                    }}
                >
                    {board?.map(item => (
                        item.id && 
                        <Draggable key={item.id}>
                            <div className="card-column">
                                <div className="card-column-header">{item?.date}</div>
                                <Container
                                    groupName="col"
                                    orientation="vertical"
                                    className="card-container"
                                    onDrop={e => onCardDrop(item.id, e)}
                                    dragClass="card-ghost"
                                    dropClass="card-ghost-drop"
                                    getChildPayload={index => getCardPayload(item.id, index)}
                                    dropPlaceholder={{                      
                                        animationDuration: 150,
                                        showOnTop: true,
                                        className: 'drop-preview' 
                                    }}
                                    dropPlaceholderAnimationDuration={200}
                                >
                                    <div className="card-column-title">{item?.day}</div>
                                    {item?.workout?.map(card => (
                                        card?.id &&
                                        <Draggable key={card?.id}>
                                            <div className="card">
                                                <Workout data={card}>
                                                    <div className="subcard-column">
                                                        <Container
                                                            groupName="sub-col"
                                                            orientation="vertical"
                                                            className="subcard-container"
                                                            onDrop={e => onCardDrop(item.id, card.id, e)}
                                                            dragClass="subcard-ghost"
                                                            dropClass="subcard-ghost-drop"
                                                            getChildPayload={index => getExercisePayload(item.id, card.id, index)}
                                                            dropPlaceholder={{                      
                                                                animationDuration: 150,
                                                                showOnTop: true,
                                                                className: 'drop-preview' 
                                                            }}
                                                            dropPlaceholderAnimationDuration={200}
                                                        >
                                                            {card?.exercise?.map(exercise => (
                                                                <Draggable key={exercise?.id}>
                                                                    <div className="exercise">
                                                                        {exercise?.id && <Exercise data={exercise} />}
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
                        </Draggable>
                    ))}
                </Container>
            </div>
        </div>
    );
};

export default WorkoutBoard;
