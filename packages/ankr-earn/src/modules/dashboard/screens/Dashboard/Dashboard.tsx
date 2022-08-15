import { Box } from '@material-ui/core';

import { featuresConfig } from 'modules/common/const';
import { Container } from 'uiKit/Container';

import { PortfolioChart } from '../../components/PortfolioChart';

import { LiquidCrowdloans } from './components/LiquidCrowdloans';
import { StakableTokens } from './components/StakableTokens';
import { StakedTokens } from './components/StakedTokens';
import { useDashboard } from './hooks/useDashboard';
import { usePortfolioNativeData } from './hooks/usePortfolioNativeData';
import { usePortfolioStakedData } from './hooks/usePortfolioStakedData';

export const Dashboard = (): JSX.Element => {
  useDashboard();

  const {
    isLoading: isNativeDataLoading,
    totalAmountUsd: totalNativeAmountUsd,
    data: nativeData,
  } = usePortfolioNativeData();

  const {
    isLoading: isStakedDataLoading,
    totalAmountUsd: totalStakedAmountUsd,
    data: stakedData,
  } = usePortfolioStakedData();

  return (
    <Box component="section" py={{ xs: 6, md: 8 }}>
      <Container>
        {featuresConfig.newDashboard && (
          <PortfolioChart
            data={nativeData.concat(stakedData)}
            height={300}
            isLoading={isNativeDataLoading || isStakedDataLoading}
            totalNativeAmountUsd={totalNativeAmountUsd}
            totalStakedAmountUsd={totalStakedAmountUsd}
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
