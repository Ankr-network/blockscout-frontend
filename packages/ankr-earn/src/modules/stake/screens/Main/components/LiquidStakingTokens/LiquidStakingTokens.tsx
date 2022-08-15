import { isMainnet } from '@ankr.com/staking-sdk/src/modules/common';
import { Typography } from '@material-ui/core';

import { t } from 'common';

import {
  ANKR_BNB_LANDING,
  ANKR_ETH_LANDING,
  ANKR_MATIC_LANDING,
  featuresConfig,
  STAKE_LEGACY_LINKS,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { RoutesConfig as AvalancheRoutes } from 'modules/stake-avax/Routes';
import { RoutesConfig as BinanceRoutes } from 'modules/stake-bnb/Routes';
import { RoutesConfig as EthereumRoutes } from 'modules/stake-eth/Routes';
import { RoutesConfig as FantomRoutes } from 'modules/stake-fantom/Routes';
import { RoutesConfig as PolygonRoutes } from 'modules/stake-matic/eth/Routes';
import { RoutesConfig as PolkadotRoutes } from 'modules/stake-polkadot/Routes';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { AvaxIcon } from 'uiKit/Icons/AvaxIcon';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { DotIcon } from 'uiKit/Icons/DotIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';
import { KsmIcon } from 'uiKit/Icons/KsmIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';

import { useStakeMainScreen } from '../../hooks/useStakeMainScreen';
import { FeatureItem, FeatureItemLegacy } from '../FeatureItem';
import { Features } from '../Features';

import { useLiquidStakingTokensStyles } from './useLiquidStakingTokensStyles';

export const LiquidStakingTokens = (): JSX.Element => {
  const classes = useLiquidStakingTokensStyles();
  const { onTrackEnterStakingFlow, metrics } = useStakeMainScreen();

  return (
    <>
      <Typography className={classes.title} variant="h3">
        {t('stake.liquid-staking')}
      </Typography>

      <Features>
        <FeatureItem
          apy={metrics && +metrics.eth.apy}
          iconSlot={<EthIcon />}
          mainHref={EthereumRoutes.stake.generatePath()}
          moreHref={ANKR_ETH_LANDING}
          stakedTvl={metrics?.eth.totalStaked}
          title={t('features.ethereum')}
          token={Token.ETH}
        />

        <FeatureItem
          apy={metrics && +metrics.matic.apy}
          iconSlot={<MaticIcon />}
          mainHref={PolygonRoutes.stake.generatePath()}
          moreHref={ANKR_MATIC_LANDING}
          stakedTvl={metrics?.matic.totalStaked}
          title={t('features.polygon')}
          token={Token.MATIC}
          onStakeClick={onTrackEnterStakingFlow(Token.MATIC)}
        />

        <FeatureItem
          apy={metrics && +metrics.bnb.apy}
          iconSlot={<BNBIcon />}
          mainHref={BinanceRoutes.stake.generatePath()}
          moreHref={ANKR_BNB_LANDING}
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

        {featuresConfig.isActivePolkadotStaking && isMainnet ? (
          <FeatureItem
            apy={metrics && +metrics.dot.apy}
            iconSlot={<DotIcon />}
            mainHref={PolkadotRoutes.stake.generatePath(EPolkadotNetworks.DOT)}
            moreHref={getStakingOverviewUrl(Token.DOT)}
            stakedTvl={metrics?.dot.totalStaked}
            title={t('features.polkadot')}
            token={Token.DOT}
            onStakeClick={onTrackEnterStakingFlow(Token.DOT)}
          />
        ) : (
          <FeatureItemLegacy
            href={STAKE_LEGACY_LINKS.DOT}
            iconSlot={<DotIcon />}
            title={t('features.polkadot')}
          />
        )}

        {featuresConfig.isActivePolkadotStaking && isMainnet ? (
          <FeatureItem
            apy={metrics && +metrics.ksm.apy}
            iconSlot={<KsmIcon />}
            mainHref={PolkadotRoutes.stake.generatePath(EPolkadotNetworks.KSM)}
            moreHref={getStakingOverviewUrl(Token.KSM)}
            stakedTvl={metrics?.ksm.totalStaked}
            title={t('features.ksm')}
            token={Token.KSM}
            onStakeClick={onTrackEnterStakingFlow(Token.KSM)}
          />
        ) : (
          <FeatureItemLegacy
            href={STAKE_LEGACY_LINKS.KSM}
            iconSlot={<KsmIcon />}
            title={t('features.ksm')}
          />
        )}

        {featuresConfig.isActivePolkadotStaking && !isMainnet && (
          <FeatureItem
            apy={metrics && +metrics.wnd.apy}
            iconSlot={<DotIcon />}
            mainHref={PolkadotRoutes.stake.generatePath(EPolkadotNetworks.WND)}
            moreHref={getStakingOverviewUrl(Token.WND)}
            stakedTvl={metrics?.wnd.totalStaked}
            title={t('features.wnd')}
            token={Token.WND}
            onStakeClick={onTrackEnterStakingFlow(Token.WND)}
          />
        )}
      </Features>
    </>
  );
};
