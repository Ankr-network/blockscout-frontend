import { Box } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { featuresConfig, STAKE_LEGACY_LINKS } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
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

import { FeatureItem, FeatureItemLegacy } from './components/FeatureItem';
import { Features } from './components/Features';
import { useStakeAnalytics } from './hooks/useStakeAnalytics';

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
  const { onTrackEnterStakingFlow } = useStakeAnalytics();

  useProviderEffect(() => {
    dispatchRequest(getETHAPY());
    dispatchRequest(getAAVAXBAPY());
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
          <FeatureItem
            apy={ethAPY ?? undefined}
            iconSlot={<EthIcon />}
            mainHref={EthereumRoutes.stake.generatePath()}
            moreHref={getStakingOverviewUrl(Token.ETH)}
            stakedTvl={validatorsDetails?.eth.totalStaked}
            title={t('features.ethereum')}
            token={Token.ETH}
          />

          {featuresConfig.stakeETHWithoutClaim && (
            <FeatureItem
              iconSlot={<EthIcon />}
              mainHref={EthereumRoutes.stakeWithoutClaim.generatePath()}
              moreHref={getStakingOverviewUrl(Token.ETH)}
              title="ETH (testing only)"
              token={Token.ETH}
            />
          )}

          <FeatureItem
            apy={aMATICbAPY?.toNumber()}
            iconSlot={<MaticIcon />}
            mainHref={PolygonRoutes.stake.generatePath()}
            moreHref={getStakingOverviewUrl(Token.MATIC)}
            stakedTvl={validatorsDetails?.polygon.totalStaked}
            title={t('features.polygon')}
            token={Token.MATIC}
            onStakeClick={onTrackEnterStakingFlow(Token.MATIC)}
          />

          <FeatureItem
            apy={aBNBbAPY?.toNumber()}
            iconSlot={<BNBIcon />}
            mainHref={BinanceRoutes.stake.generatePath()}
            moreHref={getStakingOverviewUrl(Token.BNB)}
            stakedTvl={validatorsDetails?.bnb.totalStaked}
            title={t('features.binance')}
            token={Token.BNB}
            onStakeClick={onTrackEnterStakingFlow(Token.BNB)}
          />

          <FeatureItem
            apy={aFTMbAPY?.toNumber()}
            iconSlot={<FantomIcon />}
            mainHref={FantomRoutes.stake.generatePath()}
            moreHref={getStakingOverviewUrl(Token.FTM)}
            stakedTvl={validatorsDetails?.ftm.totalStaked}
            title={t('features.fantom')}
            token={Token.FTM}
            onStakeClick={onTrackEnterStakingFlow(Token.FTM)}
          />

          <FeatureItem
            apy={aAVAXbAPY?.toNumber()}
            iconSlot={<AvaxIcon />}
            mainHref={AvalancheRoutes.stake.generatePath()}
            moreHref={getStakingOverviewUrl(Token.AVAX)}
            stakedTvl={validatorsDetails?.avax.totalStaked}
            title={t('features.avalanche')}
            token={Token.AVAX}
            onStakeClick={onTrackEnterStakingFlow(Token.AVAX)}
          />

          <FeatureItemLegacy
            href={STAKE_LEGACY_LINKS.DOT}
            iconSlot={<DotIcon />}
            title={t('features.polkadot')}
          />

          <FeatureItemLegacy
            href={STAKE_LEGACY_LINKS.KSM}
            iconSlot={<KsmIcon />}
            title={t('features.ksm')}
          />
        </Features>
      </Container>
    </Box>
  );
};
