import { Box } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { YEARLY_INTEREST as apyMatic } from 'modules/stake-polygon/const';
import { RoutesConfig as PolygonRoutes } from 'modules/stake-polygon/Routes';
import { Container } from 'uiKit/Container';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';
import { FeatureItem } from './components/FeatureItem';
import { Features } from './components/Features';

export const Main = () => {
  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Container>
        <Features>
          <FeatureItem
            mainHref={PolygonRoutes.stake.generatePath()}
            moreHref={undefined}
            title={t('features.polygon')}
            iconSlot={<MaticIcon />}
            token={Token.MATIC}
            apy={apyMatic}
            staked={new BigNumber('25175951')}
          />
        </Features>
      </Container>
    </Box>
  );
};
