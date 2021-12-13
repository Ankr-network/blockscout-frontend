import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ReactNode } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { useInitializeLocale } from 'store/useAppUtils';
import '../../../../assets/fonts/style.css';
import { mainTheme } from '../../../themes/mainTheme';
import { Spinner } from 'uiKit/Spinner';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { ReactReduxContext } from 'react-redux';

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
        <Spinner />
      )}
    </MuiThemeProvider>
  );
};
