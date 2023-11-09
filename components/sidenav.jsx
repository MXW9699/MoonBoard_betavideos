import React from 'react';
import { useState } from 'react';

const sideNav = ({ formstate }) => {
  return (
    <nav className="sideNav">
      <button onClick={formstate}>add beta video</button>
      <button> create problem</button>
      <button>account settings</button>
    </nav>
  );
};

export default sideNav;
