import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { ReactNode } from 'react';
import { ReactReduxContext } from 'react-redux';
import { useInitializeLocale } from 'store/useAppUtils';
import { mainTheme } from 'ui';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import '../../../../assets/fonts/style.css';

interface IAppBase {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBase) => {
  const isInitialized = useInitializeLocale();

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
