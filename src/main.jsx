import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { ThemeProvider } from './lib/theme.jsx';
import './index.css';

// eslint-disable-next-line no-undef
const Router = __PREVIEW__ ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider initial="light">
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
