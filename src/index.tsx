import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApplicationStore } from './App/Redux/Store';

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
