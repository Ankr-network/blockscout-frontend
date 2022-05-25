import { Box } from '@material-ui/core';

import { t } from 'common';

import { featuresConfig, STAKE_LEGACY_LINKS } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { RoutesConfig as AvalancheRoutes } from 'modules/stake-avax/Routes';
import { RoutesConfig as BinanceRoutes } from 'modules/stake-bnb/Routes';
import { RoutesConfig as EthereumRoutes } from 'modules/stake-eth/Routes';
import { RoutesConfig as FantomRoutes } from 'modules/stake-fantom/Routes';
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
import { useStakeMainScreen } from './hooks/useStakeMainScreen';

export const Main = (): JSX.Element => {
  const { onTrackEnterStakingFlow, metrics } = useStakeMainScreen();

  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Container>
        <Features>
          <FeatureItem
            apy={metrics && +metrics.eth.apy}
            iconSlot={<EthIcon />}
            mainHref={EthereumRoutes.stake.generatePath()}
            moreHref={getStakingOverviewUrl(Token.ETH)}
            stakedTvl={metrics?.eth.totalStaked}
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
            apy={metrics && +metrics.matic.apy}
            iconSlot={<MaticIcon />}
            mainHref={PolygonRoutes.stake.generatePath()}
            moreHref={getStakingOverviewUrl(Token.MATIC)}
            stakedTvl={metrics?.matic.totalStaked}
            title={t('features.polygon')}
            token={Token.MATIC}
            onStakeClick={onTrackEnterStakingFlow(Token.MATIC)}
          />

          <FeatureItem
            apy={metrics && +metrics.bnb.apy}
            iconSlot={<BNBIcon />}
            mainHref={BinanceRoutes.stake.generatePath()}
            moreHref={getStakingOverviewUrl(Token.BNB)}
            stakedTvl={metrics?.bnb.totalStaked}
            title={t('features.binance')}
            token={Token.BNB}
            onStakeClick={onTrackEnterStakingFlow(Token.BNB)}
          />

          <FeatureItem
            apy={metrics && +metrics.ftm.apy}
            iconSlot={<FantomIcon />}
            mainHref={FantomRoutes.stake.generatePath()}
            moreHref={getStakingOverviewUrl(Token.FTM)}
            stakedTvl={metrics?.ftm.totalStaked}
            title={t('features.fantom')}
            token={Token.FTM}
            onStakeClick={onTrackEnterStakingFlow(Token.FTM)}
          />

          <FeatureItem
            apy={metrics && +metrics.avax.apy}
            iconSlot={<AvaxIcon />}
            mainHref={AvalancheRoutes.stake.generatePath()}
            moreHref={getStakingOverviewUrl(Token.AVAX)}
            stakedTvl={metrics?.avax.totalStaked}
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
