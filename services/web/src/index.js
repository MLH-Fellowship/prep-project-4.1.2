import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from './App';

// Assets
import './index.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
