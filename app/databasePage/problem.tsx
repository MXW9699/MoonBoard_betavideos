import React from "react";
import { ProblemProps } from "../types/types";

const problem = (props: ProblemProps) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="problem"
      id={props.name}
      onClick={() => {
        return props.clickProblem(props.name, props.holds);
      }}
    >
      <span>
        <b>{props.name}</b>({props.vGrade ?? ""})
      </span>
      {props.board ?? ""}
    </div>
  );
};

export default problem;
