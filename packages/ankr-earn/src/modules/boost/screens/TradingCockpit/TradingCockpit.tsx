import { Box } from '@material-ui/core';

import { Nav } from 'modules/boost/components/Nav';
import { Dashboard } from 'modules/trading-cockpit/screens/Dashboard';
import { Container } from 'uiKit/Container';

export const TradingCockpit = (): JSX.Element => {
  return (
    <Box component="section" py={{ xs: 6, sm: 8 }}>
      <Container>
        <Nav />

        <Dashboard />
      </Container>
    </Box>
  );
};
