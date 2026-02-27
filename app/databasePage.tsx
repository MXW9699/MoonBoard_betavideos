import React, { ChangeEvent, useEffect } from "react";
import SideNav from "./UI Components/sidenav";
import ProblemsView from "./databasePage/ProblemsView";
import FormPopup from "./forms/FormPopUp";
import { useState } from "react";
import { FONT_GRADES, Filter, FormType, Problem } from "./types/types";

const ASC = 1;
const DESC = -1;

const databasePage = () => {
  /*****************************STATES ********************************************** */
  const [openForm, setOpenForm] = useState(false); // FOR ADD AND DELETE FORMS
  const [search, setSearch] = useState(""); // FOR SEARCHBAR FILTERING
  const [data, setData] = useState<Problem[]>([]);
  const [form, setForm] = useState<FormType>(null);
  const [filters, setFilter] = useState<Filter>({ maxGrade: 17, minGrade: 0 });
  const [primarySort, setPrimarySort] = useState<[string, number] | null>(null);
  const [secondarySort, setSecondarySort] = useState<[string, number] | null>(
    null,
  );

  async function getListOfProblems(): Promise<void> {
    try {
      const response = await fetch(`/problemList/${search}`);
      if (!response.ok) throw new Error("COULD NOT GET PROBLEM LIST");
      const data: Problem[] = await response.json();
      const sortedData = data.sort((a: Problem, b: Problem) => {
        if (a.vGrade === b.vGrade) return a.name.localeCompare(b.name);
        else return a.vGrade.localeCompare(b.vGrade);
      });
      setData(sortedData);
    } catch (e) {
      console.log(e);
    }
  }

  function sortBy(sortBy: "name" | "vGrade"): void {
    console.log("sorting by:", sortBy);
    if (primarySort === null && secondarySort === null) {
      setPrimarySort([sortBy, ASC]);
    } else if (primarySort !== null && secondarySort === null) {
      if (sortBy === primarySort[0]) {
        setPrimarySort([sortBy, primarySort[1] * -1]);
      } else {
        setSecondarySort([sortBy, ASC]);
      }
    } else if (primarySort !== null && secondarySort !== null) {
      if (sortBy === primarySort[0]) {
        setPrimarySort([sortBy, primarySort[1] * -1]);
      } else if (sortBy === secondarySort[0]) {
        setSecondarySort([sortBy, secondarySort[1] * -1]);
      }
    }
  }
  //get list of problems of first render
  useEffect(() => {
    getListOfProblems();
    return () => {};
  }, []);

  useEffect(() => {
    if (!primarySort) return;
    setData((prevData) =>
      [...prevData].sort((a: Problem, b: Problem) => {
        if (
          a[primarySort[0] as keyof Problem] ===
            b[primarySort[0] as keyof Problem] &&
          secondarySort
        ) {
          return (
            (a[secondarySort[0] as keyof Problem] as string).localeCompare(
              b[secondarySort[0] as keyof Problem] as string,
            ) * secondarySort[1]
          );
        }
        return (
          (a[primarySort[0] as keyof Problem] as string).localeCompare(
            b[primarySort[0] as keyof Problem] as string,
          ) * primarySort[1]
        );
      }),
    );
  }, [primarySort, secondarySort]);
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
    return data?.filter((problem: Problem) => {
      return (
        parseInt(problem.vGrade) >= filters.minGrade! &&
        parseInt(problem.vGrade) <= filters.maxGrade!
      );
    });
  }

  let filteredData = filterData(data);

  filteredData = filteredData?.filter((problem) => {
    if (search === "") return true;
    return problem.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="datapage">
      <SideNav formHandler={formHandler} searchHandler={searchHandler} />
      <button>MoonBoard 2016</button>
      <button>MoonBoard 2019</button>
      <button>TensionBoard</button>
      <button>TB2Spray</button>
      <button>TB2Mirror</button>
      <input
        type="checkbox"
        onChange={() => sortBy("name")}
        name="Sort by name"
      />
      <input
        type="checkbox"
        onChange={() => sortBy("vGrade")}
        name="Sort by vGrade"
      />
      <ProblemsView data={data} />
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
