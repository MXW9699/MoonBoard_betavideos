import React from 'react';

//18 X 11 grid

const videoBox = ({ source }) => {
  return <iframe className="videoBox" src={source}></iframe>;
};

export default videoBox;
