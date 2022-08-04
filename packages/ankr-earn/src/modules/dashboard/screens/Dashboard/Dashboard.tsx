import { Box } from '@material-ui/core';

import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { Container } from 'uiKit/Container';

import { PortfolioChart } from '../../components/PortfolioChart';

import { LiquidCrowdloans } from './components/LiquidCrowdloans';
import { StakableTokens } from './components/StakableTokens';
import { StakedTokens } from './components/StakedTokens';
import { useDashboard } from './hooks/useDashboard';

export const Dashboard = (): JSX.Element => {
  useDashboard();

  return (
    <Box component="section" py={{ xs: 6, md: 8 }}>
      <Container>
        {featuresConfig.newDashboard && (
          <PortfolioChart
            data={[
              { name: Token.aETHb, percent: 30 },
              { name: Token.aETHc, percent: 20 },
              { name: Token.AVAX, percent: 20 },
              { name: Token.ETH, percent: 20 },
              { name: Token.BNB, percent: 10 },
            ]}
            height={300}
            isLoading={false}
            width={300}
          />
        )}

        <StakableTokens mb={7} />

        <StakedTokens mb={7} />

        {featuresConfig.dashboardLiquidCrowdloanAssets && <LiquidCrowdloans />}
      </Container>
    </Box>
  );
};
