import { Box } from '@material-ui/core';
import { featuresConfig } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { RoutesConfig as StakeDemoRoutes } from 'modules/stake-demo/Routes';
import { RoutesConfig as PolygonRoutes } from 'modules/stake-polygon/Routes';
import React from 'react';
import { Container } from 'uiKit/Container';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';
import { FeatureItem } from './components/FeatureItem';
import { Features } from './components/Features';

export const Main = () => {
  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Container>
        <Features>
          {featuresConfig.demoStaking ? (
            <FeatureItem
              mainHref={StakeDemoRoutes.root}
              moreHref={StakeDemoRoutes.root}
              title={t('Demo')}
              iconSlot={<EthIcon />}
            />
          ) : null}

          <FeatureItem
            mainHref={PolygonRoutes.stake.generatePath()}
            moreHref={StakeDemoRoutes.root}
            title={t('Polygon (MATIC)')}
            iconSlot={<MaticIcon />}
          />
        </Features>
      </Container>
    </Box>
  );
};
