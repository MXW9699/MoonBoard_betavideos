import React from 'react';

const hold = ({ _id, color }) => {
  return (
    <div
      className="hold"
      key={_id}
      onClick={() => console.log(_id)}
      style={{ backgroundColor: color }}
    >
      {_id}
    </div>
  );
};

export default hold;
