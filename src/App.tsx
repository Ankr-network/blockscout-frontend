import React from 'react';
import { NoSsr } from '@material-ui/core';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ScrollToTop } from 'modules/common/components/ScrollToTop';
import { persistor, store } from './store';
import { QueryLoadingAbsolute } from './modules/common/components/QueryLoading/QueryLoading';
import { AppBase } from './modules/layout/components/AppBase/AppBase';
import { Notifications } from './modules/notification/components/Notifications';
import { Routes } from './Routes';
import packageJson from '../package.json';

function App() {
  return (
    <Router basename={packageJson.homepage}>
      <Provider store={store}>
        <PersistGate loading={<QueryLoadingAbsolute />} persistor={persistor}>
          <AppBase>
            <ScrollToTop />
            <Routes />
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
