import { Box } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { fetchAPY as getAAVAXBAPY } from 'modules/stake-avax/actions/fetchAPY';
import { RoutesConfig as AvalancheRoutes } from 'modules/stake-avax/Routes';
import { fetchAPY as getABNBBAPY } from 'modules/stake-bnb/actions/fetchAPY';
import { RoutesConfig as BinanceRoutes } from 'modules/stake-bnb/Routes';
import { DEMO_APY } from 'modules/stake-eth/const';
import { RoutesConfig as EthereumRoutes } from 'modules/stake-eth/Routes';
import { getAPY as getAFTMBAPY } from 'modules/stake-fantom/actions/getAPY';
import { RoutesConfig as FantomRoutes } from 'modules/stake-fantom/Routes';
import { fetchAPY as getAMATICBAPY } from 'modules/stake-polygon/actions/fetchAPY';
import { RoutesConfig as PolygonRoutes } from 'modules/stake-polygon/Routes';
import { Container } from 'uiKit/Container';
import { AvaxIcon } from 'uiKit/Icons/AvaxIcon';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';

import { FeatureItem } from './components/FeatureItem';
import { Features } from './components/Features';

export const Main = (): JSX.Element => {
  const dispatchRequest = useDispatchRequest();

  useProviderEffect(() => {
    dispatchRequest(getAAVAXBAPY());
    dispatchRequest(getABNBBAPY());
    dispatchRequest(getAFTMBAPY());
    dispatchRequest(getAMATICBAPY());
  }, [dispatchRequest]);

  const { data: aAVAXbAPY } = useQuery({ type: getAAVAXBAPY });
  const { data: aBNBbAPY } = useQuery({ type: getABNBBAPY });
  const { data: aFTMbAPY } = useQuery({ type: getAFTMBAPY });
  const { data: aMATICbAPY } = useQuery({ type: getAMATICBAPY });

  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Container>
        <Features>
          {featuresConfig.stakeETH && (
            <FeatureItem
              apy={DEMO_APY}
              iconSlot={<EthIcon />}
              mainHref={EthereumRoutes.stake.generatePath()}
              moreHref={undefined}
              staked={undefined}
              title={t('features.ethereum')}
              // todo: get actual staked amount
              token={Token.ETH}
            />
          )}

          <FeatureItem
            apy={aMATICbAPY?.toNumber()}
            iconSlot={<MaticIcon />}
            mainHref={PolygonRoutes.stake.generatePath()}
            moreHref={undefined}
            staked={undefined}
            title={t('features.polygon')}
            // todo: get actual staked amount
            token={Token.MATIC}
          />

          {featuresConfig.isActiveBNBStaking && (
            <FeatureItem
              apy={aBNBbAPY?.toNumber()}
              iconSlot={<BNBIcon />}
              mainHref={BinanceRoutes.stake.generatePath()}
              moreHref={undefined}
              staked={undefined}
              title={t('features.binance')}
              // todo: get actual staked amount
              token={Token.BNB}
            />
          )}

          {featuresConfig.stakeFantom ? (
            <FeatureItem
              apy={aFTMbAPY?.toNumber()}
              iconSlot={<FantomIcon />}
              mainHref={FantomRoutes.stake.generatePath()}
              moreHref={undefined}
              staked={undefined}
              title={t('features.fantom')}
              // todo: get actual staked amount
              token={Token.FTM}
            />
          ) : null}

          {featuresConfig.isActiveAVAXStaking && (
            <FeatureItem
              apy={aAVAXbAPY?.toNumber()}
              iconSlot={<AvaxIcon />}
              mainHref={AvalancheRoutes.stake.generatePath()}
              moreHref={undefined}
              // todo: get actual staked amount
              staked={undefined}
              title={t('features.avalanche')}
              token={Token.AVAX}
            />
          )}
        </Features>
      </Container>
    </Box>
  );
};
