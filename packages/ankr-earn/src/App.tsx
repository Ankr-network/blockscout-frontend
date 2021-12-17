import { NoSsr } from '@material-ui/core';
import { Notifications } from 'modules/common/components/Notifications';
import { ScrollToTop } from 'modules/common/components/ScrollToTop';
import { AppBase } from 'modules/layout/components/AppBase/AppBase';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store';
import { Spinner } from 'uiKit/Spinner';
import { Routes } from './Routes';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
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
