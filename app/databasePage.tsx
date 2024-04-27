import React, { ChangeEvent, useEffect } from 'react';
import SideNav from './databasePage/sidenav';
import ProblemsView from './databasePage/ProblemsView';
import FormPopup from './forms/FormPopUp';
import { useState } from 'react';
import { Filter, FormType, Problem } from './types/types';

const databasePage = () => {
  /*****************************STATES ********************************************** */
  const [openForm, setOpenForm] = useState(false); // FOR ADD AND DELETE FORMS
  const [search, setSearch] = useState(''); // FOR SEARCHBAR FILTERING
  const [data, setData] = useState<Problem[]>([]);
  const [form, setForm] = useState<FormType>(null);
  const [filters, setFilter] = useState<Filter>({ maxGrade: 17, minGrade: 0 });

  async function getListOfProblems(year: string): Promise<void> {
    try {
      const response = await fetch(`/problemList/${search}`);
      if (!response.ok) throw new Error('COULD NOT GET PROBLEM LIST');
      const data: Problem[] = await response.json();
      setData(data);
    } catch (e) {
      console.log(e);
    }
  }

  //get list of problems of first render
  useEffect(() => {
    getListOfProblems('2019');
  }, []);

  /*****************************SEARCH HANDLERS ********************************************** */
  //opens form of the specifed form type
  function formHandler(form: FormType): void {
    setForm(form);
    setOpenForm((prev) => !prev);
  }

  //updates the search state
  function searchHandler(e: ChangeEvent<HTMLTextAreaElement>): void {
    setSearch(e.target.value.toUpperCase());
  }

  //TODO: FILTER DATA BASED ON THE FILTER STATE
  function filterData(data: Problem[]): Problem[] {
    return data?.filter((problem) => {
      return problem.id > 30;
    });
  }

  let filteredData = filterData(data);

  filteredData = filteredData?.filter((problem) => {
    return problem.name.includes(search);
  });

  return (
    <div className="datapage">
      <SideNav formHandler={formHandler} searchHandler={searchHandler}/>
      <ProblemsView data={filteredData} />
      {openForm && (
        <FormPopup
        currentFilters={filters}
        setFilter={setFilter}
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
