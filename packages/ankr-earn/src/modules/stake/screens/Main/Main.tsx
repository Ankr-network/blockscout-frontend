import { Box } from '@material-ui/core';
import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { YEARLY_INTEREST as APY_BNB } from 'modules/stake-bnb/const';
import { RoutesConfig as BinanceRoutes } from 'modules/stake-bnb/Routes';
import { YEARLY_INTEREST as APY_FANTOM } from 'modules/stake-fantom/const';
import { RoutesConfig as FantomRoutes } from 'modules/stake-fantom/Routes';
import { RoutesConfig as PolygonRoutes } from 'modules/stake-polygon/Routes';
import { Container } from 'uiKit/Container';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';
import { FeatureItem } from './components/FeatureItem';
import { Features } from './components/Features';
import { useProviderEffect } from '../../../auth/hooks/useProviderEffect';
import { fetchAPY } from '../../../stake-polygon/actions/fetchAPY';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import React from 'react';

export const Main = () => {
  const dispatchRequest = useDispatchRequest();
  useProviderEffect(() => {
    dispatchRequest(fetchAPY());
  }, [dispatchRequest]);

  const { data: APY } = useQuery({ type: fetchAPY });

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
            apy={APY?.toNumber()}
            // todo: get actual staked amount
            staked={undefined}
          />

          {featuresConfig.isActiveBNBStaking && (
            <FeatureItem
              mainHref={BinanceRoutes.stake.generatePath()}
              moreHref={undefined}
              title={t('features.binance')}
              iconSlot={<BNBIcon />}
              token={Token.BNB}
              apy={APY_BNB}
              // todo: get actual staked amount
              staked={undefined}
            />
          )}

          {featuresConfig.stakeFantom ? (
            <FeatureItem
              mainHref={FantomRoutes.stake.generatePath()}
              moreHref={undefined}
              title={t('features.fantom')}
              iconSlot={<FantomIcon />}
              token={Token.FTM}
              apy={APY_FANTOM}
              // todo: get actual staked amount
              staked={undefined}
            />
          ) : null}
        </Features>
      </Container>
    </Box>
  );
};
