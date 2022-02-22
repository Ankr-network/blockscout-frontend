import React from 'react';
import { NoSsr } from '@material-ui/core';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ScrollToTop } from 'modules/common/components/ScrollToTop';
import { persistor, store } from './store';
import { Spinner } from './uiKit/Spinner';
import { AppBase } from './modules/layout/components/AppBase/AppBase';
import { Notifications } from './domains/notification/components/Notifications';
import { Routes } from './Routes';
import packageJson from '../package.json';

const { REACT_APP_CHAIN_ID } = process.env;

function App() {
  return (
    <Router basename={packageJson.homepage}>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <AppBase chainId={REACT_APP_CHAIN_ID}>
            <ScrollToTop />
            <Routes chainId={REACT_APP_CHAIN_ID} />
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
