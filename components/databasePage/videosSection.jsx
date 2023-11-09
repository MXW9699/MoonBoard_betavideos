import React from 'react';
import VideoBox from './videoBox.jsx';

//18 X 11 grid

const videoSection = ({ vids }) => {
  //create an array of problem divs
  const vidbox = [];
  for (let i = 0; i < vids.length; i++) {
    vidbox.push(<VideoBox source={vids[i].link} />);
  }
  for (let i = 0; i < 5; i++) {
    vidbox.push(
      <VideoBox source={'https://www.instagram.com/reel/Cwl4gVio7bP/embed'} />
    );
  }

  return <div className="videoSection">{vidbox}</div>;
};

export default videoSection;
