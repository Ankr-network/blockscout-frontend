import { Box } from '@material-ui/core';
import { Nav } from 'modules/boost/components/Nav/Nav';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { Container } from 'uiKit/Container';

export const LiquidityMining = () => {
  return (
    <Box py={{ xs: 6, sm: 8 }} component="section">
      <Container>
        <Nav />
        {/* todo: use the relevant module */}
        {t('boost.liquidity-mining')}
      </Container>
    </Box>
  );
};
