import React from 'react';
import AddVideo from './addVideo.jsx';
import DeleteVideo from './deleteVideo.jsx';
import FilterPage from './filterPage.jsx';

const popUp = ({ formstate, option }) => {
  return (
    <div className="addVideoForm">
      {(() => {
        switch (option) {
          case 'add':
            return <AddVideo formstate={formstate} />;
          case 'delete':
            return <DeleteVideo formstate={formstate} />;
          case 'filter':
            return <FilterPage />
          default:
            null;
        }
      })()}
    </div>
  );
};

export default popUp;
