import React from 'react';

const addVideo = ({ formstate }) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>CONTRIBUTIONS</h1>
      <form
        className="flex"
        method="POST"
        action="/video/add"
        style={{ width: '500px' }}
      >
        <input name="username" type="text" placeholder="username"></input>
        <input
          name="problemName"
          type="text"
          placeholder="PROBLEM NAME"
        ></input>
        <input
          name="link"
          type="text"
          placeholder="ex. https://www.instagram.com/p/Cy7MfKbuyqs/"
        ></input>
        <input type="submit" value="submit" ></input>
        <button onClick={()=>formstate()}>cancel</button>
      </form>
    </div>
  );
};

export default addVideo;
