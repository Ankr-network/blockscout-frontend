import { Box } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { RoutesConfig as BinanceRoutes } from 'modules/stake-bnb/Routes';
import { getAPY as getAftmbAPY } from 'modules/stake-fantom/actions/getAPY';
import { RoutesConfig as FantomRoutes } from 'modules/stake-fantom/Routes';
import { RoutesConfig as PolygonRoutes } from 'modules/stake-polygon/Routes';
import { Container } from 'uiKit/Container';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { fetchAPY as getAmaticbAPY } from 'modules/stake-polygon/actions/fetchAPY';
import { fetchAPY as getAbnbbAPY } from 'modules/stake-bnb/actions/fetchAPY';
import { FeatureItem } from './components/FeatureItem';
import { Features } from './components/Features';

export const Main = () => {
  const dispatchRequest = useDispatchRequest();
  useProviderEffect(() => {
    dispatchRequest(getAmaticbAPY());
    dispatchRequest(getAftmbAPY());
    dispatchRequest(getAbnbbAPY());
  }, [dispatchRequest]);

  const { data: aMATICbAPY } = useQuery({ type: getAmaticbAPY });
  const { data: aFTMbAPY } = useQuery({ type: getAftmbAPY });
  const { data: aBNBbAPY } = useQuery({ type: getAbnbbAPY });

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
