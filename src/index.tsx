import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App/App';
import { BrowserRouter } from 'react-router-dom';
import { ApplicationStore } from './App/redux/Store';
import { Provider } from 'react-redux';

const Application = () => (
  <React.StrictMode>
    <Provider store={ApplicationStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
