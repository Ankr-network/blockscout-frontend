import { Box } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getPartnerCode } from 'modules/referrals/actions/getPartnerCode';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { Container } from 'uiKit/Container';

import { Header } from './components/Header';
import { ReferralTables } from './components/ReferralTables';
import { StatsTable } from './components/StatsTable';

export const Main = (): JSX.Element => {
  const dispatchRequest = useDispatchRequest();

  const { address } = useAuth(AvailableWriteProviders.ethCompatible);

  useProviderEffect(() => {
    dispatchRequest(getMetrics());

    if (address) {
      dispatchRequest(getPartnerCode(address));
    }
  }, []);

  return (
    <Box component="section" py={{ xs: 6, md: 8 }}>
      <Container size="xl">
        <Header />

        <StatsTable />

        <ReferralTables />
      </Container>
    </Box>
  );
};
