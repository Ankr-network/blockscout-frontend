import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store';

import { NoReactSnap } from 'modules/common/components/NoReactSnap';
import { ScrollToTop } from 'modules/common/components/ScrollToTop';
import { Zendesk } from 'modules/common/components/Zendesk';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { Spinner } from 'uiKit/Spinner';

import { AppBase } from './modules/layout/components/AppBase/AppBase';
import { Routes } from './Routes';

function App(): JSX.Element {
  return (
    <Router history={historyInstance}>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <AppBase>
            <ScrollToTop />

            <Routes />

            <NoReactSnap>
              <Zendesk />
            </NoReactSnap>
          </AppBase>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
