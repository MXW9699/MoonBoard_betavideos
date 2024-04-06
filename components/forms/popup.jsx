import React from 'react';
import AddVideo from './addVideo.jsx';
import DeleteVideo from './deleteVideo.jsx';

const popUp = ({ formstate, option }) => {
  return (
    <div className="addVideoForm">
      {(option === "add")? <AddVideo formstate={formstate}/>: <DeleteVideo formstate={formstate}/>}
    </div>
  );
};

export default popUp;
