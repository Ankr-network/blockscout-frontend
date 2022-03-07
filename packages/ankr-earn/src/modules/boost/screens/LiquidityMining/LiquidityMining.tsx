import { Box } from '@material-ui/core';
import React from 'react';

import { Nav } from 'modules/boost/components/Nav/Nav';
import { t } from 'modules/i18n/utils/intl';
import { Container } from 'uiKit/Container';

export const LiquidityMining = (): JSX.Element => {
  return (
    <Box component="section" py={{ xs: 6, sm: 8 }}>
      <Container>
        <Nav />

        {/* todo: use the relevant module */}

        {t('boost.liquidity-mining')}
      </Container>
    </Box>
  );
};
