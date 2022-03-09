import {
  CssBaseline,
  MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { create, Rule } from 'jss';
import preset from 'jss-preset-default';
import { ReactNode } from 'react';
import { ReactReduxContext } from 'react-redux';

import { mainTheme } from 'ui';

import { useRestoreConnection } from 'modules/auth/hooks/useRestoreConnection';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { useInitializeLocale } from 'store/useAppUtils';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

import '../../../../assets/fonts/style.css';

const jss = create(preset());

const createGenerateClassName = () => {
  let counter = 0;
  return (rule: Rule) => {
    const className = `c${
      Math.random().toString(36).substring(2, 4) +
      Math.random().toString(36).substring(2, 4)
    }-${rule.key}-${counter}`;
    counter += 1;

    return className;
  };
};

interface IAppBase {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBase): JSX.Element => {
  const isInitialized = useInitializeLocale();
  const conectionRestorePending = useRestoreConnection();

  return (
    <StylesProvider generateClassName={createGenerateClassName()} jss={jss}>
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
    </StylesProvider>
  );
};
