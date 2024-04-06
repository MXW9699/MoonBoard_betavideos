import React, { useEffect } from 'react';
import SideNav from './databasePage/sidenav.jsx';
import ProblemsView from './databasePage/ProblemsView.jsx';
import Popup from './forms/popup.jsx';
import { useState } from 'react';

let option = '';

const databasePage = () => {
  /*****************************STATES ********************************************** */
  const [openForm, setOpenForm] = useState(false); // FOR ADD AND DELETE FORMS
  const [search, setSearch] = useState(''); // FOR SEARCH BAR FILTERING
  const [data, setData] = useState(null);

  async function getListOfProblems() {
    try {
      const response = await fetch(`/problemList/${search}`);
      if (!response.ok) throw new Error('COULD NOT GET PROBLEM LIST');
      const data = await response.json();
      setData(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getListOfProblems();
  }, []);

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
    <div className="datapage">
      <SideNav formstate={formstate} searchHandler={searchHandler} />
      <ProblemsView data={data} />
      {openForm ? <Popup formstate={formstate} option={option} /> : <></>}
    </div>
  );
};

export default databasePage;
