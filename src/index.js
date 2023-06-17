import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './store';

// NB: this file is complete - you do not to write/edit anything!

const store = configureStore();

function Root() {
  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);