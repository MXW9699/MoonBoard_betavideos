import { ChangeEvent, Dispatch, SetStateAction } from 'react';

enum V_GRADES {
  V0,
  V1,
  V2,
  V3,
  V4,
  V5,
  V6,
  V7,
  V8,
  V9,
  V10,
  V11,
  V12,
  V13,
  V14,
  V15,
  V16,
  V17,
}

enum FONT_GRADES {
  '4C' = 0,
  '5A' = 1,
  '5B' = 1,
  '5C' = 2,
  '6A' = 3,
  '6A+' = 3,
  '6B' = 4,
  '6B+' = 4,
  '6C' = 5,
  '6C+' = 5,
  '7A' = 6,
  '7A+' = 7,
  '7B' = 8,
  '7B+' = 8,
  '7C' = 9,
  '7C+' = 10,
  '8A' = 11,
  '8A+' = 12,
  '8B' = 13,
  '8B+' = 14,
  '8C' = 15,
  '8C+' = 16,
}

export type FormType = 'ADD' | 'DELETE' | 'FILTER' | null;

export interface Problem {
  id: number;
  name: string;
}

export interface ProblemProps {
  ID?: number;
  name: string;
  grade: V_GRADES | FONT_GRADES | string;
  setter: string;
  holds: any[];
  clickProblem: (a: string, b: any[]) => void;
}

export interface FormPopUpProps {
  closeForm: () => void;
  formType: FormType;
  currentFilters: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export interface Video {
  ID: number;
  link: string;
}

export interface Filter {
  maxGrade?: V_GRADES;
  minGrade?: V_GRADES;
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
