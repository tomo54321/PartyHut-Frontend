import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App/App';
import { BrowserRouter } from 'react-router-dom';

const Application = () => (
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
