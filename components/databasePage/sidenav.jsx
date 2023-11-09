import React from 'react';
import SearchBar from './inputfilter.jsx';

const sideNav = ({ formstate, searchHandler }) => {
  return (
    <nav className="sideNav">
      <button onClick={() => formstate('add')}>ADD BETA VIDEO</button>
      <button> CREATE PROBLEM</button>
      <button onClick={() => formstate('del')}>DELETE VIDEO</button>
      <textarea onChange={(e) => searchHandler(e)} />;
    </nav>
  );
};

export default sideNav;
