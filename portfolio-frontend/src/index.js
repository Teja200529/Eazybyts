// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './theme/themecontext'; // Make sure the file is named exactly as 'themecontext.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider> {/* Provide theme to entire app */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
