import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import {
  ACTION_CACHE_SEC,
  DECIMAL_PLACES,
  DEFAULT_ROUNDING,
  featuresConfig,
  ZERO,
} from 'modules/common/const';
import { iconByTokenMap, TIcon } from 'modules/common/icons';
import { Token } from 'modules/common/types/token';
import { fetchAETHBBridged } from 'modules/dashboard/actions/fetchAETHBBridged';
import { fetchAETHCBridged } from 'modules/dashboard/actions/fetchAETHCBridged';
import { fetchAMATICBBridgedBSC } from 'modules/dashboard/actions/fetchAMATICBBridgedBSC';
import { fetchAMATICCBridgedBSC } from 'modules/dashboard/actions/fetchAMATICCBridgedBSC';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { useGetAnkrPriceQuery } from 'modules/stake-ankr/actions/getANKRPrice';
import { useGetTotalInfoQuery } from 'modules/stake-ankr/actions/getTotalInfo';
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/useGetAVAXCommonDataQuery';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/useGetBNBStatsQuery';
import { getClaimableData as fetchStakeETHClaimableStats } from 'modules/stake-eth/actions/getClaimableData';
import { getCommonData as fetchStakeETHStats } from 'modules/stake-eth/actions/getCommonData';
import { useGetFTMCommonDataQuery } from 'modules/stake-fantom/actions/getCommonData';
import { fetchStats as fetchStakeMaticEthStats } from 'modules/stake-matic/eth/actions/fetchStats';
import { getCommonData as getMaticPolygonCommonData } from 'modules/stake-matic/polygon/actions/getCommonData';
import { getMaxApr as getMGNOMaxApr } from 'modules/stake-mgno/actions/getMaxApr';
import { getMGNOPrice } from 'modules/stake-mgno/actions/getMGNOPrice';
import { getTotalInfo as getMGNOTotalInfo } from 'modules/stake-mgno/actions/getTotalInfo';
import { fetchETHTokenBalance } from 'modules/stake-polkadot/actions/fetchETHTokenBalance';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';
import { useGetDashboardDataQuery as getXDCDashboardData } from 'modules/stake-xdc/actions/getDashboardData';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { SMALL_PRICE_TOKENS } from '../../const';

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
}

export const usePortfolioStakedData = (): IUsePortfolioData => {
  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const { data: maticEthData, loading: isMaticEthDataLoading } = useQuery({
    type: fetchStakeMaticEthStats,
  });

  const { data: avaxData, isFetching: isAvaxDataLoading } =
    useGetAVAXCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: bnbData, isFetching: isBnbDataLoading } = useGetBNBStatsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    },
  );

  const { data: ethData, loading: isEthDataLoading } = useQuery({
    type: fetchStakeETHStats,
  });

  const { data: ethClaimableData, loading: isEthClaimableDataLoading } =
    useQuery({
      type: fetchStakeETHClaimableStats,
    });

  const { data: ftmData, isFetching: isFtmDataLoading } =
    useGetFTMCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const {
    data: aMATICbBridgeBscBalance,
    loading: isMATICbBridgeBscBalanceLoading,
  } = useQuery({
    type: fetchAMATICBBridgedBSC,
  });

  const {
    data: aMATICcBridgeBscBalance,
    loading: isMATICcBridgeBscBalanceLoading,
  } = useQuery({
    type: fetchAMATICCBridgedBSC,
  });

  const { data: maticPolygonBalances, loading: isMaticPolygonBalancesLoading } =
    useQuery({
      type: getMaticPolygonCommonData,
    });

  const { data: aDOTbBalance, loading: isDotBalanceLoading } = useQuery({
    type: fetchETHTokenBalance,
    requestKey: getPolkadotRequestKey(EPolkadotNetworks.DOT),
  });

  const { data: aKSMbBalance, loading: isKsmBalanceLoading } = useQuery({
    type: fetchETHTokenBalance,
    requestKey: getPolkadotRequestKey(EPolkadotNetworks.KSM),
  });

  const { data: aWNDbBalance, loading: isWndBalanceLoading } = useQuery({
    type: fetchETHTokenBalance,
    requestKey: getPolkadotRequestKey(EPolkadotNetworks.WND),
  });

  const { data: aETHbBridgeBalance, loading: isETHbBridgeBalanceLoading } =
    useQuery({
      type: fetchAETHBBridged,
    });

  const { data: aETHcBridgeBalance, loading: isETHcBridgeBalanceLoading } =
    useQuery({
      type: fetchAETHCBridged,
    });

  const { data: ankrData, isFetching: isLoadingAnkrData } =
    useGetTotalInfoQuery();

  const { data: ankrPrice, isFetching: isAnkrPriceLoading } =
    useGetAnkrPriceQuery();

  const { data: mgnoData, loading: isLoadingMgnoData } = useQuery({
    type: getMGNOTotalInfo,
  });

  const { data: mgnoPrice, loading: isMgnoPriceLoading } = useQuery({
    type: getMGNOPrice,
  });

  const { data: maxMgnoApr } = useQuery({
    type: getMGNOMaxApr,
  });

  const { data: xdcData, isFetching: isXDCDataLoading } = getXDCDashboardData(
    undefined,
    {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    },
  );

  const stakedData = useMemo(() => {
    const data = [
      {
        name: Token.aMATICb,
        amount: (maticEthData?.aMATICbBalance ?? ZERO)
          .plus(aMATICbBridgeBscBalance ?? ZERO)
          .plus(maticPolygonBalances?.maticBondBalance ?? ZERO),
        apy: metrics?.matic.apy ?? ZERO,
        service: EMetricsServiceName.MATIC,
      },
      {
        name: Token.aMATICc,
        amount: (maticEthData?.aMATICcBalance ?? ZERO)
          .plus(maticPolygonBalances?.maticCertBalance ?? ZERO)
          .plus(aMATICcBridgeBscBalance ?? ZERO),
        service: EMetricsServiceName.MATIC,
        apy: metrics?.matic.apy ?? ZERO,
        ratio: maticEthData?.aMATICcRatio,
      },
      {
        name: Token.aAVAXb,
        amount: avaxData?.aAVAXbBalance ?? ZERO,
        apy: metrics?.avax.apy ?? ZERO,
        service: EMetricsServiceName.AVAX,
      },
      {
        name: Token.aAVAXc,
        amount: avaxData?.aAVAXcBalance ?? ZERO,
        service: EMetricsServiceName.AVAX,
        apy: metrics?.avax.apy ?? ZERO,
        ratio: avaxData?.aAVAXcRatio,
      },
      {
        name: Token.aBNBb,
        amount: bnbData?.aBNBbBalance ?? ZERO,
        apy: metrics?.bnb.apy ?? ZERO,
        service: EMetricsServiceName.BNB,
      },
      {
        name: Token.aBNBc,
        amount: bnbData?.aBNBcBalance ?? ZERO,
        service: EMetricsServiceName.BNB,
        apy: metrics?.bnb.apy ?? ZERO,
        ratio: bnbData?.aBNBcRatio,
      },
      {
        name: Token.aETHb,
        amount: (ethData?.aETHbBalance ?? ZERO)
          .plus(ethClaimableData?.claimableAETHB ?? ZERO)
          .plus(aETHbBridgeBalance ?? ZERO),
        apy: metrics?.eth.apy ?? ZERO,
        service: EMetricsServiceName.ETH,
      },
      {
        name: Token.aETHc,
        amount: (ethData?.aETHcBalance ?? ZERO)
          .plus(ethClaimableData?.claimableAETHC ?? ZERO)
          .plus(aETHcBridgeBalance ?? ZERO),
        service: EMetricsServiceName.ETH,
        apy: metrics?.eth.apy ?? ZERO,
        ratio: ethData?.aETHcRatio,
      },
      {
        name: Token.aFTMb,
        amount: ftmData?.aFTMbBalance ?? ZERO,
        apy: metrics?.ftm.apy ?? ZERO,
        service: EMetricsServiceName.FTM,
      },
      {
        name: Token.aFTMc,
        amount: ftmData?.aFTMcBalance ?? ZERO,
        service: EMetricsServiceName.FTM,
        apy: metrics?.ftm.apy ?? ZERO,
        ratio: ftmData?.aFTMcRatio,
      },
      {
        name: Token.aDOTb,
        amount: aDOTbBalance ?? ZERO,
        apy: metrics?.dot.apy ?? ZERO,
        service: EMetricsServiceName.DOT,
      },
      {
        name: Token.aKSMb,
        amount: aKSMbBalance ?? ZERO,
        apy: metrics?.ksm.apy ?? ZERO,
        service: EMetricsServiceName.KSM,
      },
      {
        name: Token.WND,
        amount: featuresConfig.testingUi ? aWNDbBalance ?? ZERO : ZERO,
        apy: featuresConfig.testingUi ? metrics?.wnd?.apy ?? ZERO : ZERO,
        service: EMetricsServiceName.WND,
      },
      {
        name: Token.ANKR,
        apy: metrics?.ankr.apy ?? ZERO,
        amount: ankrData?.totalDelegatedAmount ?? ZERO,
      },
      {
        name: Token.mGNO,
        apy: maxMgnoApr ?? ZERO,
        amount: mgnoData?.myTotalDelegatedAmount ?? ZERO,
      },
    ];

    if (featuresConfig.xdcStaking) {
      data.push({
        name: Token.aXDCc,
        amount: xdcData?.aXDCcBalance ?? ZERO,
        service: EMetricsServiceName.XDC,
        apy: metrics?.[EMetricsServiceName.XDC]?.apy ?? ZERO,
        ratio: xdcData?.aXDCcRatio,
      });
    }

    return data;
  }, [
    metrics,
    avaxData,
    ftmData,
    aMATICbBridgeBscBalance,
    aMATICcBridgeBscBalance,
    aDOTbBalance,
    aKSMbBalance,
    aWNDbBalance,
    maticEthData,
    aETHbBridgeBalance,
    aETHcBridgeBalance,
    bnbData,
    ethData,
    ethClaimableData,
    ankrData,
    maticPolygonBalances,
    maxMgnoApr,
    mgnoData,
    xdcData,
  ]);

  const usdAmounts = stakedData.map(item => {
    if (item.service) {
      return (
        getUSDAmount({
          amount: item.amount,
          ratio: item.ratio,
          totalStaked: metrics?.[item.service]?.totalStaked,
          totalStakedUsd: metrics?.[item.service]?.totalStakedUsd,
        }) ?? ZERO
      );
    }

    if (item.name === Token.ANKR) {
      return item.amount.multipliedBy(ankrPrice ?? ZERO);
    }

    if (item.name === Token.mGNO) {
      return item.amount.multipliedBy(mgnoPrice ?? ZERO);
    }

    return ZERO;
  });

  const yieldAmoutsUsd = stakedData.map((item, index) =>
    usdAmounts[index].multipliedBy(item.apy).dividedBy(100),
  );

  const totalAmountUsd = useMemo(
    () => usdAmounts.reduce((acc, item) => acc.plus(item), ZERO),
    [usdAmounts],
  );

  const totalYieldAmountUsd = useMemo(
    () =>
      yieldAmoutsUsd.reduce(
        (acc, item, index) => acc.plus(item).plus(usdAmounts[index]),
        ZERO,
      ),
    [yieldAmoutsUsd, usdAmounts],
  );

  const apr = !totalAmountUsd.isZero()
    ? totalYieldAmountUsd.multipliedBy(100).dividedBy(totalAmountUsd).minus(100)
    : ZERO;

  const data = useMemo(
    () =>
      stakedData
        .map((item, index) => ({
          ...item,
          isNative: false,
          amount: item.amount.decimalPlaces(
            !SMALL_PRICE_TOKENS.includes(item.name) ? DECIMAL_PLACES : 0,
          ),
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
    [totalAmountUsd, usdAmounts, stakedData, yieldAmoutsUsd],
  );

  return {
    isLoading:
      isMaticEthDataLoading ||
      isAvaxDataLoading ||
      isBnbDataLoading ||
      isEthDataLoading ||
      isEthClaimableDataLoading ||
      isFtmDataLoading ||
      isMATICbBridgeBscBalanceLoading ||
      isMATICcBridgeBscBalanceLoading ||
      isDotBalanceLoading ||
      isKsmBalanceLoading ||
      isWndBalanceLoading ||
      isETHbBridgeBalanceLoading ||
      isETHcBridgeBalanceLoading ||
      isLoadingAnkrData ||
      isMaticPolygonBalancesLoading ||
      isAnkrPriceLoading ||
      isLoadingMgnoData ||
      isMgnoPriceLoading ||
      isXDCDataLoading,
    apr: apr.decimalPlaces(DEFAULT_ROUNDING),
    totalAmountUsd: totalAmountUsd.decimalPlaces(DEFAULT_ROUNDING),
    totalYieldAmountUsd: totalYieldAmountUsd
      .minus(totalAmountUsd)
      .decimalPlaces(DEFAULT_ROUNDING),
    data,
  };
};
