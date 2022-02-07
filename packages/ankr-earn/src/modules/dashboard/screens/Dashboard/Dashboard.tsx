import { Box } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { featuresConfig } from 'modules/common/const';
import { useBNBNetworkEffect } from 'modules/common/hooks/useBNBNetworkEffect';
import { useETHNetworkEffect } from 'modules/common/hooks/useETHNetworkEffect';
import { fetchStats as fetchBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { fetchTxHistory as fetchBNBTxHistory } from 'modules/stake-bnb/actions/fetchTxHistory';
import { fetchStats as fetchPolygonStats } from 'modules/stake-polygon/actions/fetchStats';
import { fetchTxHistory as fetchPolygonTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import { Container } from 'uiKit/Container';
import { LiquidCrowdloans } from './components/LiquidCrowdloans';
import { StakableTokens } from './components/StakableTokens';
import { StakedTokens } from './components/StakedTokens';

export const Dashboard = () => {
  const dispatchRequest = useDispatchRequest();

  useETHNetworkEffect((): void => {
    dispatchRequest(fetchPolygonStats());
    dispatchRequest(fetchPolygonTxHistory());
  }, [dispatchRequest]);

  useBNBNetworkEffect((): void => {
    if (!featuresConfig.isActiveBNBStaking) {
      return;
    }

    dispatchRequest(fetchBNBStats());
    dispatchRequest(fetchBNBTxHistory());
  }, [dispatchRequest]);

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
