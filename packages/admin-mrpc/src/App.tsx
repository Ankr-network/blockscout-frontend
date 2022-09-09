import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import { Spinner } from 'ui';
import { persistor, store } from 'store';
import { AppBase } from 'modules/layout/components/AppBase/AppBase';
import { ScrollToTop } from 'modules/common/components/ScrollToTop';
import 'react-toastify/dist/ReactToastify.css';
import { Routes } from './Routes';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <ToastContainer />
          <AppBase>
            <ScrollToTop />
            <Routes />
          </AppBase>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
