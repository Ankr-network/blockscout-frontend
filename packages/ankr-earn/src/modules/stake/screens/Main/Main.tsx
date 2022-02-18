import { Box } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { fetchAPY as getABNBBAPY } from 'modules/stake-bnb/actions/fetchAPY';
import { RoutesConfig as BinanceRoutes } from 'modules/stake-bnb/Routes';
import { getAPY as getAFTMBAPY } from 'modules/stake-fantom/actions/getAPY';
import { RoutesConfig as FantomRoutes } from 'modules/stake-fantom/Routes';
import { fetchAPY as getAMATICBAPY } from 'modules/stake-polygon/actions/fetchAPY';
import { RoutesConfig as PolygonRoutes } from 'modules/stake-polygon/Routes';
import React from 'react';
import { Container } from 'uiKit/Container';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';
import { FeatureItem } from './components/FeatureItem';
import { Features } from './components/Features';

export const Main = () => {
  const dispatchRequest = useDispatchRequest();

  useProviderEffect(() => {
    dispatchRequest(getABNBBAPY());
    dispatchRequest(getAFTMBAPY());
    dispatchRequest(getAMATICBAPY());
  }, [dispatchRequest]);

  const { data: aBNBbAPY } = useQuery({ type: getABNBBAPY });
  const { data: aFTMbAPY } = useQuery({ type: getAFTMBAPY });
  const { data: aMATICbAPY } = useQuery({ type: getAMATICBAPY });

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
            apy={aMATICbAPY?.toNumber()}
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
              apy={aBNBbAPY?.toNumber()}
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
              apy={aFTMbAPY?.toNumber()}
              // todo: get actual staked amount
              staked={undefined}
            />
          ) : null}
        </Features>
      </Container>
    </Box>
  );
};
