import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { DevOverlayFix } from 'ui';

import { ScrollToTop } from 'modules/common/components/ScrollToTop';
import { AppBase } from 'modules/layout/components/AppBase';
import { ErrorBoundary } from 'modules/common/components/ErrorBoundary';
import { isDev } from 'modules/common/utils/isProd';
import { store } from './store';
import { Routes } from './Routes';
import packageJson from '../package.json';

function App() {
  return (
    <ErrorBoundary>
      <Router basename={packageJson.homepage}>
        <Provider store={store}>
          <AppBase>
            {/* todo: remove when the issue will be resolved */}
            {isDev() && <DevOverlayFix />}
            <ScrollToTop />
            <Routes />
          </AppBase>
        </Provider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
