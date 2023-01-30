import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import { mainTheme } from './theme/mainTheme';

export const AppShell = ({ children }) => {
  return (
    <MuiThemeProvider theme={mainTheme}>
      <Router>{children}</Router>
    </MuiThemeProvider>
  );
};
