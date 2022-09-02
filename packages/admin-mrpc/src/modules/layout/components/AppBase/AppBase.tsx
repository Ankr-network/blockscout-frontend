import React, { ReactNode } from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { mainTheme, RewiredStylesProvider, Spinner } from 'ui';
import { useInitialaizeLocale } from './AppBaseUtils';
import { ConnectButton } from 'modules/auth/components/ConnectButton';

interface IAppBase {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBase): JSX.Element => {
  const isInitialized = useInitialaizeLocale();

  return (
    <RewiredStylesProvider>
      <MuiThemeProvider theme={mainTheme}>
        <CssBaseline />
        {isInitialized ? (
          <>
            <ConnectButton />
            {children}
          </>
        ) : (
          <Spinner />
        )}
      </MuiThemeProvider>
    </RewiredStylesProvider>
  );
};
