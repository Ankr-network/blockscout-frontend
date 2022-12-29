import { ChainType, Timeframe } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { UsageData } from '../../types';
import {
  checkPrivateSecretChainsAndGetChainId,
  timeframeToIntervalMap,
} from '../../const';
import { getChainId } from '../../utils/getChainId';
import { getPrivateUsageData } from './getPrivateUsageData';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useMonthPrivateStats } from 'domains/chains/hooks/useMonthPrivateStats';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';
import { useUserRequestsByIp } from 'domains/chains/hooks/useUserRequestsByIp';
import { useUserTopRequests } from 'domains/chains/hooks/useUserTopRequests';

export interface UsageDataParams {
  chain: IApiChain;
  chainType: ChainType;
  group: EndpointGroup;
  timeframe: Timeframe;
}

export const usePrivateUsageData = ({
  chain,
  chainType,
  group,
  timeframe,
}: UsageDataParams): UsageData & { hasPremium: boolean } => {
  const { loading: isConnecting, hasPrivateAccess, hasPremium } = useAuth();

  const chainId = getChainId({
    chainType,
    group,
    publicChain: chain,
  });

  const privateCheckedChainId = checkPrivateSecretChainsAndGetChainId(chainId);

  const {
    arePrivateStatsLoading,
    data: { stats: privateStats = {} },
    privateStatsError,
  } = usePrivateStats({ interval: timeframeToIntervalMap[timeframe] });

  const userTopRequests = useUserTopRequests({
    privateStats,
    chainId: privateCheckedChainId,
    timeframe,
  });

  const [{ stats: day30PrivateStats = {} }, areDay30PrivateStatsLoading] =
    useMonthPrivateStats({
      hasPrivateAccess,
    });

  const userTopRequestsIp = useUserRequestsByIp({
    day30PrivateStats,
    chainId: privateCheckedChainId,
  });

  return {
    ...getPrivateUsageData({
      isConnecting,
      arePrivateStatsLoading:
        arePrivateStatsLoading || areDay30PrivateStatsLoading,
      privateStatsError,
      privateStats: privateStats[privateCheckedChainId],
      day30PrivateStats: day30PrivateStats[privateCheckedChainId], // TODO: remove upon backend support for other timeframes
      timeframe,
      userTopRequests,
      userTopRequestsIp,
    }),
    hasPremium,
  };
};
