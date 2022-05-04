import React from 'react';
import { NoSsr } from '@material-ui/core';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';

import { ScrollToTop } from 'modules/common/components/ScrollToTop';
import { persistor, store } from './store';
import { Spinner } from './uiKit/Spinner';
import { AppBase } from './modules/layout/components/AppBase/AppBase';
import { Notifications } from './domains/notification/components/Notifications';
import { Routes } from './Routes';
import { ChainId } from 'domains/chains/api/chain';
import { historyInstance } from 'modules/common/utils/historyInstance';

const { REACT_APP_CHAIN_ID } = process.env;

function App() {
  return (
    <Router history={historyInstance}>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <AppBase chainId={REACT_APP_CHAIN_ID as ChainId}>
            <ScrollToTop />
            <Routes chainId={REACT_APP_CHAIN_ID as ChainId} />
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
