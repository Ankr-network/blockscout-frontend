import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { ReactNode } from 'react';
import { ReactReduxContext } from 'react-redux';
import { useInitializeLocale } from 'store/useAppUtils';
import { Spinner } from 'uiKit/Spinner';
import '../../../../assets/fonts/style.css';
import { mainTheme } from '../../../themes/mainTheme';

interface IAppBaseProps {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBaseProps) => {
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
