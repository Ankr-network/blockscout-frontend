import { useEffect, useMemo } from 'react';
import {
  Chain,
  ChainSubType,
  ChainType,
  Timeframe,
} from '@ankr.com/chains-list';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { getChartDataByRequests } from 'domains/chains/utils/getChartDataByRequests';
import { useLazyFetchChainsStatsForLast1hQuery } from 'domains/chains/actions/private/fetchChainsStatsForLast1h';
import { useLazyFetchChainStatsForLast24hQuery } from 'domains/chains/actions/private/fetchChainsStatsForLast24h';
import { useTimeframe } from 'domains/chains/screens/ChainPage/components/ChainItemSections/hooks/useTimeframe';
import { mapUsageDataForChartWidget } from 'modules/chains/utils/mapUsageDataForChartWidget';
import { EndpointGroup } from 'modules/endpoints/types';

import { useChainProtocolContext } from '../../../hooks/useChainProtocolContext';
import { getStatsChainId } from '../../../components/ChainItemSections/utils/getStatsChainId';
import { checkPrivateChainsAndGetChainId } from '../../../components/UsageDataSection/const';

export interface IPrivateChainRequestsWidgetProps {
  chain: Chain;
  chainType: ChainType;
  chainSubType?: ChainSubType;
  group: EndpointGroup;
}

export const usePrivateChainRequestsWidget = ({
  chain,
  chainSubType,
  chainType,
  group,
}: IPrivateChainRequestsWidgetProps) => {
  const { selectedGroupAddress } = useSelectedUserGroup();

  const { timeframe, timeframeTabs } = useTimeframe({
    initialTimeframe: Timeframe.Day,
    timeframes: [Timeframe.Hour, Timeframe.Day],
  });

  const [
    fetchLast1hStats,
    {
      data: data1hStats,
      isFetching: isFetchingLoading1hStats,
      isLoading: isLoading1hStats,
    },
  ] = useLazyFetchChainsStatsForLast1hQuery();

  const [
    fetchLastDayStats,
    {
      data: dataDayStats,
      isFetching: isFetchingLoadingDayStats,
      isLoading: isLoadingDayStats,
    },
  ] = useLazyFetchChainStatsForLast24hQuery();

  useEffect(() => {
    if (timeframe === Timeframe.Hour) {
      fetchLast1hStats({ group: selectedGroupAddress });
    } else {
      fetchLastDayStats({ group: selectedGroupAddress });
    }
  }, [timeframe, fetchLast1hStats, fetchLastDayStats, selectedGroupAddress]);

  const { chainProtocol, isChainProtocolSwitchEnabled } =
    useChainProtocolContext();

  const chainId = getStatsChainId({
    publicChain: chain,
    chainType,
    chainSubType,
    group,
    isChainProtocolSwitchEnabled,
    chainProtocol,
  });

  const privateCheckedChainId = checkPrivateChainsAndGetChainId(chainId);

  const privateStats = useMemo(() => {
    if (isLoading1hStats || isLoadingDayStats) {
      return undefined;
    }

    switch (timeframe) {
      case Timeframe.Hour:
        return data1hStats?.stats?.[privateCheckedChainId];
      default:
      case Timeframe.Day:
        return dataDayStats?.stats?.[privateCheckedChainId];
    }
  }, [
    isLoading1hStats,
    isLoadingDayStats,
    timeframe,
    data1hStats?.stats,
    privateCheckedChainId,
    dataDayStats?.stats,
  ]);

  const requestsChartData = getChartDataByRequests({
    isLoggedIn: true,
    timeframe,
    requests: mapUsageDataForChartWidget(privateStats?.counts),
    shouldShowZeroValues: true,
  });

  const requestsCount = privateStats?.total?.count || 0;

  return {
    requestsChartData,
    isLoading:
      isLoading1hStats ||
      isLoadingDayStats ||
      isFetchingLoading1hStats ||
      isFetchingLoadingDayStats,
    requestsCount,
    timeframe,
    timeframeTabs,
  };
};
