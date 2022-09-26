import { Box } from '@material-ui/core';

import { Container } from 'uiKit/Container';

import { Header } from './components/Header';
import { ReferralTables } from './components/ReferralTables';
import { StatsTable } from './components/StatsTable';

export const Main = (): JSX.Element => {
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
