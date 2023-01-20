import { t } from '@ankr.com/common';
import { Typography } from '@material-ui/core';

import { isMainnet } from '@ankr.com/staking-sdk';

import {
  ANKR_AVAX_LANDING,
  ANKR_BNB_LANDING,
  ANKR_DOT_LANDING,
  ANKR_ETH_LANDING,
  ANKR_FTM_LANDING,
  ANKR_KSM_LANDING,
  ANKR_MATIC_LANDING,
  ANKR_SSV_LANDING,
  featuresConfig,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as AvalancheRoutes } from 'modules/stake-avax/Routes';
import { RoutesConfig as BinanceRoutes } from 'modules/stake-bnb/Routes';
import { RoutesConfig as EthereumRoutes } from 'modules/stake-eth/Routes';
import { RoutesConfig as FantomRoutes } from 'modules/stake-fantom/Routes';
import { RoutesConfig as StakeMaticCommonRoutes } from 'modules/stake-matic/common/Routes';
import { RoutesConfig as StakeMaticEthRoutes } from 'modules/stake-matic/eth/Routes';
import { RoutesConfig as PolkadotRoutes } from 'modules/stake-polkadot/Routes';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { RoutesConfig as EthereumSSVRoutes } from 'modules/stake-ssv/Routes';
import { RoutesConfig as StakeSuiRoutes } from 'modules/stake-sui/Routes';
import { RoutesConfig as XDCRoutes } from 'modules/stake-xdc/Routes';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { AvaxIcon } from 'uiKit/Icons/AvaxIcon';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { DotIcon } from 'uiKit/Icons/DotIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';
import { KsmIcon } from 'uiKit/Icons/KsmIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';
import { SSVStakingIcon } from 'uiKit/Icons/SSVStakingIcon';
import { SUIIcon } from 'uiKit/Icons/SUIIcon';
import { XDCIcon } from 'uiKit/Icons/XDCIcon';

import { useStakeMainScreen } from '../../hooks/useStakeMainScreen';
import { FeatureItem } from '../FeatureItem';
import { Features } from '../Features';

import { useLiquidStakingTokensStyles } from './useLiquidStakingTokensStyles';

export const LiquidStakingTokens = (): JSX.Element => {
  const classes = useLiquidStakingTokensStyles();
  const { onTrackEnterStakingFlow, metrics, loading } = useStakeMainScreen();

  return (
    <>
      <Typography className={classes.title} variant="h3">
        {t('stake.liquid-staking')}
      </Typography>

      <Features>
        <FeatureItem
          apy={metrics && +metrics.eth.apy}
          iconSlot={<EthIcon />}
          isApyLoading={loading}
          isTvlLoading={loading}
          mainHref={EthereumRoutes.stake.generatePath()}
          moreHref={ANKR_ETH_LANDING}
          stakedTvl={metrics?.eth.totalStaked}
          title={t('features.ethereum')}
          token={Token.ETH}
          onStakeClick={onTrackEnterStakingFlow(Token.ETH)}
        />

        <FeatureItem
          apy={metrics && +metrics.matic.apy}
          iconSlot={<MaticIcon />}
          isApyLoading={loading}
          isTvlLoading={loading}
          mainHref={
            featuresConfig.maticPolygonStaking
              ? StakeMaticCommonRoutes.stake.path
              : StakeMaticEthRoutes.stake.generatePath()
          }
          moreHref={ANKR_MATIC_LANDING}
          stakedTvl={metrics?.matic.totalStaked}
          title={t('features.polygon')}
          token={Token.MATIC}
          onStakeClick={onTrackEnterStakingFlow(Token.MATIC)}
        />

        <FeatureItem
          apy={metrics && +metrics.bnb.apy}
          iconSlot={<BNBIcon />}
          isApyLoading={loading}
          isTvlLoading={loading}
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
          isApyLoading={loading}
          isTvlLoading={loading}
          mainHref={FantomRoutes.stake.generatePath()}
          moreHref={ANKR_FTM_LANDING}
          stakedTvl={metrics?.ftm.totalStaked}
          title={t('features.fantom')}
          token={Token.FTM}
          onStakeClick={onTrackEnterStakingFlow(Token.FTM)}
        />

        <FeatureItem
          apy={metrics && +metrics.avax.apy}
          iconSlot={<AvaxIcon />}
          isApyLoading={loading}
          isTvlLoading={loading}
          mainHref={AvalancheRoutes.stake.generatePath()}
          moreHref={ANKR_AVAX_LANDING}
          stakedTvl={metrics?.avax.totalStaked}
          title={t('features.avalanche')}
          token={Token.AVAX}
          onStakeClick={onTrackEnterStakingFlow(Token.AVAX)}
        />

        <FeatureItem
          apy={metrics && +metrics.dot.apy}
          iconSlot={<DotIcon />}
          isApyLoading={loading}
          isTvlLoading={loading}
          mainHref={
            isMainnet
              ? PolkadotRoutes.stake.generatePath(EPolkadotNetworks.DOT)
              : undefined
          }
          moreHref={ANKR_DOT_LANDING}
          stakedTvl={metrics?.dot.totalStaked}
          title={t('features.polkadot')}
          token={Token.DOT}
          onStakeClick={onTrackEnterStakingFlow(Token.DOT)}
        />

        {featuresConfig.isKusamaStakingActive && (
          <FeatureItem
            apy={metrics && +metrics.ksm.apy}
            iconSlot={<KsmIcon />}
            isApyLoading={loading}
            isTvlLoading={loading}
            mainHref={
              isMainnet
                ? PolkadotRoutes.stake.generatePath(EPolkadotNetworks.KSM)
                : undefined
            }
            moreHref={ANKR_KSM_LANDING}
            stakedTvl={metrics?.ksm.totalStaked}
            title={t('features.ksm')}
            token={Token.KSM}
            onStakeClick={onTrackEnterStakingFlow(Token.KSM)}
          />
        )}

        {!isMainnet && (
          <FeatureItem
            apy={metrics && +metrics.wnd.apy}
            iconSlot={<DotIcon />}
            isApyLoading={loading}
            isTvlLoading={loading}
            mainHref={PolkadotRoutes.stake.generatePath(EPolkadotNetworks.WND)}
            moreHref={ANKR_DOT_LANDING}
            stakedTvl={metrics?.wnd.totalStaked}
            title={t('features.wnd')}
            token={Token.WND}
            onStakeClick={onTrackEnterStakingFlow(Token.WND)}
          />
        )}

        {featuresConfig.ssvStaking && (
          <FeatureItem
            apy={
              metrics?.[EMetricsServiceName.ETH_SSV] &&
              +metrics[EMetricsServiceName.ETH_SSV].apy
            }
            iconRootClass={classes.ssvIcon}
            iconSlot={<SSVStakingIcon />}
            isApyLoading={loading}
            isTvlLoading={loading}
            mainHref={EthereumSSVRoutes.stake.generatePath()}
            moreHref={ANKR_SSV_LANDING}
            stakedTvl={metrics?.[EMetricsServiceName.ETH_SSV]?.totalStaked}
            title={t('features.ethereum-ssv')}
            token={Token.ETH}
            onStakeClick={onTrackEnterStakingFlow(Token.asETHc)}
          />
        )}

        {featuresConfig.isSUIStakingActive && (
          <FeatureItem
            apy={0}
            iconSlot={<SUIIcon />}
            isApyLoading={false}
            isTvlLoading={false}
            mainHref={StakeSuiRoutes.stake.generatePath()}
            moreHref=" "
            stakedTvl={ZERO}
            title={t('features.sui')}
            token={Token.SUI}
            onStakeClick={onTrackEnterStakingFlow(Token.SUI)}
          />
        )}

        {featuresConfig.xdcActive && featuresConfig.xdcStaking && (
          <FeatureItem
            apy={
              metrics?.[EMetricsServiceName.XDC] &&
              +metrics[EMetricsServiceName.XDC].apy
            }
            iconSlot={<XDCIcon />}
            isApyLoading={loading}
            isTvlLoading={loading}
            mainHref={XDCRoutes.stake.generatePath()}
            moreHref=""
            stakedTvl={metrics?.[EMetricsServiceName.XDC]?.totalStaked}
            title={t('features.xdc')}
            token={Token.XDC}
            onStakeClick={onTrackEnterStakingFlow(Token.ankrXDC)}
          />
        )}
      </Features>
    </>
  );
};
