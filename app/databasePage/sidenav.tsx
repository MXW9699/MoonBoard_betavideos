import React, { ChangeEvent } from 'react';
import { SideNavProps } from '../types/types';

export default function SideNav({ formHandler, searchHandler}: SideNavProps) {
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
          onClick={() => formHandler('FILTER')}
        />
      </div>
      <button onClick={() => formHandler('ADD')}>ADD BETA VIDEO</button>
      <button> CREATE PROBLEM</button>
      <button onClick={() => formHandler('DELETE')}>DELETE VIDEO</button>
    </nav>
  );
}
