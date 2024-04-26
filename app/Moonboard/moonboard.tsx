import React from 'react';
import Row from './row';

//18 X 11 grid

const moonboard = ({ boardLights }: { boardLights: any }) => {
  const theBoard = [];
  for (let i = 18; i >= 1; i--) {
    theBoard.push(<Row key={`row${i}`} rowID={i} boardLights={boardLights} />);
  }

  return <div className="board">{theBoard}</div>;
};

export default moonboard;
