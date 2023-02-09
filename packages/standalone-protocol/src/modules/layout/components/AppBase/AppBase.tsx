import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { ReactReduxContext } from 'react-redux';

import { historyInstance } from 'modules/common/utils/historyInstance';
import '../../../../assets/fonts/style.css';
import { getCurrentChainId } from './AppBaseUtils';
import { getTheme } from 'modules/common/utils/getTheme';
import { ChainId } from 'domains/chains/api/chain';
import { RewiredStylesProvider } from 'ui';
import { SentryErrorBoundary } from 'modules/common/components/SentryErrorBoundary';

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