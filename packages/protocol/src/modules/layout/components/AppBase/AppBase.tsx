import { ReactNode, useMemo } from 'react';
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { ConnectedRouter } from 'connected-react-router';
import { ReactReduxContext } from 'react-redux';

import { getMainTheme } from 'uiKit/Theme/mainTheme';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { SentryErrorBoundary } from 'modules/common/components/SentryErrorBoundary';
import { useMetatags } from 'uiKit/utils/metatags';
import { usePublicChainsRoutes } from 'domains/chains/hooks/usePublicChainsRoutes';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

interface IAppBaseProps {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBaseProps) => {
  const chainsRoutes = usePublicChainsRoutes();

  const { themes } = useThemes();
  const currentTheme = useMemo(() => getMainTheme(themes), [themes]);

  useMetatags(historyInstance.location.pathname, chainsRoutes, currentTheme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <SentryErrorBoundary>
          <ConnectedRouter
            history={historyInstance}
            context={ReactReduxContext}
          >
            {children}
          </ConnectedRouter>
        </SentryErrorBoundary>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
