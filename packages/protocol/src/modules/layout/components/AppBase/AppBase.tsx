import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ConnectedRouter } from 'connected-react-router';
import { ReactNode } from 'react';
import { ReactReduxContext } from 'react-redux';

import { Dialogs } from 'modules/guardDialog';
import { SentryErrorBoundary } from 'modules/common/components/SentryErrorBoundary';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { useMetatags } from 'uiKit/utils/metatags';

import { MaintenanceDialogContainer } from './components/MaintenanceDialogContainer';
import { ReferralFlowContainer } from './components/ReferralFlowContainer';
import { ThemeProviderContainer } from './components/ThemeProviderContainer';

interface IAppBaseProps {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBaseProps) => {
  useMetatags(historyInstance.location.pathname);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProviderContainer>
        <CssBaseline />
        <ConnectedRouter history={historyInstance} context={ReactReduxContext}>
          <SentryErrorBoundary>
            {children}
            <ReferralFlowContainer />
            <Dialogs />
            <MaintenanceDialogContainer />
          </SentryErrorBoundary>
        </ConnectedRouter>
      </ThemeProviderContainer>
    </StyledEngineProvider>
  );
};
