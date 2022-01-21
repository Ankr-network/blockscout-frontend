import { Box } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { fetchStats } from 'modules/stake-polygon/actions/fetchStats';
import { fetchTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import { Container } from 'uiKit/Container';
import { StakableTokens } from './components/StakableTokens';
import { StakedTokens } from './components/StakedTokens';

export const Dashboard = () => {
  const dispatchRequest = useDispatchRequest();

  useInitEffect(() => {
    dispatchRequest(fetchStats());
    dispatchRequest(fetchTxHistory());
  });

  return (
    <Box component="section" py={{ xs: 6, md: 8 }}>
      <Container>
        <StakableTokens mb={7} />

        <StakedTokens />
      </Container>
    </Box>
  );
};
