import { ScrollToTop } from 'modules/common/components/ScrollToTop';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
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
            <ScrollToTop />
            <Routes />
          </AppBase>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
