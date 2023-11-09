import React from 'react';
import Hold from './hold.jsx';

const row = ({ rowID }) => {
  const LETTERS = 'ABCDEFGHIJK';

  const rowOf11 = [];
  for (let i = 0; i < 11; i++) {
    rowOf11.push(<Hold _id={`${LETTERS[i] + rowID}`} />);
  }

  return <div className="row">{rowOf11}</div>;
};

export default row;
