import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { ThemeProvider } from './lib/theme.jsx';
import './index.css';
import './design-polish.css';

// eslint-disable-next-line no-undef
const Router = __PREVIEW__ ? HashRouter : BrowserRouter;

const application = (
  <React.StrictMode>
    <ThemeProvider initial="light">
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
const root = document.getElementById('root');
if (root.hasAttribute('data-prerendered')) ReactDOM.hydrateRoot(root, application);
else ReactDOM.createRoot(root).render(application);
