import { Box } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { fetchStats } from 'modules/stake-polygon/actions/fetchStats';
import { fetchTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import { Container } from 'uiKit/Container';
import { StakableTokens } from './components/StakableTokens';
import { StakedTokens } from './components/StakedTokens';
import { LiquidCrowdloans } from './components/LiquidCrowdloans';
import { featuresConfig } from 'modules/common/const';

export const Dashboard = () => {
  const dispatchRequest = useDispatchRequest();

  useProviderEffect(() => {
    dispatchRequest(fetchStats());
    dispatchRequest(fetchTxHistory());
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
