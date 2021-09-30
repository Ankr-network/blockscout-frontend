import React, { ReactNode } from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { ReactReduxContext } from 'react-redux';

import '../../../../assets/fonts/style.css';

import { QueryLoadingAbsolute } from '../../../common/components/QueryLoading/QueryLoading';
import { historyInstance } from '../../../common/utils/historyInstance';
import { mainTheme } from '../../../themes/mainTheme';
import { useInitialaizeLocale } from './AppBaseUtils';

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
        <QueryLoadingAbsolute />
      )}
    </MuiThemeProvider>
  );
};
