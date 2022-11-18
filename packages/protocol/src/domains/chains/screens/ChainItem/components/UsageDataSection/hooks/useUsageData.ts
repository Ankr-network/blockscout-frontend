import { useAuth } from 'domains/auth/hooks/useAuth';
import { IApiChain } from 'domains/chains/api/queryChains';
import { useMonthPrivateStats } from 'domains/chains/hooks/useMonthPrivateStats';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';
import { useUserRequestsByIp } from 'domains/chains/hooks/useUserRequestsByIp';
import { useUserTopRequests } from 'domains/chains/hooks/useUserTopRequests';
import { ChainType, Timeframe } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import {
  checkPrivateSecretChainsAndGetChainId,
  checkPublicSecretChainsAndGetChainId,
  timeframeToIntervalMap,
} from '../const';
import { UsageData } from '../types';
import { getChainId } from '../utils/getChainId';
import { getUsageData } from '../utils/getUsageData';
import { usePublicStats } from './usePublicStats';

export interface UsageDataParams {
  chain: IApiChain;
  chainType: ChainType;
  group: EndpointGroup;
  timeframe: Timeframe;
}

export const useUsageData = ({
  chain,
  chainType,
  group,
  timeframe,
}: UsageDataParams): UsageData => {
  const { isWalletConnected, loading: isConnecting } = useAuth();
  const chainId = getChainId({
    publicChain: chain,
    chainType,
    group,
    withExceptions: !isWalletConnected,
  });

  const publicCheckedChainId = checkPublicSecretChainsAndGetChainId(chainId);
  const privateCheckedChainId = checkPrivateSecretChainsAndGetChainId(chainId);

  const publicStats = usePublicStats({
    chainId: publicCheckedChainId,
    isWalletConnected,
    timeframe,
  });

  const {
    data: { stats: privateStats = {} },
    arePrivateStatsLoading,
    privateStatsError,
  } = usePrivateStats({
    interval: timeframeToIntervalMap[timeframe],
    isWalletConnected,
  });

  const userTopRequests = useUserTopRequests({
    privateStats,
    chainId: privateCheckedChainId,
    timeframe,
  });

  const [{ stats: day30PrivateStats = {} }, areDay30PrivateStatsLoading] =
    useMonthPrivateStats({
      isWalletConnected,
    });

  const userTopRequestsIp = useUserRequestsByIp({
    day30PrivateStats,
    chainId: privateCheckedChainId,
  });

  return getUsageData({
    isConnecting,
    isWalletConnected,
    arePrivateStatsLoading:
      arePrivateStatsLoading || areDay30PrivateStatsLoading,
    privateStatsError,
    privateStats: privateStats[privateCheckedChainId],
    day30PrivateStats: day30PrivateStats[privateCheckedChainId], // TODO: remove upon backend support for other timeframes
    publicStats,
    timeframe,
    userTopRequests,
    userTopRequestsIp,
  });
};
