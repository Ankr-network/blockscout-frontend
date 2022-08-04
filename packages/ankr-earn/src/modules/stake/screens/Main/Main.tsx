import { Box } from '@material-ui/core';

import { featuresConfig } from 'modules/common/const';
import { Container } from 'uiKit/Container';

import { DelegateStakingTokens } from './components/DelegateStakingTokens';
import { LiquidStakingTokens } from './components/LiquidStakingTokens';

export const Main = (): JSX.Element => {
  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Container>
        {featuresConfig.ankrStaking && <DelegateStakingTokens />}

        <LiquidStakingTokens />
      </Container>
    </Box>
  );
};
