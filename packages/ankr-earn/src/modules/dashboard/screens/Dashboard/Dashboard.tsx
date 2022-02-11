import { Box } from '@material-ui/core';
import { featuresConfig } from 'modules/common/const';
import { Container } from 'uiKit/Container';
import { LiquidCrowdloans } from './components/LiquidCrowdloans';
import { StakableTokens } from './components/StakableTokens';
import { StakedTokens } from './components/StakedTokens';
import { useDashboard } from './hooks/useDashboard';

export const Dashboard = () => {
  useDashboard();

  return (
    <Box component="section" py={{ xs: 6, md: 8 }}>
      <Container>
        <StakableTokens mb={7} />

        <StakedTokens mb={7} />

        {featuresConfig.dashboardLiquidCrowdloanAssets && <LiquidCrowdloans />}
      </Container>
    </Box>
  );
};
