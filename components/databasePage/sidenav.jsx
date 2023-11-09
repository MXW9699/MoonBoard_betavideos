import React from 'react';
import { useState } from 'react';
import SearchBar from './inputfilter.jsx';

const sideNav = ({ formstate }) => {
  return (
    <nav className="sideNav">
      <button onClick={() => formstate('add')}>ADD BETA VIDEO</button>
      <button> CREATE PROBLEM</button>
      <button onClick={() => formstate('del')}>DELETE VIDEO</button>
      <SearchBar />
    </nav>
  );
};

export default sideNav;
