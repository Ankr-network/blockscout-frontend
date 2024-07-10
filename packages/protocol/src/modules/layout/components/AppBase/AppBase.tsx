import { ReactNode, useMemo } from 'react';
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { ConnectedRouter } from 'connected-react-router';
import { ReactReduxContext } from 'react-redux';

import { Dialogs } from 'modules/guardDialog';
import {
  ReferralFlow,
  useReferralFlow,
} from 'modules/referralProgram/components/ReferralFlow';
import { SentryErrorBoundary } from 'modules/common/components/SentryErrorBoundary';
import { getMainTheme } from 'uiKit/Theme/mainTheme';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { useMetatags } from 'uiKit/utils/metatags';
import { usePublicChainsRoutes } from 'domains/chains/hooks/usePublicChainsRoutes';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { MaintenanceDialog } from '../MaintenanceDialog';
import { useMaintenanceDialog } from '../MaintenanceDialog/useMaintenanceDialog';

interface IAppBaseProps {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBaseProps) => {
  const chainsRoutes = usePublicChainsRoutes();

  const { themes } = useThemes();
  const currentTheme = useMemo(() => getMainTheme(themes), [themes]);

  useMetatags(historyInstance.location.pathname, chainsRoutes, currentTheme);

  const { isOpened, onClose } = useMaintenanceDialog();

  const { referralFlowProps } = useReferralFlow();

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
            <ReferralFlow {...referralFlowProps} />
          </ConnectedRouter>
          <Dialogs />
          <MaintenanceDialog isOpened={isOpened} onClose={onClose} />
        </SentryErrorBoundary>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
