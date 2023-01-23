import React, { ReactNode } from 'react';
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { ConnectedRouter } from 'connected-react-router';
import { ReactReduxContext } from 'react-redux';

import { mainTheme } from 'uiKit/Theme/mainTheme';
import { OverlaySpinner } from '@ankr.com/ui';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { SentryErrorBoundary } from 'modules/common/components/SentryErrorBoundary';
import { useInitialaizeLocale } from './AppBaseUtils';
import { useMetatags } from 'uiKit/utils/useMetatags';
import { usePublicChainsRoutes } from 'domains/chains/hooks/usePublicChainsRoutes';
import './MuiClassNameSetup';

interface IAppBaseProps {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBaseProps) => {
  const isInitialized = useInitialaizeLocale();
  const chainsRoutes = usePublicChainsRoutes();

  useMetatags(historyInstance.location.pathname, chainsRoutes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <SentryErrorBoundary>
          {isInitialized ? (
            <ConnectedRouter
              history={historyInstance}
              context={ReactReduxContext}
            >
              {children}
            </ConnectedRouter>
          ) : (
            <OverlaySpinner />
          )}
        </SentryErrorBoundary>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
