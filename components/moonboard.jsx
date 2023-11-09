import React from 'react';
import Row from './row.jsx';

//18 X 11 grid

const moonboard = () => {
  const theBoard = [];
  for (let i = 18; i >= 1; i--) {
    theBoard.push(<Row rowID={i} />);
  }

  return <div className="board">{theBoard}</div>;
};

export default moonboard;
