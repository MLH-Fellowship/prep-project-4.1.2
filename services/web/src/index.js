import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from './App';

// Assets
import './index.css';

/**
 * React Strict mode allows to show warnings wherever
 * necessary and prevent failures in production mode.
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
