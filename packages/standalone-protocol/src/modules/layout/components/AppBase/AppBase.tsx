import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { ReactReduxContext } from 'react-redux';

import 'assets/fonts/style.css';
import { getTheme } from 'modules/common/utils/getTheme';
import { ChainId } from 'domains/chains/api/chain';
import { SentryErrorBoundary } from 'modules/common/components/SentryErrorBoundary';
import { RewiredStylesProvider } from 'modules/themes/components/RewiredStylesProvider';
import { historyInstance } from 'modules/common/utils/historyInstance';

import { getCurrentChainId } from './AppBaseUtils';

interface IAppBaseProps {
  children: ReactNode;
  chainId: ChainId;
}

export const AppBase = ({ children, chainId }: IAppBaseProps) => {
  const currentChainId = getCurrentChainId(chainId);

  return (
    <RewiredStylesProvider>
      <ThemeProvider theme={getTheme(currentChainId)}>
        <CssBaseline />
        <SentryErrorBoundary chainId={currentChainId}>
          <ConnectedRouter
            history={historyInstance}
            context={ReactReduxContext}
          >
            {children}
          </ConnectedRouter>
        </SentryErrorBoundary>
      </ThemeProvider>
    </RewiredStylesProvider>
  );
};
