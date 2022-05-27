// eslint-disable-next-line import/no-extraneous-dependencies
import '@ankr.com/global-menu/src/assets/fonts/style.css';
import React from 'react';
import { hydrate, render } from 'react-dom';

import { initializeAnalytics } from 'modules/analytics';

import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

initializeAnalytics();

if (rootElement?.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
