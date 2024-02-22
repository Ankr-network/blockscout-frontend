import React from 'react';
import { hydrate, render } from 'react-dom';

import { initializeMixpanel } from 'modules/analytics/initializeMixpanel';
import { initializeSentry } from 'modules/sentry';
import '@ankr.com/assets/public/fonts/index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

initializeMixpanel();
initializeSentry();

if (rootElement?.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
