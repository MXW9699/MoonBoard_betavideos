import React from 'react';
import Hold from './hold.jsx';

const row = ({ rowID, boardLights }) => {
  const LETTERS = 'ABCDEFGHIJK';

  const rowOf11 = [];
  //if the
  for (let i = 0; i < 11; i++) {
    //create the ALPHA-NUM id of the hold
    const holdID = `${LETTERS[i] + rowID}`;
    //color update if hold ID matches
    // console.log('from row', boardLights.has(holdID));
    const color = boardLights.has(holdID) ? 'Blue' : '';
    rowOf11.push(<Hold _id={holdID} color={color} />);
  }

  return <div className="row">{rowOf11}</div>;
};

export default row;
