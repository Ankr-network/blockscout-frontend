import { Box, Container } from '@material-ui/core';
import { Nav } from 'modules/boost/components/Nav/Nav';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';

export const LiquidityMining = () => {
  return (
    <Box py={{ xs: 6, sm: 8 }} component="section">
      <Container>
        <Nav />
        {t('boost.liquidity-mining')}
      </Container>
    </Box>
  );
};
