import React, { ReactNode } from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { ReactReduxContext } from 'react-redux';

import { Spinner } from 'uiKit/Spinner';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { mainTheme } from 'ui';
import { useInitialaizeLocale } from './AppBaseUtils';
import '../../../../assets/fonts/style.css';

interface IAppBaseProps {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBaseProps) => {
  const isInitialized = useInitialaizeLocale();

  return (
    <MuiThemeProvider theme={mainTheme}>
      <CssBaseline />
      {isInitialized ? (
        <ConnectedRouter history={historyInstance} context={ReactReduxContext}>
          {children}
        </ConnectedRouter>
      ) : (
        <Spinner />
      )}
    </MuiThemeProvider>
  );
};
