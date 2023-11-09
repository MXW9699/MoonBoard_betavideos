import React from 'react';

const deleteVideo = ({ formstate }) => {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Delete Video</h1>
      <form
        className="flex"
        method="DELETE"
        action="/video/delete"
        style={{ width: '500px' }}
      >
        <input
          name="problemName"
          type="text"
          placeholder="PROBLEM NAME"
        ></input>

        <input type="submit" value="submit"></input>
        <button onClick={formstate}>cancel</button>
      </form>
    </>
  );
};

export default deleteVideo;
