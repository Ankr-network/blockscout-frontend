import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import {
  DECIMAL_PLACES,
  DEFAULT_ROUNDING,
  ZERO,
  featuresConfig,
} from 'modules/common/const';
import { iconByTokenMap, TIcon } from 'modules/common/icons';
import { Token } from 'modules/common/types/token';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getCommonData as fetchAnkrData } from 'modules/stake-ankr/actions/getCommonData';
import { getMaxApy } from 'modules/stake-ankr/actions/getMaxApy';
import { RoutesConfig as StakeAnkrRoutes } from 'modules/stake-ankr/Routes';
import { fetchStats as fetchStakeAVAXStats } from 'modules/stake-avax/actions/fetchStats';
import { RoutesConfig as StakeAvalancheRoutes } from 'modules/stake-avax/Routes';
import { fetchStats as fetchStakeBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { RoutesConfig as StakeBnbRoutes } from 'modules/stake-bnb/Routes';
import { getCommonData as fetchStakeETHStats } from 'modules/stake-eth/actions/getCommonData';
import { RoutesConfig as StakeEthRoutes } from 'modules/stake-eth/Routes';
import { getCommonData as fetchStakeFTMStats } from 'modules/stake-fantom/actions/getCommonData';
import { RoutesConfig as StakeFantomRoutes } from 'modules/stake-fantom/Routes';
import { fetchStats as fetchStakePolygonStats } from 'modules/stake-matic/eth/actions/fetchStats';
import { RoutesConfig as StakeMaticRoutes } from 'modules/stake-matic/eth/Routes';
import { fetchETHTokenClaimableBalance } from 'modules/stake-polkadot/actions/fetchETHTokenClaimableBalance';
import { fetchPolkadotAccountFullBalance } from 'modules/stake-polkadot/actions/fetchPolkadotAccountFullBalance';
import { RoutesConfig as StakePolkadotRoutes } from 'modules/stake-polkadot/Routes';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

export interface IUsePortfolioData {
  isLoading: boolean;
  totalAmountUsd: BigNumber;
  totalYieldAmountUsd: BigNumber;
  apr: BigNumber;
  data: IPortfolioItem[];
}

interface IPortfolioItem {
  name: Token;
  percent: number;
  usdAmount: BigNumber;
  amount: BigNumber;
  yieldAmount: BigNumber;
  yieldAmountUsd: BigNumber;
  apy: BigNumber;
  icon: TIcon;
  isNative: boolean;
  link?: string;
}

export const usePortfolioNativeData = (): IUsePortfolioData => {
  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const { data: polygonData, loading: isPolygonDataLoading } = useQuery({
    type: fetchStakePolygonStats,
  });

  const { data: avaxData, loading: isAvaxDataLoading } = useQuery({
    type: fetchStakeAVAXStats,
  });

  const { data: bnbData, loading: isBnbDataLoading } = useQuery({
    type: fetchStakeBNBStats,
  });

  const { data: ethData, loading: isEthDataLoading } = useQuery({
    type: fetchStakeETHStats,
  });

  const { data: ftmData, loading: isFtmDataLoading } = useQuery({
    type: fetchStakeFTMStats,
  });

  const { data: ankrBalanceData, loading: isLoadingAnkrBalanceData } = useQuery(
    { type: fetchAnkrData },
  );

  const { data: ankrPrice, loading: isAnkrPriceLoading } = useQuery({
    type: getANKRPrice,
  });

  const { data: dotBalance, loading: isLoadingDotBalance } = useQuery({
    type: fetchPolkadotAccountFullBalance,
    requestKey: getPolkadotRequestKey(EPolkadotNetworks.DOT),
  });

  const { data: ksmBalance, loading: isLoadingKsmBalance } = useQuery({
    type: fetchPolkadotAccountFullBalance,
    requestKey: getPolkadotRequestKey(EPolkadotNetworks.KSM),
  });

  const { data: wndBalance, loading: isLoadingWndBalance } = useQuery({
    type: fetchPolkadotAccountFullBalance,
    requestKey: getPolkadotRequestKey(EPolkadotNetworks.WND),
  });

  const { data: dotClaimableBalance, loading: isDotClaimableBalanceLoading } =
    useQuery({
      type: fetchETHTokenClaimableBalance,
      requestKey: getPolkadotRequestKey(EPolkadotNetworks.DOT),
    });

  const { data: ksmClaimableBalance, loading: isKsmClaimableBalanceLoading } =
    useQuery({
      type: fetchETHTokenClaimableBalance,
      requestKey: getPolkadotRequestKey(EPolkadotNetworks.KSM),
    });

  const { data: wndClaimableBalance, loading: isWndClaimableBalanceLoading } =
    useQuery({
      type: fetchETHTokenClaimableBalance,
      requestKey: getPolkadotRequestKey(EPolkadotNetworks.WND),
    });

  const { data: maxAnkrApy } = useQuery({
    type: getMaxApy,
  });

  const nativeData = useMemo(
    () => [
      {
        name: Token.MATIC,
        amount: polygonData?.maticBalance ?? ZERO,
        apy: metrics?.matic.apy ?? ZERO,
        service: EMetricsServiceName.MATIC,
        link: StakeMaticRoutes.stake.generatePath(),
      },
      {
        name: Token.AVAX,
        amount: avaxData?.avaxBalance ?? ZERO,
        apy: metrics?.avax.apy ?? ZERO,
        service: EMetricsServiceName.AVAX,
        link: StakeAvalancheRoutes.stake.generatePath(),
      },
      {
        name: Token.FTM,
        amount: ftmData?.ftmBalance ?? ZERO,
        apy: metrics?.ftm.apy ?? ZERO,
        service: EMetricsServiceName.FTM,
        link: StakeFantomRoutes.stake.generatePath(),
      },
      {
        name: Token.BNB,
        amount: bnbData?.bnbBalance ?? ZERO,
        apy: metrics?.bnb.apy ?? ZERO,
        service: EMetricsServiceName.BNB,
        link: StakeBnbRoutes.stake.generatePath(),
      },
      {
        name: Token.ETH,
        amount:
          ethData?.ethBalance
            .plus(ethData.claimableAETHB ?? ZERO)
            .plus(ethData.claimableAETHC ?? ZERO) ?? ZERO,
        apy: metrics?.eth.apy ?? ZERO,
        service: EMetricsServiceName.ETH,
        link: StakeEthRoutes.stake.generatePath(),
      },
      {
        name: Token.ANKR,
        amount:
          ankrBalanceData?.ankrBalance.multipliedBy(ankrPrice ?? ZERO) ?? ZERO,
        apy: maxAnkrApy ?? ZERO,
        link: StakeAnkrRoutes.stake.generatePath(),
      },
      {
        name: Token.DOT,
        amount:
          dotBalance?.plus(dotClaimableBalance?.claimable ?? ZERO) ?? ZERO,
        apy: metrics?.dot.apy ?? ZERO,
        service: EMetricsServiceName.DOT,
        link: StakePolkadotRoutes.stake.generatePath(EPolkadotNetworks.DOT),
      },
      {
        name: Token.KSM,
        amount:
          ksmBalance?.plus(ksmClaimableBalance?.claimable ?? ZERO) ?? ZERO,
        apy: metrics?.ksm.apy ?? ZERO,
        service: EMetricsServiceName.KSM,
        link: StakePolkadotRoutes.stake.generatePath(EPolkadotNetworks.KSM),
      },
      {
        name: Token.WND,
        amount: featuresConfig.testingUi
          ? wndBalance?.plus(wndClaimableBalance?.claimable ?? ZERO) ?? ZERO
          : ZERO,
        apy: featuresConfig.testingUi ? metrics?.wnd?.apy ?? ZERO : ZERO,
        service: EMetricsServiceName.WND,
        link: StakePolkadotRoutes.stake.generatePath(EPolkadotNetworks.WND),
      },
    ],
    [
      maxAnkrApy,
      metrics,
      dotBalance,
      ksmBalance,
      wndBalance,
      ankrBalanceData,
      avaxData,
      ftmData,
      polygonData,
      bnbData,
      ethData,
      ankrPrice,
      dotClaimableBalance,
      ksmClaimableBalance,
      wndClaimableBalance,
    ],
  );

  const usdAmounts = nativeData.map(item =>
    item.service
      ? getUSDAmount({
          amount: item.amount,
          totalStaked: metrics?.[item.service]?.totalStaked,
          totalStakedUsd: metrics?.[item.service]?.totalStakedUsd,
        }) ?? ZERO
      : item.amount,
  );

  const yieldAmoutsUsd = nativeData.map((item, index) =>
    usdAmounts[index]
      .multipliedBy(item.apy)
      .dividedBy(100)
      .plus(usdAmounts[index]),
  );

  const totalYieldAmountUsd = useMemo(
    () => yieldAmoutsUsd.reduce((acc, item) => acc.plus(item), ZERO),
    [yieldAmoutsUsd],
  );

  const totalAmountUsd = useMemo(
    () => usdAmounts.reduce((acc, item) => acc.plus(item), ZERO),
    [usdAmounts],
  );

  const apr = !totalAmountUsd.isZero()
    ? totalYieldAmountUsd.multipliedBy(100).dividedBy(totalAmountUsd).minus(100)
    : ZERO;

  const data = useMemo(
    () =>
      nativeData
        .map((item, index) => ({
          ...item,
          isNative: true,
          amount: item.amount.decimalPlaces(DECIMAL_PLACES),
          usdAmount: usdAmounts[index].decimalPlaces(DEFAULT_ROUNDING),
          yieldAmount: item.amount
            .multipliedBy(item.apy)
            .dividedBy(100)
            .decimalPlaces(DEFAULT_ROUNDING),
          yieldAmountUsd: yieldAmoutsUsd[index].decimalPlaces(DEFAULT_ROUNDING),
          percent: !totalAmountUsd.isZero()
            ? usdAmounts[index]
                .multipliedBy(100)
                .dividedBy(totalAmountUsd)
                .decimalPlaces(DEFAULT_ROUNDING)
                .toNumber()
            : 0,
          apy: item.apy.decimalPlaces(DEFAULT_ROUNDING),
          icon: iconByTokenMap[item.name],
        }))
        .filter(({ amount }) => !amount.isZero()),
    [totalAmountUsd, usdAmounts, nativeData, yieldAmoutsUsd],
  );

  return {
    isLoading:
      isPolygonDataLoading ||
      isAvaxDataLoading ||
      isBnbDataLoading ||
      isEthDataLoading ||
      isFtmDataLoading ||
      isLoadingAnkrBalanceData ||
      isLoadingDotBalance ||
      isLoadingKsmBalance ||
      isLoadingWndBalance ||
      isDotClaimableBalanceLoading ||
      isKsmClaimableBalanceLoading ||
      isWndClaimableBalanceLoading ||
      isAnkrPriceLoading,
    totalAmountUsd: totalAmountUsd.decimalPlaces(DEFAULT_ROUNDING),
    apr: apr.decimalPlaces(DEFAULT_ROUNDING),
    totalYieldAmountUsd: totalYieldAmountUsd
      .minus(totalAmountUsd)
      .decimalPlaces(DEFAULT_ROUNDING),
    data,
  };
};
