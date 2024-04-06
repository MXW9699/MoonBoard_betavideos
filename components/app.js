import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginApp from './loginApp.jsx';
import DatabasePage from './databasePage.jsx';

const app = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/data" element={<DatabasePage />} />
        <Route path="/" element={<LoginApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default app;
