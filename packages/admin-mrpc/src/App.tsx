import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { store } from 'store';
import { AppBase } from 'modules/layout/components/AppBase/AppBase';
import { ScrollToTop } from 'modules/common/components/ScrollToTop';
import { BreadcrumbsProvider } from 'modules/layout/components/Breadcrumbs';
import 'react-toastify/dist/ReactToastify.css';
import { Routes } from './Routes';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <ToastContainer />
        <AppBase>
          <ScrollToTop />
          <BreadcrumbsProvider>
            <Routes />
          </BreadcrumbsProvider>
        </AppBase>
      </Provider>
    </Router>
  );
}

export default App;
