import { Box, Container } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { RoutesConfig as StakeDemoRoutes } from 'modules/stake-demo/Routes';
import { RoutesConfig as PolygonRoutes } from 'modules/stake-polygon/Routes';
import React from 'react';
import { FeatureItem } from './components/FeatureItem';
import { Features } from './components/Features';

export const Main = () => {
  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Container>
        <Features>
          <FeatureItem
            mainHref={StakeDemoRoutes.root}
            moreHref={StakeDemoRoutes.root}
            title={t('Demo')}
          />
          <FeatureItem
            mainHref={PolygonRoutes.stake.generatePath()}
            moreHref={StakeDemoRoutes.root}
            title={t('Polygon (MATIC)')}
          />
        </Features>
      </Container>
    </Box>
  );
};
