import React, { ReactNode } from 'react';
import {
  CssBaseline,
  MuiThemeProvider,
  createGenerateClassName,
  StylesProvider,
} from '@material-ui/core';
import { mainTheme, Spinner } from 'ui';
import { useInitialaizeLocale } from './AppBaseUtils';

interface IAppBase {
  children: ReactNode;
}

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

export const AppBase = ({ children }: IAppBase): JSX.Element => {
  const isInitialized = useInitialaizeLocale();

  return (
    <StylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={mainTheme}>
        <CssBaseline />
        {isInitialized ? <>{children}</> : <Spinner />}
      </MuiThemeProvider>
    </StylesProvider>
  );
};
