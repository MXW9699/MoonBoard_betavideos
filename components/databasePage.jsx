import React from 'react';
import SideNav from './sidenav.jsx';
import DatabaseApp from './databasePage/databaseApp.jsx';
import AddVideoForm from './forms/addVideo.jsx';
import { useState } from 'react';

const databasePage = () => {
  const [openForm, setOpenForm] = useState(false);

  const formstate = () => {
    if (openForm == true) setOpenForm(false);
    else setOpenForm(true);
  };

  return (
    <page className="datapage">
      <SideNav formstate={formstate} />
      <DatabaseApp />
      {openForm ? <AddVideoForm formstate={formstate} /> : <></>}
    </page>
  );
};

export default databasePage;
