import { Box } from '@material-ui/core';

import { t } from 'common';

import { Nav } from 'modules/boost/components/Nav';
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
