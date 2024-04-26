import React from 'react';
import { ProblemProps } from '../types/types';

const problem = (props: ProblemProps) => {
  return (
    <div
      className="problem"
      id={props.name}
      onClick={() => {
        return props.clickProblem(props.name, props.holds);
      }}
    >
      <span>
        <b>{props.name}</b>({props.grade})
      </span>
    </div>
  );
};

export default problem;
