import { Box } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { Container } from 'uiKit/Container';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { AvaxIcon } from 'uiKit/Icons/AvaxIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';

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
              {
                name: Token.aETHb,
                percent: 30,
                usdAmount: new BigNumber(3_000),
                amount: new BigNumber(1),
                icon: <AETHBIcon />,
              },
              {
                name: Token.aETHc,
                percent: 20,
                usdAmount: new BigNumber(2_000),
                amount: new BigNumber(1),
                icon: <AETHCIcon />,
              },
              {
                name: Token.AVAX,
                percent: 20,
                usdAmount: new BigNumber(2_000),
                amount: new BigNumber(1),
                icon: <AvaxIcon />,
              },
              {
                name: Token.ETH,
                percent: 30,
                usdAmount: new BigNumber(2_000),
                amount: new BigNumber(1),
                icon: <EthIcon />,
              },
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
