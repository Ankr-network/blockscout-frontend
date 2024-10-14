import 'core-js/es/object/from-entries';
import '@ankr.com/assets/public/fonts/index.css';
import '@ankr.com/cross-navigation/dist/style.css';
import { hydrate, render } from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { initGoogleGtm } from '@ankr.com/common';

import { initializeSentry } from 'modules/sentry';
import { initializeLocale } from 'modules/i18n/utils/initialize';
import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { setCanonicalTags, setRobotsTags } from 'uiKit/utils/metatags';

import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

if (!isReactSnap) {
  initializeSentry();
  // use this to initialize mixpanel from modules/analytics/mixpanel/initialize
  // initializeMixpanel();
  initGoogleGtm();
}

initializeLocale();

setCanonicalTags();
setRobotsTags();

const rootElement = document.getElementById('root');

if (rootElement?.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

// https://github.com/webpack/webpack-dev-server/issues/4540
// service worker doesn't work in dev mode

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
if (!isReactSnap) {
  serviceWorkerRegistration.register();
}
