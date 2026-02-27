import React, { useState, useEffect } from "react";
import Problem from "./problem";

//18 X 11 grid

const problemBox = ({
  problemList,
  clickProblem,
}: {
  problemList: any[];
  clickProblem: (a: any) => void;
}) => {
  //create an array of problem divs
  const probs = [];
  for (let i = 0; i < problemList.length; i++) {
    probs.push(
      <Problem
        key={problemList[i].name ?? ""}
        name={`${problemList[i].name ?? ""}`}
        setter={`${problemList[i].setter ?? ""}`}
        vGrade={`${problemList[i].vGrade ?? ""}`}
        board={`${problemList[i].board ?? ""}`}
        holds={problemList[i].holds ?? []}
        clickProblem={clickProblem}
      />,
    );
  }

  return <div className="problemBox">{probs}</div>;
};

export default problemBox;
