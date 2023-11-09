import React from 'react';

const loginApp = () => {
  return (
    <>
      <div className="login flex">
        <h1>MitchBoard</h1>
        <h1>help me out</h1>
        <form method="POST" action="/login">
          <input name="username" type="text" placeholder="username"></input>
          <input name="password" type="password" placeholder="password"></input>
          <input className="loginbutton" type="submit" value="Login"></input>
        </form>
      </div>
    </>
  );
};

export default loginApp;
