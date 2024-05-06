import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginApp from './loginApp';
import DatabasePage from './databasePage';
import ProfilePage from './ProfilePage/ProfilePage';

const app = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/data" element={<DatabasePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default app;
