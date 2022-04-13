import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './App';
import { reportWebVitals } from './reportWebVitals';
import { initializeSentry } from 'modules/sentry';

// eslint-disable-next-line import/no-extraneous-dependencies
import '@ankr.com/global-menu/src/assets/fonts/style.css';

initializeSentry();

const rootElement = document.getElementById('root');

if (rootElement?.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
