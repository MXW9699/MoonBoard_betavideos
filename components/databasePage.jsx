import React from 'react';
import SideNav from './databasePage/sidenav.jsx';
import DatabaseApp from './databasePage/databaseApp.jsx';
import Popup from './forms/popup.jsx';
import { useState } from 'react';

let option = '';

const databasePage = () => {
  const [openForm, setOpenForm] = useState(false);

  const formstate = (form = '') => {
    option = form;
    if (openForm == true) setOpenForm(false);
    else setOpenForm(true);
  };

  return (
    <page className="datapage">
      <SideNav formstate={formstate} />
      <DatabaseApp />
      {openForm ? <Popup formstate={formstate} option={option} /> : <></>}
    </page>
  );
};

export default databasePage;
