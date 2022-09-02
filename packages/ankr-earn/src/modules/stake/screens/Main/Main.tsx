import { Box } from '@material-ui/core';

import { Container } from 'uiKit/Container';

import { DelegateStakingTokens } from './components/DelegateStakingTokens';
import { LiquidStakingTokens } from './components/LiquidStakingTokens';

export const Main = (): JSX.Element => {
  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Container>
        <DelegateStakingTokens />

        <LiquidStakingTokens />
      </Container>
    </Box>
  );
};
