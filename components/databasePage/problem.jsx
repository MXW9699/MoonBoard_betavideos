import React from 'react';

const problem = ({ _id, grade, setter, clickProblem }) => {
  return (
    <div
      className="problem"
      id={_id}
      onClick={(e) => {
        return clickProblem(_id);
      }}
    >
      <span>
        <b>{_id}</b>({grade})
      </span>
      <p style={{ margin: '0px' }}>{setter}</p>
    </div>
  );
};

export default problem;
