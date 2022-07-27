import { NoSsr } from '@material-ui/core';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { ScrollToTop } from 'modules/common/components/ScrollToTop';
import { Spinner } from 'ui';
import { Notifications } from './domains/notification/components/Notifications';
import { AppBase } from './modules/layout/components/AppBase/AppBase';
import { Routes } from './Routes';
import { persistor, store } from './store';

import { ZendeskMounter } from 'modules/common/components/ZendeskMounter';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { BreadcrumbsProvider } from 'modules/layout/components/Breadcrumbs';

function App() {
  return (
    <Router history={historyInstance}>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <AppBase>
            <ZendeskMounter />
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
