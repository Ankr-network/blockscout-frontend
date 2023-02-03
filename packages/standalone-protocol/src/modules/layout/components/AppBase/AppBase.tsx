import React, { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { ReactReduxContext } from 'react-redux';

import { historyInstance } from 'modules/common/utils/historyInstance';
import '../../../../assets/fonts/style.css';
import {
  getCurrentChainId,
  useInitialaizeLocale,
  useSpinner,
} from './AppBaseUtils';
import { getTheme } from 'modules/common/utils/getTheme';
import { ChainId } from 'domains/chains/api/chain';
import { RewiredStylesProvider } from 'ui';
import { SentryErrorBoundary } from 'modules/common/components/SentryErrorBoundary';

interface IAppBaseProps {
  children: ReactNode;
  chainId: ChainId;
}

export const AppBase = ({ children, chainId }: IAppBaseProps) => {
  const isInitialized = useInitialaizeLocale();

  const currentChainId = getCurrentChainId(chainId);

  const spinner = useSpinner(currentChainId);

  return (
    <RewiredStylesProvider>
      <ThemeProvider theme={getTheme(currentChainId)}>
        <CssBaseline />
        <SentryErrorBoundary chainId={currentChainId}>
          {isInitialized ? (
            <ConnectedRouter
              history={historyInstance}
              context={ReactReduxContext}
            >
              {children}
            </ConnectedRouter>
          ) : (
            spinner
          )}
        </SentryErrorBoundary>
      </ThemeProvider>
    </RewiredStylesProvider>
  );
};
