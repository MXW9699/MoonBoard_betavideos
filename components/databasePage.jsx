import React from 'react';
import SideNav from './databasePage/sidenav.jsx';
import DatabaseApp from './databasePage/databaseApp.jsx';
import Popup from './forms/popup.jsx';
import { useState } from 'react';

let option = '';

const databasePage = () => {
  /*****************************STATES ********************************************** */
  const [openForm, setOpenForm] = useState(false); // FOR ADD AND DELETE FORMS
  const [search, setSearch] = useState(''); // FOR SEARCH BAR FILTERING

  /*****************************SEARCH HANDLERS ********************************************** */
  const formstate = (form = '') => {
    option = form;
    if (openForm == true) setOpenForm(false);
    else setOpenForm(true);
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <page className="datapage">
      <SideNav formstate={formstate} searchHandler={searchHandler} />
      <DatabaseApp search={search} />
      {openForm ? <Popup formstate={formstate} option={option} /> : <></>}
    </page>
  );
};

export default databasePage;
