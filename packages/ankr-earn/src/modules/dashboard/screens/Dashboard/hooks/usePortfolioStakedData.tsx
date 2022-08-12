import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { DECIMAL_PLACES, DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { iconByTokenMap, TIcon } from 'modules/common/icons';
import { Token } from 'modules/common/types/token';
import { fetchAETHBBridged } from 'modules/dashboard/actions/fetchAETHBBridged';
import { fetchAETHCBridged } from 'modules/dashboard/actions/fetchAETHCBridged';
import { fetchAMATICBBridged } from 'modules/dashboard/actions/fetchAMATICBBridged';
import { fetchAMATICBBridgedBSC } from 'modules/dashboard/actions/fetchAMATICBBridgedBSC';
import { fetchAMATICCBridgedBSC } from 'modules/dashboard/actions/fetchAMATICCBridgedBSC';
import { fetchAMATICCBridgedPolygon } from 'modules/dashboard/actions/fetchAMATICCBridgedPolygon';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getTotalInfo as getAnkrTotalInfo } from 'modules/stake-ankr/actions/getTotalInfo';
import { fetchStats as fetchStakeAVAXStats } from 'modules/stake-avax/actions/fetchStats';
import { fetchStats as fetchStakeBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { getCommonData as fetchStakeETHStats } from 'modules/stake-eth/actions/getCommonData';
import { getCommonData as fetchStakeFTMStats } from 'modules/stake-fantom/actions/getCommonData';
import { fetchStats as fetchStakePolygonStats } from 'modules/stake-matic/eth/actions/fetchStats';
import { fetchETHTokenBalance } from 'modules/stake-polkadot/actions/fetchETHTokenBalance';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

export interface IUsePortfolioData {
  isLoading: boolean;
  totalAmountUsd: BigNumber;
  data: IPortfolioItem[];
}

interface IPortfolioItem {
  name: Token;
  percent: number;
  usdAmount: BigNumber;
  amount: BigNumber;
  icon: TIcon;
}

export const usePortfolioStakedData = (): IUsePortfolioData => {
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

  const {
    data: aMATICbBridgePolygonBalance,
    loading: isMATICbBridgePolygonBalanceLoading,
  } = useQuery({
    type: fetchAMATICBBridged,
  });

  const {
    data: aMATICcBridgePolygonBalance,
    loading: isMATICcBridgePolygonBalanceLoading,
  } = useQuery({
    type: fetchAMATICCBridgedPolygon,
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

  const { data: ankrData, loading: isLoadingAnkrData } = useQuery({
    type: getAnkrTotalInfo,
  });
  const { data: ankrPrice, loading: isAnkrPriceLoading } = useQuery({
    type: getANKRPrice,
  });

  const stakedData = useMemo(
    () => [
      {
        name: Token.aMATICb,
        amount:
          polygonData?.aMATICbBalance
            .plus(aMATICbBridgeBscBalance ?? ZERO)
            .plus(aMATICbBridgePolygonBalance ?? ZERO) ?? ZERO,
        service: EMetricsServiceName.MATIC,
      },
      {
        name: Token.aMATICc,
        amount:
          polygonData?.aMATICcBalance
            .plus(aMATICcBridgePolygonBalance ?? ZERO)
            .plus(aMATICcBridgeBscBalance ?? ZERO) ?? ZERO,
        service: EMetricsServiceName.MATIC,
        ratio: polygonData?.aMATICcRatio,
      },
      {
        name: Token.aAVAXb,
        amount: avaxData?.aAVAXbBalance ?? ZERO,
        service: EMetricsServiceName.AVAX,
      },
      {
        name: Token.aAVAXc,
        amount: avaxData?.aAVAXcBalance ?? ZERO,
        service: EMetricsServiceName.AVAX,
        ratio: avaxData?.aAVAXcRatio,
      },
      {
        name: Token.aBNBb,
        amount: bnbData?.aBNBbBalance ?? ZERO,
        service: EMetricsServiceName.BNB,
      },
      {
        name: Token.aBNBc,
        amount: bnbData?.aBNBcBalance ?? ZERO,
        service: EMetricsServiceName.BNB,
        ratio: bnbData?.aBNBcRatio,
      },
      {
        name: Token.aETHb,
        amount:
          ethData?.aETHbBalance
            .plus(ethData?.claimableAETHB ?? ZERO)
            .plus(aETHbBridgeBalance ?? ZERO) ?? ZERO,
        service: EMetricsServiceName.ETH,
      },
      {
        name: Token.aETHc,
        amount:
          ethData?.aETHcBalance
            .plus(ethData?.claimableAETHC ?? ZERO)
            .plus(aETHcBridgeBalance ?? ZERO) ?? ZERO,
        service: EMetricsServiceName.ETH,
        ratio: ethData?.aETHcRatio,
      },
      {
        name: Token.aFTMb,
        amount: ftmData?.aFTMbBalance ?? ZERO,
        service: EMetricsServiceName.FTM,
      },
      {
        name: Token.aFTMc,
        amount: ftmData?.aFTMcBalance ?? ZERO,
        service: EMetricsServiceName.FTM,
        ratio: ftmData?.aFTMcRatio,
      },
      {
        name: Token.aDOTb,
        amount: aDOTbBalance ?? ZERO,
        service: EMetricsServiceName.DOT,
      },
      {
        name: Token.aKSMb,
        amount: aKSMbBalance ?? ZERO,
        service: EMetricsServiceName.KSM,
      },
      {
        name: Token.WND,
        amount: aWNDbBalance ?? ZERO,
        service: EMetricsServiceName.WND,
      },
      {
        name: Token.ANKR,
        amount:
          ankrData?.totalDelegatedAmount.multipliedBy(ankrPrice ?? ZERO) ??
          ZERO,
      },
    ],
    [
      ankrPrice,
      avaxData,
      ftmData,
      aMATICbBridgeBscBalance,
      aMATICcBridgeBscBalance,
      aDOTbBalance,
      aKSMbBalance,
      aWNDbBalance,
      aMATICcBridgePolygonBalance,
      polygonData,
      aETHbBridgeBalance,
      aETHcBridgeBalance,
      bnbData,
      ethData,
      ankrData,
      aMATICbBridgePolygonBalance,
    ],
  );

  const usdAmounts = stakedData.map(item =>
    item.service
      ? getUSDAmount({
          amount: item.amount,
          ratio: item.ratio,
          totalStaked: metrics?.[item.service]?.totalStaked,
          totalStakedUsd: metrics?.[item.service]?.totalStakedUsd,
        }) ?? ZERO
      : item.amount,
  );

  const totalAmountUsd = useMemo(
    () => usdAmounts.reduce((acc, item) => acc.plus(item), ZERO),
    [usdAmounts],
  );

  const data = useMemo(
    () =>
      stakedData
        .map((item, index) => ({
          ...item,
          amount: item.amount.decimalPlaces(DECIMAL_PLACES),
          usdAmount: usdAmounts[index].decimalPlaces(DEFAULT_ROUNDING),
          percent: !totalAmountUsd.isZero()
            ? usdAmounts[index]
                .multipliedBy(100)
                .dividedBy(totalAmountUsd)
                .decimalPlaces(DEFAULT_ROUNDING)
                .toNumber()
            : 0,
          icon: iconByTokenMap[item.name],
        }))
        .filter(({ amount }) => !amount.isZero()),
    [totalAmountUsd, usdAmounts, stakedData],
  );

  return {
    isLoading:
      isPolygonDataLoading ||
      isAvaxDataLoading ||
      isBnbDataLoading ||
      isEthDataLoading ||
      isFtmDataLoading ||
      isMATICbBridgeBscBalanceLoading ||
      isMATICcBridgeBscBalanceLoading ||
      isMATICcBridgePolygonBalanceLoading ||
      isDotBalanceLoading ||
      isKsmBalanceLoading ||
      isWndBalanceLoading ||
      isETHbBridgeBalanceLoading ||
      isETHcBridgeBalanceLoading ||
      isLoadingAnkrData ||
      isMATICbBridgePolygonBalanceLoading ||
      isAnkrPriceLoading,
    totalAmountUsd: totalAmountUsd.decimalPlaces(DEFAULT_ROUNDING),
    data,
  };
};
