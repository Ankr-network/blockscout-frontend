import React, { ReactNode } from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { mainTheme, RewiredStylesProvider, Spinner } from 'ui';
import { useInitialaizeLocale } from './AppBaseUtils';

interface IAppBase {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBase): JSX.Element => {
  const isInitialized = useInitialaizeLocale();

  return (
    <RewiredStylesProvider>
      <MuiThemeProvider theme={mainTheme}>
        <CssBaseline />
        {isInitialized ? <>{children}</> : <Spinner />}
      </MuiThemeProvider>
    </RewiredStylesProvider>
  );
};
