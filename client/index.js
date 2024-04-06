import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../components/app.js';

const root = createRoot(document.getElementById('root'));

root.render(<App />);