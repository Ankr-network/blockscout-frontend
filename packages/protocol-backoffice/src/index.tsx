import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import reportWebVitals from './reportWebVitals';
import IndexPage from './pages';
import { useAuthStore } from 'stores/AuthStore';

const App = () => {
  const store = useAuthStore();

  useEffect(() => {
    store.connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.StrictMode>
      <Provider>
        <BrowserRouter>
          <IndexPage />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
