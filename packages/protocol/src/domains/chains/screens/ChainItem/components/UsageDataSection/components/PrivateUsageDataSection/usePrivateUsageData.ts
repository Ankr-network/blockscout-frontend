import { PrivateStat, PrivateStatTopRequests } from 'multirpc-sdk';
import { ChainType, Timeframe } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { UsageData } from '../../types';
import {
  checkPrivateChainsAndGetChainId,
  timeframeToIntervalMap,
} from '../../const';
import { getPrivateUsageData } from './PrivateUsageDataSectionUtils';
import { getStatsChainId } from '../../../ChainItemSections/utils/getStatsChainId';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useMonthPrivateStats } from 'domains/chains/hooks/useMonthPrivateStats';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';
import { useUserRequestsByIp } from 'domains/chains/hooks/useUserRequestsByIp';
import { ChainID } from 'modules/chains/types';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';

export interface UsageDataParams {
  chain: IApiChain;
  chainType: ChainType;
  group: EndpointGroup;
  timeframe: Timeframe;
}

const getUserTopRequest = (
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
  chainType,
  group,
  timeframe,
}: UsageDataParams): UsageData => {
  const { loading: isConnecting } = useAuth();

  const { isChainProtocolSwitchEnabled, chainProtocol } =
    useChainProtocolContext();

  const chainId = getStatsChainId({
    publicChain: chain,
    chainType,
    group,
    isChainProtocolSwitchEnabled,
    chainProtocol,
  });

  const privateCheckedChainId = checkPrivateChainsAndGetChainId(chainId);

  const { selectedProject: userEndpointToken } =
    useTokenManagerConfigSelector();

  const {
    arePrivateStatsLoading,
    data: { stats: privateStats = {} },
    privateStatsError,
  } = usePrivateStats({
    interval: timeframeToIntervalMap[timeframe],
    userEndpointToken,
  });

  const userTopRequests = getUserTopRequest(
    privateStats,
    privateCheckedChainId,
  );

  const [{ stats: day30PrivateStats = {} }, areDay30PrivateStatsLoading] =
    useMonthPrivateStats();

  const userTopRequestsIp = useUserRequestsByIp({
    day30PrivateStats,
    chainId: privateCheckedChainId,
  });

  return getPrivateUsageData({
    isConnecting,
    arePrivateStatsLoading:
      arePrivateStatsLoading || areDay30PrivateStatsLoading,
    privateStatsError,
    privateStats: privateStats[privateCheckedChainId],
    day30PrivateStats: day30PrivateStats[privateCheckedChainId], // TODO: remove upon backend support for other timeframes
    timeframe,
    userTopRequests,
    userTopRequestsIp,
  });
};
