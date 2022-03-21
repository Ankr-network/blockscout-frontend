import React from 'react';
import { NoSsr } from '@material-ui/core';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';

import { ScrollToTop } from 'modules/common/components/ScrollToTop';
import { persistor, store } from './store';
import { Spinner } from 'ui';
import { AppBase } from './modules/layout/components/AppBase/AppBase';
import { Notifications } from './domains/notification/components/Notifications';
import { Routes } from './Routes';

import { BreadcrumbsProvider } from 'modules/layout/components/Breadcrumbs';
import { historyInstance } from 'modules/common/utils/historyInstance';

function App() {
  return (
    <Router history={historyInstance}>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <AppBase>
            <ScrollToTop />
            <BreadcrumbsProvider>
              <Routes />
            </BreadcrumbsProvider>
            <NoSsr>
              <Notifications />
            </NoSsr>
          </AppBase>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
