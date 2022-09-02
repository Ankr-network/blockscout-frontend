// eslint-disable-next-line import/no-extraneous-dependencies
import '@ankr.com/global-menu/src/assets/fonts/style.css';
import { hydrate, render } from 'react-dom';

import { initGoogleGtm } from 'common';

import { initializeAnalytics } from 'modules/analytics';

import App from './App';
import reportWebVitals from './reportWebVitals';

initializeAnalytics();
initGoogleGtm();

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
