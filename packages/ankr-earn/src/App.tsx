import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store';

import { Notifications } from 'modules/common/components/Notifications';
import { ScrollToTop } from 'modules/common/components/ScrollToTop';
import { Spinner } from 'uiKit/Spinner';

import packageJson from '../package.json';

import { NoReactSnap } from './modules/common/components/NoReactSnap';
import { AppBase } from './modules/layout/components/AppBase/AppBase';
import { Routes } from './Routes';

function App(): JSX.Element {
  return (
    <Router basename={packageJson.homepage}>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <AppBase>
            <ScrollToTop />

            <Routes />

            <NoReactSnap>
              <Notifications />
            </NoReactSnap>
          </AppBase>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
