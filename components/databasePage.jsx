import React, { useEffect } from 'react';
import SideNav from './databasePage/sidenav.jsx';
import ProblemsView from './databasePage/ProblemsView.jsx';
import Popup from './forms/popup.jsx';
import { useState } from 'react';

const databasePage = () => {
  /*****************************STATES ********************************************** */
  const [openForm, setOpenForm] = useState(false); // FOR ADD AND DELETE FORMS
  const [search, setSearch] = useState(''); // FOR SEARCH BAR FILTERING
  const [data, setData] = useState(null);
  const [form, setForm] = useState('');
  const [gradeFilter, setGradeFilter] = useState({ lowest: 0, highest: 15 });

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
  const formstate = (form) => {
    setForm(form);
    setOpenForm((prev) => !prev);
  };

  const searchHandler = (e) => {
    setSearch(e.target.value.toUpperCase());
  };

  const filterData = (data) => {
    return data?.filter((problem) => {
      return (
        problem.id >= gradeFilter.lowest * 15 &&
        problem.id <= gradeFilter.highest * 15
      );
    });
  };

  let filteredData = filterData(data);
  filteredData = filteredData?.filter((problem) => {
    return problem.name.includes(search);
  });

  return (
    <div className="datapage">
      <SideNav formstate={formstate} searchHandler={searchHandler} />
      <ProblemsView data={filteredData} />
      {openForm && (
        <Popup
          option={form}
          setGradeFilter={setGradeFilter}
          gradeFilter={gradeFilter}
        />
      )}
    </div>
  );
};

export default databasePage;
