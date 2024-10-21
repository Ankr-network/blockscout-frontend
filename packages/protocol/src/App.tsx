import { NoSsr } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { AppRouter } from 'routes/AppRouter';

import { AppBase } from 'modules/layout/components/AppBase/AppBase';
import { BreadcrumbsProvider } from 'modules/layout/components/BreadcrumbsProvider';
import { Notifications } from 'domains/notification/components/Notifications';
import { ScrollToTop } from 'modules/common/components/ScrollToTop';
import { SupportPortalButton } from 'modules/common/components/SupportPortalButton';
import { historyInstance } from 'modules/common/utils/historyInstance';

import { persistor, store } from './store';

function App() {
  return (
    <Router history={historyInstance}>
      <Provider store={store}>
        <PersistGate loading={<OverlaySpinner />} persistor={persistor}>
          <AppBase>
            <ScrollToTop />
            <BreadcrumbsProvider>
              <AppRouter />
            </BreadcrumbsProvider>
            <NoSsr>
              <Notifications />
            </NoSsr>
            <SupportPortalButton />
          </AppBase>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
