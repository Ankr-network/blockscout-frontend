import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import { Spinner } from 'ui';
import { persistor, store } from 'store';
import { AppBase } from 'modules/layout/components/AppBase/AppBase';
import { ScrollToTop } from 'modules/common/components/ScrollToTop';
import { BreadcrumbsProvider } from 'modules/layout/components/Breadcrumbs';
import 'react-toastify/dist/ReactToastify.css';
import { Routes } from './Routes';

import packageJson from '../package.json';

function App() {
  return (
    <Router basename={packageJson.homepage}>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <ToastContainer />
          <AppBase>
            <ScrollToTop />
            <BreadcrumbsProvider>
              <Routes />
            </BreadcrumbsProvider>
          </AppBase>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
