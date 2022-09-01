import { Box } from '@material-ui/core';

import { useIsMDUp } from 'ui';

import { featuresConfig } from 'modules/common/const';
import { Container } from 'uiKit/Container';

import { PortfolioChart } from '../../components/PortfolioChart';

import { LiquidCrowdloans } from './components/LiquidCrowdloans';
import { StakableTokens } from './components/StakableTokens';
import { StakedTokens } from './components/StakedTokens';
import { useDashboard } from './hooks/useDashboard';
import { usePortfolioNativeData } from './hooks/usePortfolioNativeData';
import { usePortfolioStakedData } from './hooks/usePortfolioStakedData';

const CHART_SIZE = 350;
const CHART_SIZE_MOBILE = 280;

export const Dashboard = (): JSX.Element => {
  useDashboard();

  const isMDUp = useIsMDUp();

  const {
    isLoading: isNativeDataLoading,
    totalAmountUsd: totalNativeAmountUsd,
    totalYieldAmountUsd: totalNativeYieldAmountUsd,
    apr: nativeApr,
    data: nativeData,
  } = usePortfolioNativeData();

  const {
    isLoading: isStakedDataLoading,
    totalAmountUsd: totalStakedAmountUsd,
    totalYieldAmountUsd: totalStakedYieldAmountUsd,
    apr: stakedApr,
    data: stakedData,
  } = usePortfolioStakedData();

  return (
    <Box component="section" py={{ xs: 6, md: 8 }}>
      <Container maxWidth="1420px">
        <PortfolioChart
          data={nativeData.concat(stakedData)}
          height={isMDUp ? CHART_SIZE : CHART_SIZE_MOBILE}
          isLoading={isNativeDataLoading || isStakedDataLoading}
          nativeApr={nativeApr}
          stakedApr={stakedApr}
          totalNativeAmountUsd={totalNativeAmountUsd}
          totalNativeYieldAmountUsd={totalNativeYieldAmountUsd}
          totalStakedAmountUsd={totalStakedAmountUsd}
          totalStakedYieldAmountUsd={totalStakedYieldAmountUsd}
          width={isMDUp ? CHART_SIZE : CHART_SIZE_MOBILE}
        />

        <StakableTokens mb={7} />

        <StakedTokens mb={7} />

        {featuresConfig.dashboardLiquidCrowdloanAssets && <LiquidCrowdloans />}
      </Container>
    </Box>
  );
};
