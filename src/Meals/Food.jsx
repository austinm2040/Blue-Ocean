import React, { useState } from 'react';
import styled from 'styled-components';
import {IconContext} from 'react-icons';
import {FiPlus, FiMinus} from 'react-icons/fi';
import AddAFoodItem from './AddAFoodItem.jsx';

const Wrap = styled.div``;
const Dropdown = styled.div``;

function Food (props) {
  const [clicked, setClicked] = useState(false);
  const toggle = (i) => {
    if (clicked === i) {
      return setClicked(null);
    }
    setClicked(i);
  }
  return (
    <div>
      <IconContext.Provider value={{color: 'rgb(73, 73, 73)', size: '25px', fontWeight: 'bold'}}>
        {props.food.map((food, i) => {
          return (
          <div key={i} className="exerciseCard">
            <Wrap key={i} style={{'display' : 'flex'}}>
              <div className="eContainer">
              <div className="exerciseItem">
                <div onClick={() => {toggle(i)}} className="symbol1"><span>{clicked === i ? <FiMinus /> : <FiPlus />}</span></div>
                <div><h2>{food.foodName.toUpperCase()}</h2></div>
              </div>
              <div className="actionItems" style={{display: 'flex'}}>
                <div>
                  {/* <WorkoutCheck getWorkouts={props.getWorkouts} _id={exercise._id} checked={exercise.checked} /> */}
                </div>
                <div className="remove">
                  {/* <RemoveExercise getWorkouts={props.getWorkouts} _id={exercise['_id']}/> */}
                </div>
              </div>
              </div>
            </Wrap>
            <div>
            {clicked === i ? (
            <Dropdown>
              <div className="dropDown">
                <hr/>
                <p>Description: {exercise.description}</p>
                <p>Calories burned: {exercise.calories}</p>
              </div>
            </Dropdown>
            ) : null}
            </div>
          </div>
          )
        })}
      </IconContext.Provider>
      <AddAFoodItem />
    </div>
  )
}

export default Food;