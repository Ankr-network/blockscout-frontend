import {
  Chain,
  ChainSubType,
  ChainType,
  Timeframe,
} from '@ankr.com/chains-list';
import { PrivateStatsInterval } from 'multirpc-sdk';
import { useMemo } from 'react';

import { EndpointGroup } from 'modules/endpoints/types';
import { getChartDataByRequests } from 'domains/chains/utils/getChartDataByRequests';
import { mapUsageDataForChartWidget } from 'modules/chains/utils/mapUsageDataForChartWidget';
import { usePrivateStats } from 'modules/stats/hooks/usePrivateStats';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTimeframe } from 'domains/chains/screens/ChainPage/components/ChainItemSections/hooks/useTimeframe';

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

  const isHourTimeframe = timeframe === Timeframe.Hour;

  const { loading: hourStatsLoading, privateStats: hourStatsResponse } =
    usePrivateStats({
      group: selectedGroupAddress,
      interval: PrivateStatsInterval.HOUR,
      skipFetching: !isHourTimeframe,
    });
  const hourStats = hourStatsResponse.stats;

  const { loading: dayStatsLoading, privateStats: dayStatsResponse } =
    usePrivateStats({
      group: selectedGroupAddress,
      interval: PrivateStatsInterval.DAY,
      skipFetching: isHourTimeframe,
    });
  const dayStats = dayStatsResponse.stats;

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
    if (hourStatsLoading || dayStatsLoading) {
      return undefined;
    }

    switch (timeframe) {
      case Timeframe.Hour:
        return hourStats?.[privateCheckedChainId];
      default:
      case Timeframe.Day:
        return dayStats?.[privateCheckedChainId];
    }
  }, [
    dayStats,
    dayStatsLoading,
    hourStats,
    hourStatsLoading,
    privateCheckedChainId,
    timeframe,
  ]);

  const requestsChartData = getChartDataByRequests({
    isLoggedIn: true,
    timeframe,
    requests: mapUsageDataForChartWidget(privateStats?.counts),
    shouldShowZeroValues: true,
  });

  const requestsCount = privateStats?.total?.count || 0;

  return {
    isLoading: hourStatsLoading || dayStatsLoading,
    requestsChartData,
    requestsCount,
    timeframe,
    timeframeTabs,
  };
};
