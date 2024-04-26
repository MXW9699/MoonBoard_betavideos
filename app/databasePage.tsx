import React, { ChangeEvent, useEffect } from 'react';
import SideNav from './databasePage/sidenav';
import ProblemsView from './databasePage/ProblemsView';
import FormPopup from './forms/FormPopUp';
import { useState } from 'react';
import { FormType, Problem } from './types/types';

const databasePage = () => {
  /*****************************STATES ********************************************** */
  const [openForm, setOpenForm] = useState(false); // FOR ADD AND DELETE FORMS
  const [search, setSearch] = useState(''); // FOR SEARCHBAR FILTERING
  const [data, setData] = useState<Problem[]>([]);
  const [form, setForm] = useState<FormType>(null);
  const [filters, setFilter] = useState(null);

  async function getListOfProblems(): Promise<void> {
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
  function formHandler(form: FormType): void {
    setForm(form);
    setOpenForm((prev) => !prev);
  }

  function searchHandler(e: ChangeEvent<HTMLTextAreaElement>): void {
    setSearch(e.target.value.toUpperCase());
  }

  function filterData(data: Problem[]): Problem[] {
    return data?.filter((problem) => {
      return problem.id > 30;
    });
  }

  let filteredData = filterData(data);
  // console.log(filteredData);

  filteredData = filteredData?.filter((problem) => {
    return problem.name.includes(search);
  });

  return (
    <div className="datapage">
      <SideNav formHandler={formHandler} searchHandler={searchHandler} />
      <ProblemsView data={filteredData} />
      {openForm && (
        <FormPopup
          closeForm={() => {
            setOpenForm(false);
          }}
          formType={form}
        />
      )}
    </div>
  );
};

export default databasePage;
