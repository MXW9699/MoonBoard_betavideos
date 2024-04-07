import React from 'react';

const sideNav = ({ formstate, searchHandler }) => {
  return (
    <nav className="sideNav">
      <h1 style={{ color: 'white', textAlign: 'center', margin: '1px' }}>
        Moonboard Videos
      </h1>
      <div>
        <textarea
          onChange={(e) => searchHandler(e)}
          placeholder="Search Problems..."
        />
        <img
          src="/build/filter.svg"
          width={`35px`}
          height={'35px'}
          onClick={() => formstate('filter')}
        />
      </div>
      <button onClick={() => formstate('add')}>ADD BETA VIDEO</button>
      <button> CREATE PROBLEM</button>
      <button onClick={() => formstate('delete')}>DELETE VIDEO</button>
    </nav>
  );
};

export default sideNav;
