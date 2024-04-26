import React from 'react';

const deleteVideo = ({ closeForm }: { closeForm: () => void }) => {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Delete Video</h1>
      <form
        className="flex"
        method="POST"
        action="/video/delete"
        style={{ width: '500px' }}
      >
        <input
          name="problemName"
          type="text"
          placeholder="PROBLEM NAME"
        ></input>

        <input type="submit" value="submit"></input>
        <button onClick={closeForm}>cancel</button>
      </form>
    </>
  );
};

export default deleteVideo;
