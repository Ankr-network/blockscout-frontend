import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mainTheme } from 'ui';
import { MuiThemeProvider } from '@material-ui/core';

export const AppShell = ({ children }) => {
  return (
    <MuiThemeProvider theme={mainTheme}>
      <Router>{children}</Router>
    </MuiThemeProvider>
  );
};
