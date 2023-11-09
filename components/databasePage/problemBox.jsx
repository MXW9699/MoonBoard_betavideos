import React, { useState, useEffect } from 'react';
import Problem from './problem.jsx';

//18 X 11 grid

const problemBox = ({ problemList, clickProblem }) => {
  //create an array of problem divs
  const probs = [];
  for (let i = 0; i < problemList.length; i++) {
    probs.push(
      <Problem
        _id={`${problemList[i].name}`}
        setter={`${problemList[i].setter}`}
        grade={`${problemList[i].grade}`}
        clickProblem={clickProblem}
      />
    );
  }

  return <div className="problemBox">{probs}</div>;
};

export default problemBox;
