import { ScrollToTop } from 'modules/common/components/ScrollToTop';
import { currentEnv } from 'modules/common/const';
import { Env } from 'modules/common/types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { DevOverlayFix } from 'ui';
import { AppBase } from './modules/layout/components/AppBase/AppBase';
import { Routes } from './Routes';
import { persistor, store } from './store';
import { Spinner } from './uiKit/Spinner';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <AppBase>
            {/* todo: remove when the issue will be resolved */}
            {currentEnv !== Env.Production && <DevOverlayFix />}
            <ScrollToTop />
            <Routes />
          </AppBase>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
