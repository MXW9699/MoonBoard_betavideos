import React from 'react';

const hold = ({ _id }) => {
  return (
    <div
      className="hold"
      key={_id}
      onClick={() => console.log(_id)}
      style={{ backgroundColor: '' }}
    >
      {_id}
    </div>
  );
};

export default hold;
