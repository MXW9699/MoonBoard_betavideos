import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export enum V_GRADES {
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

export enum FONT_GRADES {
  '4C',
  '5A',
  '5B',
  '5C',
  '6A',
  '6A+',
  '6B',
  '6B+',
  '6C',
  '6C+',
  '7A',
  '7A+',
  '7B',
  '7B+',
  '7C',
  '7C+',
  '8A',
  '8A+',
  '8B',
  '8B+',
  '8C',
  '8C+',
}

export type FormType = 'ADD' | 'DELETE' | 'FILTER' | null;

export interface Problem {
  id: number;
  name: string;
  grade: V_GRADES | FONT_GRADES;
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
  problemName: string;
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
