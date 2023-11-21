import { NoSsr } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Routes } from 'routes/Routes';

import { ScrollToTop } from 'modules/common/components/ScrollToTop';
import { Notifications } from 'domains/notification/components/Notifications';
import { AppBase } from 'modules/layout/components/AppBase/AppBase';
import { JiraServiceDeskMounter } from 'modules/common/components/JiraServiceDeskMounter';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { BreadcrumbsProvider } from 'modules/layout/components/Breadcrumbs';
import { NoReactSnap } from 'uiKit/NoReactSnap';

import { persistor, store } from './store';

function App() {
  return (
    <Router history={historyInstance}>
      <Provider store={store}>
        <PersistGate loading={<OverlaySpinner />} persistor={persistor}>
          <AppBase>
            <NoReactSnap>
              <JiraServiceDeskMounter />
            </NoReactSnap>
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
