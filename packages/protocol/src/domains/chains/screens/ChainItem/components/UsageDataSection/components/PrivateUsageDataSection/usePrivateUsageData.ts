import { PrivateStat, PrivateStatTopRequests } from 'multirpc-sdk';
import { useMemo } from 'react';

import {
  ChainID,
  Chain,
  ChainType,
  Timeframe,
  ChainSubType,
} from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { getStatsChainId } from 'domains/chains/screens/ChainItem/components/ChainItemSections/utils/getStatsChainId';
import { useTop10Stats } from 'domains/dashboard/screens/Dashboard/components/AllChainsLayout/v1/hooks/useTop10Stats';
import { CountryMap } from 'domains/chains/actions/public/fetchChainTimeframeData';
import { ALL_PROJECTS_VALUE } from 'domains/projects/const';

import { getPrivateUsageData } from './PrivateUsageDataSectionUtils';
import { checkPrivateChainsAndGetChainId } from '../../const';
import { UsageData } from '../../types';
import { ChainProtocol } from '../../../../constants/ChainProtocolContext';

export interface UsageDataParams {
  chain: Chain;
  chainType: ChainType;
  chainSubType?: ChainSubType;
  group: EndpointGroup;
  timeframe: Timeframe;
  chainProtocol?: ChainProtocol;
  isChainProtocolSwitchEnabled?: boolean;
}

export const getUserTopRequest = (
  privateStats: Partial<Record<string, PrivateStat>>,
  chainId: ChainID,
): PrivateStatTopRequests[] => {
  const othersInfo = privateStats[chainId]?.total?.others_info;

  const topRequests = privateStats[chainId]?.total?.top_requests || [];

  const othersInfoMapped: PrivateStatTopRequests | undefined =
    othersInfo?.type_count
      ? {
          method: `${othersInfo.type_count} other methods`,
          count: othersInfo.request_count || 0,
          total_cost: othersInfo.total_cost || 0,
        }
      : undefined;

  return othersInfoMapped ? [...topRequests, othersInfoMapped] : topRequests;
};

export const usePrivateUsageData = ({
  chain,
  chainProtocol,
  chainSubType,
  chainType,
  group,
  isChainProtocolSwitchEnabled,
  timeframe,
}: UsageDataParams): UsageData => {
  const { loading: isConnecting } = useAuth();

  const chainId = getStatsChainId({
    publicChain: chain,
    chainType,
    chainSubType,
    group,
    isChainProtocolSwitchEnabled,
    chainProtocol,
  });

  const privateCheckedChainId = checkPrivateChainsAndGetChainId(chainId);

  const {
    arePrivateStatsLoading,
    data: { stats: privateStats = {} },
    privateStatsError,
  } = usePrivateStats({
    interval: timeframeToIntervalMap[timeframe],
    userEndpointToken: ALL_PROJECTS_VALUE,
  });

  const { top10Data } = useTop10Stats(timeframe, privateCheckedChainId);

  const userTopRequests = getUserTopRequest(
    privateStats,
    privateCheckedChainId,
  );

  const countries: CountryMap = useMemo(() => {
    if (!top10Data?.countries) {
      return {};
    }

    return top10Data.countries.reduce(
      (acc, { key: country, value: requests }) => ({
        ...acc,
        [country]: { country, requests },
      }),
      {},
    );
  }, [top10Data]);

  return {
    ...getPrivateUsageData({
      isConnecting,
      arePrivateStatsLoading,
      privateStatsError,
      privateStats: privateStats[privateCheckedChainId],
      timeframe,
      userTopRequests,
    }),
    countries,
  };
};
