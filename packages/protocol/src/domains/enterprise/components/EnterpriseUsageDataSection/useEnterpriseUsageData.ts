import { useEffect, useMemo } from 'react';

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
import { useEnterpriseSelectedToken } from 'domains/enterprise/hooks/useEnterpriseSelectedToken';
import { useLazyChainsFetchEnterpriseStatsQuery } from 'domains/enterprise/actions/fetchEnterpriseStats';
import { selectEnterpriseStats } from 'domains/enterprise/store/selectors';
import { useMonthEnterpriseStats } from 'domains/enterprise/hooks/useMonthEnterpriseStats';

export const useEnterpriseUsageData = ({
  chain,
  chainType,
  chainSubType,
  group,
  timeframe,
}: UsageDataParams): UsageData => {
  const { loading: isConnecting } = useAuth();

  const { isChainProtocolSwitchEnabled, chainProtocol } =
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
    isLoading: areEnterpriseStatsLoading,
    error: enterpriseStatsError,
  } = useAppSelector(selectEnterpriseStats);

  const enterpriseStats = useMemo(() => {
    return data?.stats || {};
  }, [data]);

  const [fetchStats] = useLazyChainsFetchEnterpriseStatsQuery();

  const { userEndpointToken } = useEnterpriseSelectedToken();

  useEffect(() => {
    fetchStats({
      interval: timeframeToIntervalMap[timeframe],
      userEndpointToken,
    });
  }, [
    fetchStats,
    timeframe,
    chainType,
    userEndpointToken,
    isChainProtocolSwitchEnabled,
  ]);

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
