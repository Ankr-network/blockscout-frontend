import React, { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { ReactReduxContext } from 'react-redux';

import { Spinner } from 'uiKit/Spinner';
import { historyInstance } from 'modules/common/utils/historyInstance';
import '../../../../assets/fonts/style.css';
import { getCurrentChainId, useInitialaizeLocale } from './AppBaseUtils';
import { getTheme } from 'modules/common/utils/getTheme';
import { ChainId } from 'domains/chains/api/chain';

interface IAppBaseProps {
  children: ReactNode;
  chainId?: ChainId;
}

export const AppBase = ({ children, chainId }: IAppBaseProps) => {
  const isInitialized = useInitialaizeLocale();

  const currentChainId = getCurrentChainId(chainId);

  return (
    <ThemeProvider theme={getTheme(currentChainId)}>
      <CssBaseline />
      {isInitialized ? (
        <ConnectedRouter history={historyInstance} context={ReactReduxContext}>
          {children}
        </ConnectedRouter>
      ) : (
        <Spinner />
      )}
    </ThemeProvider>
  );
};
