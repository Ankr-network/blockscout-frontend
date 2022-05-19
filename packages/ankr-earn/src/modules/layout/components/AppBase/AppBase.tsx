import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { ReactNode } from 'react';
import { ReactReduxContext } from 'react-redux';

import { mainTheme, RewiredStylesProvider } from 'ui';

import { useRestoreConnection } from 'modules/auth/common/hooks/useRestoreConnection';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { useInitializeLocale } from 'store/useAppUtils';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

import '../../../../assets/fonts/style.css';

interface IAppBase {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBase): JSX.Element => {
  const isInitialized = useInitializeLocale();
  const conectionRestorePending = useRestoreConnection();

  return (
    <RewiredStylesProvider>
      <MuiThemeProvider theme={mainTheme}>
        <CssBaseline />

        {isInitialized && !conectionRestorePending ? (
          <ConnectedRouter
            context={ReactReduxContext}
            history={historyInstance}
          >
            {children}
          </ConnectedRouter>
        ) : (
          <QueryLoadingAbsolute />
        )}
      </MuiThemeProvider>
    </RewiredStylesProvider>
  );
};
