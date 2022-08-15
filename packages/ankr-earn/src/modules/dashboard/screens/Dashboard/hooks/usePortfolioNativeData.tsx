import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { DECIMAL_PLACES, DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { iconByTokenMap, TIcon } from 'modules/common/icons';
import { Token } from 'modules/common/types/token';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getCommonData as fetchAnkrData } from 'modules/stake-ankr/actions/getCommonData';
import { fetchStats as fetchStakeAVAXStats } from 'modules/stake-avax/actions/fetchStats';
import { fetchStats as fetchStakeBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { getCommonData as fetchStakeETHStats } from 'modules/stake-eth/actions/getCommonData';
import { getCommonData as fetchStakeFTMStats } from 'modules/stake-fantom/actions/getCommonData';
import { fetchStats as fetchStakePolygonStats } from 'modules/stake-matic/eth/actions/fetchStats';
import { fetchETHTokenClaimableBalance } from 'modules/stake-polkadot/actions/fetchETHTokenClaimableBalance';
import { fetchPolkadotAccountFullBalance } from 'modules/stake-polkadot/actions/fetchPolkadotAccountFullBalance';
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

  const nativeData = useMemo(
    () => [
      {
        name: Token.MATIC,
        amount: polygonData?.maticBalance ?? ZERO,
        service: EMetricsServiceName.MATIC,
      },
      {
        name: Token.AVAX,
        amount: avaxData?.avaxBalance ?? ZERO,
        service: EMetricsServiceName.AVAX,
      },
      {
        name: Token.FTM,
        amount: ftmData?.ftmBalance ?? ZERO,
        service: EMetricsServiceName.FTM,
      },
      {
        name: Token.BNB,
        amount: bnbData?.bnbBalance ?? ZERO,
        service: EMetricsServiceName.BNB,
      },
      {
        name: Token.ETH,
        amount:
          ethData?.ethBalance
            .plus(ethData.claimableAETHB ?? ZERO)
            .plus(ethData.claimableAETHC ?? ZERO) ?? ZERO,
        service: EMetricsServiceName.ETH,
      },
      {
        name: Token.ANKR,
        amount:
          ankrBalanceData?.ankrBalance.multipliedBy(ankrPrice ?? ZERO) ?? ZERO,
      },
      {
        name: Token.DOT,
        amount:
          dotBalance?.plus(dotClaimableBalance?.claimable ?? ZERO) ?? ZERO,
        service: EMetricsServiceName.DOT,
      },
      {
        name: Token.KSM,
        amount:
          ksmBalance?.plus(ksmClaimableBalance?.claimable ?? ZERO) ?? ZERO,
        service: EMetricsServiceName.KSM,
      },
      {
        name: Token.WND,
        amount:
          wndBalance?.plus(wndClaimableBalance?.claimable ?? ZERO) ?? ZERO,
        service: EMetricsServiceName.WND,
      },
    ],
    [
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

  const totalAmountUsd = useMemo(
    () => usdAmounts.reduce((acc, item) => acc.plus(item), ZERO),
    [usdAmounts],
  );

  const data = useMemo(
    () =>
      nativeData
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
    [totalAmountUsd, usdAmounts, nativeData],
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
    data,
  };
};
