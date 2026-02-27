import { ChangeEvent, Dispatch, SetStateAction } from "react";

export enum FONT_GRADES {
  "4C",
  "5A",
  "5B",
  "5C",
  "6A",
  "6A+",
  "6B",
  "6B+",
  "6C",
  "6C+",
  "7A",
  "7A+",
  "7B",
  "7B+",
  "7C",
  "7C+",
  "8A",
  "8A+",
  "8B",
  "8B+",
  "8C",
  "8C+",
}

export type FormType = "ADD" | "DELETE" | "FILTER" | null;

export interface Problem {
  id: number;
  name: string;
  vGrade: string;
  fontGrade?: FONT_GRADES;
  board?: string;
  videos?: VideoType[];
}

export interface ProblemProps {
  ID?: number;
  name: string;
  vGrade: string;
  setter?: string;
  holds: any[];
  clickProblem: (a: string, b: any[]) => void;
}

export interface FormPopUpProps {
  closeForm: () => void;
  formType: FormType;
  currentFilters: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export interface VideoType {
  ID: number;
  link: string;
  problemName: string;
  video: string;
  img: string;
}

export interface Filter {
  maxGrade?: number;
  minGrade?: number;
  holds?: any[];
}

export interface SideNavProps {
  formHandler: (a: FormType) => void;
  searchHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface FilterPageProps {
  currentFilters: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  closeForm: () => void;
}
