import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useUserRequestsByIp } from 'domains/chains/hooks/useUserRequestsByIp';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';
import { getStatsChainId } from 'domains/chains/screens/ChainItem/components/ChainItemSections/utils/getStatsChainId';
import {
  getUserTopRequest,
  UsageDataParams,
} from 'domains/chains/screens/ChainItem/components/UsageDataSection/components/PrivateUsageDataSection/usePrivateUsageData';
import { UsageData } from 'domains/chains/screens/ChainItem/components/UsageDataSection/types';
import { checkPrivateChainsAndGetChainId } from 'domains/chains/screens/ChainItem/components/UsageDataSection/const';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { getPrivateUsageData } from 'domains/chains/screens/ChainItem/components/UsageDataSection/components/PrivateUsageDataSection/PrivateUsageDataSectionUtils';
import { useAppSelector } from 'store/useAppSelector';
import { selectEnterpriseStatsBySelectedApiKey } from 'domains/enterprise/store/selectors';
import { useMonthEnterpriseStats } from 'domains/enterprise/hooks/useMonthEnterpriseStats';
import { useEnterpriseStatsRequest } from 'domains/enterprise/hooks/useEnterpriseStatsRequest';

export const useEnterpriseUsageData = ({
  chain,
  chainSubType,
  chainType,
  group,
  timeframe,
}: UsageDataParams): UsageData => {
  const { loading: isConnecting } = useAuth();

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

  const enterpriseCheckedChainId = checkPrivateChainsAndGetChainId(chainId);

  const {
    data,
    error: enterpriseStatsError,
    isLoading: areEnterpriseStatsLoading,
  } = useAppSelector(selectEnterpriseStatsBySelectedApiKey);

  const enterpriseStats = useMemo(() => {
    return data?.stats || {};
  }, [data]);

  useEnterpriseStatsRequest({
    interval: timeframeToIntervalMap[timeframe],
    shouldFetch: true,
  });

  const userTopRequests = getUserTopRequest(
    enterpriseStats,
    enterpriseCheckedChainId,
  );

  const [{ stats: day30EnterpriseStats = {} }, areDay30PrivateStatsLoading] =
    useMonthEnterpriseStats();

  const userTopRequestsIp = useUserRequestsByIp({
    day30PrivateStats: day30EnterpriseStats,
    chainId: enterpriseCheckedChainId,
  });

  const enterpriseUsageData = useMemo(
    () =>
      getPrivateUsageData({
        isConnecting,
        arePrivateStatsLoading:
          areEnterpriseStatsLoading || areDay30PrivateStatsLoading,
        privateStatsError: enterpriseStatsError,
        privateStats: enterpriseStats[enterpriseCheckedChainId],
        day30PrivateStats: day30EnterpriseStats[enterpriseCheckedChainId], // TODO: remove upon backend support for other timeframes
        timeframe,
        userTopRequests,
        userTopRequestsIp,
      }),
    [
      isConnecting,
      areEnterpriseStatsLoading,
      areDay30PrivateStatsLoading,
      enterpriseStatsError,
      enterpriseStats,
      enterpriseCheckedChainId,
      day30EnterpriseStats,
      timeframe,
      userTopRequests,
      userTopRequestsIp,
    ],
  );

  return enterpriseUsageData;
};
