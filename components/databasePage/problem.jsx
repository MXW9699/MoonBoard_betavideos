import React from 'react';

const problem = ({ _id, grade, setter, holds, clickProblem }) => {
  return (
    <div
      className="problem"
      id={_id}
      onClick={(e) => {
        return clickProblem(_id, holds);
      }}
    >
      <span>
        <b>{_id}</b>({grade})
      </span>
    </div>
  );
};

export default problem;
