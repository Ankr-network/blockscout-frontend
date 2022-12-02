import { Box } from '@material-ui/core';

import { NoReactSnap } from 'modules/common/components/NoReactSnap';
import { featuresConfig } from 'modules/common/const';
import { Container } from 'uiKit/Container';

import { DelegateStakingTokens } from './components/DelegateStakingTokens';
import { LiquidStakingTokens } from './components/LiquidStakingTokens';
import { SuspendModal } from './components/SuspendModal';

export const Main = (): JSX.Element => {
  return (
    <Box component="section" py={{ xs: 5, md: 6 }}>
      {featuresConfig.suspendBanner && (
        <NoReactSnap>
          <SuspendModal />
        </NoReactSnap>
      )}

      <Container>
        <DelegateStakingTokens />

        <LiquidStakingTokens />
      </Container>
    </Box>
  );
};
