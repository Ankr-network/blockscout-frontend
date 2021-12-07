import { BrowserRouter as Router } from 'react-router-dom';
import { AppBase } from './modules/layout/components/AppBase/AppBase';
import { Routes } from './Routes';

function App() {
  return (
    <Router>
      <AppBase>
        <Routes />
      </AppBase>
    </Router>
  );
}

export default App;
