import React from 'react';
import AddVideo from './addVideo';
import DeleteVideo from './deleteVideo';
import FilterPage from './filterPage';
import { FormPopUpProps } from '../types/types';

export default function FormPopUp({ closeForm, formType }: FormPopUpProps) {
  return (
    <div className="addVideoForm">
      {(() => {
        switch (formType) {
          case 'ADD':
            return <AddVideo closeForm={closeForm} />;
          case 'DELETE':
            return <DeleteVideo closeForm={closeForm} />;
          case 'FILTER':
            return <FilterPage />;
          default:
            null;
        }
      })()}
    </div>
  );
}
