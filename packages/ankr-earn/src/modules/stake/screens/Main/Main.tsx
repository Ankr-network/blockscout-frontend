import { Box } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { featuresConfig, STAKE_LEGACY_LINKS } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import {
  fetchValidatorsDetails,
  IValidatorDetails,
} from 'modules/metrics/actions/fetchValidatorsDetails';
import { ValidatorName } from 'modules/metrics/const';
import { fetchAPY as getAAVAXBAPY } from 'modules/stake-avax/actions/fetchAPY';
import { RoutesConfig as AvalancheRoutes } from 'modules/stake-avax/Routes';
import { fetchAPY as getABNBBAPY } from 'modules/stake-bnb/actions/fetchAPY';
import { RoutesConfig as BinanceRoutes } from 'modules/stake-bnb/Routes';
import { getAPY as getETHAPY } from 'modules/stake-eth/actions/getAPY';
import { RoutesConfig as EthereumRoutes } from 'modules/stake-eth/Routes';
import { getAPY as getAFTMBAPY } from 'modules/stake-fantom/actions/getAPY';
import { RoutesConfig as FantomRoutes } from 'modules/stake-fantom/Routes';
import { fetchAPY as getAMATICBAPY } from 'modules/stake-polygon/actions/fetchAPY';
import { RoutesConfig as PolygonRoutes } from 'modules/stake-polygon/Routes';
import { Container } from 'uiKit/Container';
import { AvaxIcon } from 'uiKit/Icons/AvaxIcon';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { DotIcon } from 'uiKit/Icons/DotIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';
import { KsmIcon } from 'uiKit/Icons/KsmIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';

import { FeatureItem } from './components/FeatureItem';
import { FeatureLegacyItem } from './components/FeatureLegacyItem';
import { Features } from './components/Features';

type ValidatorDetails = Record<
  | ValidatorName.AVAX_VALIDATOR_NAME
  | ValidatorName.BNB_VALIDATOR_NAME
  | ValidatorName.ETH_VALIDATOR_NAME
  | ValidatorName.FTM_VALIDATOR_NAME
  | ValidatorName.POLYGON_VALIDATOR_NAME,
  IValidatorDetails
>;

export const Main = (): JSX.Element => {
  const dispatchRequest = useDispatchRequest();

  useProviderEffect(() => {
    if (featuresConfig.stakeETH) dispatchRequest(getETHAPY());
    if (featuresConfig.isActiveAVAXStaking) dispatchRequest(getAAVAXBAPY());
    dispatchRequest(getABNBBAPY());
    dispatchRequest(getAFTMBAPY());
    dispatchRequest(getAMATICBAPY());
    dispatchRequest(fetchValidatorsDetails());
  }, [dispatchRequest]);

  const { data: aAVAXbAPY } = useQuery({ type: getAAVAXBAPY });
  const { data: aBNBbAPY } = useQuery({ type: getABNBBAPY });
  const { data: aFTMbAPY } = useQuery({ type: getAFTMBAPY });
  const { data: aMATICbAPY } = useQuery({ type: getAMATICBAPY });
  const { data: ethAPY } = useQuery({ type: getETHAPY });

  const { data: validatorsData } = useQuery({ type: fetchValidatorsDetails });

  const validatorsDetails: ValidatorDetails | undefined = useMemo(
    () =>
      validatorsData?.reduce(
        (obj, item) => ({ ...obj, [item.name]: item }),
        {} as ValidatorDetails,
      ),
    [validatorsData],
  );

  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Container>
        <Features>
          {featuresConfig.stakeETH ? (
            <FeatureItem
              apy={ethAPY ?? undefined}
              iconSlot={<EthIcon />}
              mainHref={EthereumRoutes.stake.generatePath()}
              stakedTvl={validatorsDetails?.eth.totalStaked}
              title={t('features.ethereum')}
              token={Token.ETH}
            />
          ) : (
            <FeatureLegacyItem
              iconSlot={<EthIcon />}
              mainHref={STAKE_LEGACY_LINKS.ETH}
              title={t('features.ethereum')}
            />
          )}

          {featuresConfig.stakeETHWithoutClaim && (
            <FeatureItem
              iconSlot={<EthIcon />}
              mainHref={EthereumRoutes.stakeWithoutClaim.generatePath()}
              title="ETH (testing only)"
              token={Token.ETH}
            />
          )}

          <FeatureItem
            apy={aMATICbAPY?.toNumber()}
            iconSlot={<MaticIcon />}
            mainHref={PolygonRoutes.stake.generatePath()}
            stakedTvl={validatorsDetails?.polygon.totalStaked}
            title={t('features.polygon')}
            token={Token.MATIC}
          />

          <FeatureItem
            apy={aBNBbAPY?.toNumber()}
            iconSlot={<BNBIcon />}
            mainHref={BinanceRoutes.stake.generatePath()}
            stakedTvl={validatorsDetails?.bnb.totalStaked}
            title={t('features.binance')}
            token={Token.BNB}
          />

          <FeatureItem
            apy={aFTMbAPY?.toNumber()}
            iconSlot={<FantomIcon />}
            mainHref={FantomRoutes.stake.generatePath()}
            stakedTvl={validatorsDetails?.ftm.totalStaked}
            title={t('features.fantom')}
            token={Token.FTM}
          />

          {featuresConfig.isActiveAVAXStaking && (
            <FeatureItem
              apy={aAVAXbAPY?.toNumber()}
              iconSlot={<AvaxIcon />}
              mainHref={AvalancheRoutes.stake.generatePath()}
              stakedTvl={validatorsDetails?.avax.totalStaked}
              title={t('features.avalanche')}
              token={Token.AVAX}
            />
          )}

          <FeatureLegacyItem
            iconSlot={<DotIcon />}
            mainHref={STAKE_LEGACY_LINKS.DOT}
            title={t('features.polkadot')}
          />

          <FeatureLegacyItem
            iconSlot={<KsmIcon />}
            mainHref={STAKE_LEGACY_LINKS.KSM}
            title={t('features.ksm')}
          />
        </Features>
      </Container>
    </Box>
  );
};
