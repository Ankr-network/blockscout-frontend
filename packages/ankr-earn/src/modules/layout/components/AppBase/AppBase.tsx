import {
  CssBaseline,
  MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { create, Rule } from 'jss';
import preset from 'jss-preset-default';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { ReactNode } from 'react';
import { ReactReduxContext } from 'react-redux';
import { useInitializeLocale } from 'store/useAppUtils';
import { mainTheme } from 'ui';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import '../../../../assets/fonts/style.css';

const jss = create(preset());

interface IAppBase {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBase) => {
  const isInitialized = useInitializeLocale();

  return (
    <StylesProvider jss={jss} generateClassName={createGenerateClassName()}>
      <MuiThemeProvider theme={mainTheme}>
        <CssBaseline />
        {isInitialized ? (
          <ConnectedRouter
            history={historyInstance}
            context={ReactReduxContext}
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

const createGenerateClassName = () => {
  let counter = 0;
  return (rule: Rule) =>
    `c${
      Math.random().toString(36).substring(2, 4) +
      Math.random().toString(36).substring(2, 4)
    }-${rule.key}-${counter++}`;
};
