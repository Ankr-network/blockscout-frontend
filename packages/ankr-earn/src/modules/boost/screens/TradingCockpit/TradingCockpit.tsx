import { Box } from '@material-ui/core';
import React from 'react';

import { Nav } from 'modules/boost/components/Nav/Nav';
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
