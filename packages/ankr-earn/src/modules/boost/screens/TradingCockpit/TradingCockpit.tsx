import { Box } from '@material-ui/core';
import { Nav } from 'modules/boost/components/Nav/Nav';
import { Dashboard } from 'modules/trading-cockpit/screens/Dashboard';
import React from 'react';
import { Container } from 'uiKit/Container';

export const TradingCockpit = () => {
  return (
    <Box py={{ xs: 6, sm: 8 }} component="section">
      <Container>
        <Nav />
        <Dashboard />
      </Container>
    </Box>
  );
};
