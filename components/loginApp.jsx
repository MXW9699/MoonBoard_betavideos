import React from 'react';

const loginApp = () => {
  return (
    <>
      <h1>help me out</h1>
      <form method="POST" action="/login">
        <input name="username" type="text" placeholder="username"></input>
        <input name="password" type="password" placeholder="password"></input>
        <input type="submit" value="login"></input>
      </form>
    </>
  );
};

export default loginApp;
