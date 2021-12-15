import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { AppBase } from '../../src/modules/layout/components/AppBase/AppBase';
import { persistor, store } from '../../src/store';

export const AppShell = ({ children }) => {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppBase>{children}</AppBase>
        </PersistGate>
      </Provider>
    </Router>
  );
};
