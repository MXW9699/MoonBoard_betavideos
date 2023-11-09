import React from 'react';

const searchBar = ({ searchHandler }) => {
  return <textarea onChange={(e) => searchHandler(e)} />;
};

export default searchBar;
